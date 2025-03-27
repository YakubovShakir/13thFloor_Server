import { mnemonicToPrivateKey } from "ton-crypto";
import express from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TONTransactions from "../tx/tonTransactionModel.js";
import NFTItems from "./nftItemModel.js";
import TON from "@ton/ton";
import { config } from "dotenv";

const { TonClient, WalletContractV4, toNano, Address, NFTItem } = TON;

config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// MongoDB Connection and Replica Set Initialization
async function initializeMongoDB() {
  const mongoUri = process.env.MONGO_URI || "mongodb://database:27017/Floor"; // Use service name 'database'
  const maxRetries = 10;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      // Connect to MongoDB with a shorter timeout for retries
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      console.log("Connected to MongoDB");

      // Access the raw MongoDB client via Mongoose
      const adminDb = mongoose.connection.db.admin();

      // Check if replica set is already initialized
      const replStatus = await adminDb.command({ replSetGetStatus: 1 }).catch(err => {
        if (err.codeName === "NotYetInitialized") return null; // Replica set not initialized
        throw err;
      });

      if (!replStatus) {
        console.log("Initializing MongoDB replica set...");
        await adminDb.command({
          replSetInitiate: {
            _id: "rs0",
            members: [{ _id: 0, host: "database:27017" }], // Use service name here too
          },
        });

        // Wait for the replica set to become primary (up to 10 seconds)
        let attempts = 0;
        const maxAttempts = 20;
        while (attempts < maxAttempts) {
          const status = await adminDb.command({ replSetGetStatus: 1 }).catch(() => null);
          if (status && status.myState === 1) { // 1 = PRIMARY
            console.log("Replica set initialized successfully");
            return; // Exit function on success
          }
          await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
          attempts++;
        }

        if (attempts >= maxAttempts) {
          throw new Error("Replica set failed to initialize within timeout");
        }
      } else {
        console.log("Replica set already initialized");
      }
      return; // Exit function on successful connection
    } catch (err) {
      console.error(`MongoDB connection attempt ${retries + 1} failed:`, err.message);
      retries++;
      if (retries >= maxRetries) {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
    }
  }
}

// Open Wallet Function
async function openWallet(mnemonic, testnet) {
  const keyPair = await mnemonicToPrivateKey(mnemonic);

  const toncenterBaseEndpoint = testnet
    ? "https://testnet.toncenter.com"
    : "https://toncenter.com";

  const client = new TonClient({
    endpoint: `${toncenterBaseEndpoint}/api/v2/jsonRPC`,
    apiKey: process.env.TONCENTER_API_KEY,
  });

  const wallet = WalletContractV4.create({
    workchain: 0,
    publicKey: keyPair.publicKey,
  });

  const contract = client.open(wallet);
  return { contract, keyPair, client };
}

