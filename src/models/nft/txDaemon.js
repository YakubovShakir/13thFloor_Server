import express from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TONTransactions from "./models/TONTransactions.js";
import NFTItems from "./models/NFTItems.js";
const { TonClient, WalletContractV4, toNano, Address, NFTItem } = require("@ton/ton");
const { keyPairFromSeed } = require("@ton/crypto");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Floor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// TON Center API Configuration
const TONCENTER_API_KEY = process.env.TONCENTER_API_KEY;
const TONCENTER_API_URL = "https://toncenter.com/api/v2";

// TON Client Setup
const initTonClient = async () => {
  const client = new TonClient({
    endpoint: "https://toncenter.com/api/v2/jsonRPC",
    apiKey: TONCENTER_API_KEY,
  });
  return client;
};

// Server Wallet Configuration (owns the NFTs initially)
const SERVER_WALLET_SEED = Buffer.from(process.env.SERVER_WALLET_SEED, "hex");
const keyPair = keyPairFromSeed(SERVER_WALLET_SEED);
const serverWallet = WalletContractV4.create({ workchain: 0, publicKey: keyPair.publicKey });
const RECEIVING_WALLET_ADDRESS = serverWallet.address.toString();

// Supply Endpoint
app.get("/api/nft/supply/:itemId", async (req, res) => {
  const { itemId } = req.params;

  try {
    const availableSupply = await NFTItems.countDocuments({ itemId: Number(itemId), status: "available" });
    res.json({ availableSupply });
  } catch (error) {
    console.error("Error fetching supply:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Transaction Details Endpoint
app.get("/api/nft/transaction-details", async (req, res) => {
  const { userId, productId } = req.query;

  if (!userId || !productId) {
    return res.status(400).json({ error: "userId and productId are required" });
  }

  try {
    const nft = await NFTItems.findOneAndUpdate(
      { itemId: Number(productId), status: "available" },
      { status: "locked", memo: uuidv4(), lockedAt: new Date() },
      { new: true }
    );

    if (!nft) {
      return res.status(404).json({ error: "No available NFTs for this item" });
    }

    if (!nft.price) {
      return res.status(400).json({ error: "Price not defined for this NFT" });
    }

    const amount = (nft.price * 1e9).toString(); // Convert TON to nanotons

    const transaction = new TONTransactions({
      user_id: Number(userId),
      currency: "TON",
      amount,
      product_type: "shelf",
      product_id: productId,
      memo: nft.memo,
      status: "awaiting_payment",
    });
    await transaction.save();

    res.json({
      address: RECEIVING_WALLET_ADDRESS,
      amount,
      memo: nft.memo,
    });
  } catch (error) {
    console.error("Error generating transaction details:", error);
    await NFTItems.updateOne({ memo: transaction?.memo }, { status: "available", memo: null, lockedAt: null });
    res.status(500).json({ error: "Internal server error" });
  }
});

// Transaction Verification and Transfer
async function verifyAndTransferTransactions() {
  const client = await initTonClient();
  const walletContract = client.open(serverWallet);

  try {
    const pendingTransactions = await TONTransactions.find({
      status: { $in: ["awaiting_payment", "payment_received", "transferring"] },
    });

    for (const tx of pendingTransactions) {
      if (tx.status === "awaiting_payment") {
        const response = await axios.get(`${TONCENTER_API_URL}/getTransactions`, {
          params: {
            address: RECEIVING_WALLET_ADDRESS,
            limit: 100,
            sort: "desc",
            api_key: TONCENTER_API_KEY,
          },
        });

        const transactions = response.data.result;
        const matchingTx = transactions.find(t =>
          t.in_msg?.message === tx.memo &&
          t.in_msg?.value === tx.amount
        );

        if (matchingTx) {
          await TONTransactions.updateOne(
            { _id: tx._id },
            { status: "payment_received", tx_hash: matchingTx.transaction_id.hash }
          );
          console.log(`Payment received for memo ${tx.memo}`);
        }
      }

      if (tx.status === "payment_received") {
        const nft = await NFTItems.findOne({ memo: tx.memo, status: "locked" });
        if (!nft) {
          await TONTransactions.updateOne(
            { _id: tx._id },
            { status: "failed_transfer", error_message: "No locked NFT found" }
          );
          console.error(`No locked NFT found for memo ${tx.memo}`);
          continue;
        }

        await TONTransactions.updateOne({ _id: tx._id }, { status: "transferring" });

        const buyerAddress = (await axios.get(`${TONCENTER_API_URL}/getTransactions`, {
          params: { address: RECEIVING_WALLET_ADDRESS, hash: tx.tx_hash, api_key: TONCENTER_API_KEY }
        })).data.result[0].in_msg.source;

        // Open the NFTItem contract
        const nftContract = client.open(NFTItem.createFromAddress(Address.parse(nft.address)));

        // Transfer NFT using NFTItem.transfer
        const seqno = await walletContract.getSeqno();
        await walletContract.sendTransfer({
          seqno,
          secretKey: keyPair.secretKey,
          messages: [
            nftContract.createTransfer({
              newOwner: Address.parse(buyerAddress),
              responseDestination: Address.parse(RECEIVING_WALLET_ADDRESS),
              forwardTonAmount: toNano("0.01"), // Optional notification amount
            }),
          ],
        });

        await NFTItems.updateOne(
          { _id: nft._id },
          { status: "sold", owner: buyerAddress, memo: null }
        );
        await TONTransactions.updateOne(
          { _id: tx._id },
          { status: "complete", transfer_tx_hash: "unknown" } // TON client doesn't return tx hash directly here
        );
        console.log(`NFT ${nft.address} transferred to ${buyerAddress} for memo ${tx.memo}`);
      }
    }
  } catch (error) {
    console.error("Error verifying transactions:", error);
    if (tx) {
      await TONTransactions.updateOne(
        { _id: tx._id },
        { status: "failed_transfer", error_message: error.message }
      );
    }
  }
}

// Unlock Expired Locks
async function unlockExpiredLocks() {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const expiredLocks = await NFTItems.find({
      status: "locked",
      lockedAt: { $lt: twentyFourHoursAgo },
    });

    if (expiredLocks.length > 0) {
      const expiredMemos = expiredLocks.map(nft => nft.memo);
      await NFTItems.updateMany(
        { _id: { $in: expiredLocks.map(nft => nft._id) } },
        { status: "available", memo: null, lockedAt: null }
      );
      await TONTransactions.updateMany(
        { memo: { $in: expiredMemos }, status: { $in: ["awaiting_payment", "payment_received"] } },
        { status: "expired" }
      );
      console.log(`Unlocked ${expiredLocks.length} expired NFT locks and marked transactions as expired`);
    }
  } catch (error) {
    console.error("Error unlocking expired locks:", error);
  }
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setInterval(verifyAndTransferTransactions, 60000);
  setInterval(unlockExpiredLocks, 60000);
});

verifyAndTransferTransactions();
unlockExpiredLocks();