// Server Wallet Initialization and Server Startup
(async () => {
  // Initialize MongoDB with replica set before proceeding
  await initializeMongoDB();

  let walletContract, keyPair, tonClient;

  try {
    const mnemonic = process.env.MNEMONICS.split(" "); // Expects space-separated mnemonic
    const testnet = process.env.TESTNET === "true";
    const wallet = await openWallet(mnemonic, testnet);
    walletContract = wallet.contract;
    keyPair = wallet.keyPair;
    tonClient = wallet.client;

    const RECEIVING_WALLET_ADDRESS = walletContract.address.toString();
    console.log("Server wallet address:", RECEIVING_WALLET_ADDRESS);

    // TON Center API Configuration
    const TONCENTER_API_KEY = process.env.TONCENTER_API_KEY;
    const TONCENTER_API_URL = "https://toncenter.com/api/v2";

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

      const session = await mongoose.startSession();
      try {
        session.startTransaction();

        const nft = await NFTItems.findOneAndUpdate(
          { itemId: Number(productId), status: "available" },
          { status: "locked", memo: uuidv4(), lockedAt: new Date() },
          { new: true, session }
        );

        if (!nft) {
          await session.abortTransaction();
          return res.status(404).json({ error: "No available NFTs for this item" });
        }

        if (!nft.price) {
          await session.abortTransaction();
          return res.status(400).json({ error: "Price not defined for this NFT" });
        }

        const amount = (nft.price * 1e9).toString();

        const transaction = new TONTransactions({
          user_id: Number(userId),
          currency: "TON",
          amount,
          product_type: "shelf",
          product_id: productId,
          memo: nft.memo,
          status: "awaiting_payment",
        });
        await transaction.save({ session });

        await session.commitTransaction();

        res.json({
          address: RECEIVING_WALLET_ADDRESS,
          amount,
          memo: nft.memo,
        });
      } catch (error) {
        console.error("Error generating transaction details:", error);
        await session.abortTransaction();
        res.status(500).json({ error: "Internal server error" });
      } finally {
        session.endSession();
      }
    });

    // Transaction Verification and Transfer
    async function verifyAndTransferTransactions() {
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
              const session = await mongoose.startSession();
              try {
                session.startTransaction();
                await TONTransactions.updateOne(
                  { _id: tx._id },
                  { status: "payment_received", tx_hash: matchingTx.transaction_id.hash },
                  { session }
                );
                await session.commitTransaction();
                console.log(`Payment received for memo ${tx.memo}`);
              } catch (error) {
                await session.abortTransaction();
                console.error(`Failed to update payment status for memo ${tx.memo}:`, error);
              } finally {
                session.endSession();
              }
            }
          }

          if (tx.status === "payment_received") {
            const session = await mongoose.startSession();
            try {
              session.startTransaction();

              const nft = await NFTItems.findOne({ memo: tx.memo, status: "locked" }, null, { session });
              if (!nft) {
                await TONTransactions.updateOne(
                  { _id: tx._id },
                  { status: "failed_transfer", error_message: "No locked NFT found" },
                  { session }
                );
                await session.commitTransaction();
                console.error(`No locked NFT found for memo ${tx.memo}`);
                continue;
              }

              await TONTransactions.updateOne({ _id: tx._id }, { status: "transferring" }, { session });

              const buyerAddress = (await axios.get(`${TONCENTER_API_URL}/getTransactions`, {
                params: { address: RECEIVING_WALLET_ADDRESS, hash: tx.tx_hash, api_key: TONCENTER_API_KEY }
              })).data.result[0].in_msg.source;

              const nftContract = tonClient.open(NFTItem.createFromAddress(Address.parse(nft.address)));

              const seqno = await walletContract.getSeqno();
              await walletContract.sendTransfer({
                seqno,
                secretKey: keyPair.secretKey,
                messages: [
                  nftContract.createTransfer({
                    newOwner: Address.parse(buyerAddress),
                    responseDestination: Address.parse(RECEIVING_WALLET_ADDRESS),
                    forwardTonAmount: toNano("0.01"),
                  }),
                ],
              });

              await NFTItems.updateOne(
                { _id: nft._id },
                { status: "sold", owner: buyerAddress, memo: null },
                { session }
              );
              await TONTransactions.updateOne(
                { _id: tx._id },
                { status: "complete", transfer_tx_hash: "unknown" },
                { session }
              );

              await session.commitTransaction();
              console.log(`NFT ${nft.address} transferred to ${buyerAddress} for memo ${tx.memo}`);
            } catch (error) {
              await TONTransactions.updateOne(
                { _id: tx._id },
                { status: "failed_transfer", error_message: error.message },
                { session }
              );
              await session.commitTransaction();
              console.error(`Transfer failed for memo ${tx.memo}:`, error);
            } finally {
              session.endSession();
            }
          }
        }
      } catch (error) {
        console.error("Error verifying transactions:", error);
      }
    }

    // Unlock Expired Locks
    async function unlockExpiredLocks() {
      const session = await mongoose.startSession();
      try {
        session.startTransaction();

        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const expiredLocks = await NFTItems.find(
          { status: "locked", lockedAt: { $lt: twentyFourHoursAgo } },
          null,
          { session }
        );

        if (expiredLocks.length > 0) {
          const expiredMemos = expiredLocks.map(nft => nft.memo);
          await NFTItems.updateMany(
            { _id: { $in: expiredLocks.map(nft => nft._id) } },
            { status: "available", memo: null, lockedAt: null },
            { session }
          );
          await TONTransactions.updateMany(
            { memo: { $in: expiredMemos }, status: { $in: ["awaiting_payment", "payment_received"] } },
            { status: "expired" },
            { session }
          );
          await session.commitTransaction();
          console.log(`Unlocked ${expiredLocks.length} expired NFT locks and marked transactions as expired`);
        } else {
          await session.abortTransaction();
        }
      } catch (error) {
        console.error("Error unlocking expired locks:", error);
        await session.abortTransaction();
      } finally {
        session.endSession();
      }
    }

    // Start Server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      setInterval(verifyAndTransferTransactions, 60000);
      setInterval(unlockExpiredLocks, 60000);
      verifyAndTransferTransactions();
      unlockExpiredLocks();
    });
  } catch (error) {
    console.error("Failed to initialize server wallet:", error);
    process.exit(1);
  }
})();