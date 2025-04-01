// src/utils/affiliateWithdraw.js
import StarsTransactions from "../models/tx/starsTransactionModel.mjs";
import TONTransactions from "../models/tx/tonTransactionModel.js";
import AffiliateTransaction from "../models/tx/affiliateTransactionModel.js";
import { withTransaction } from "../utils/dbUtils.js";
import TON from "ton-core";
import { Address, internal, beginCell } from '@ton/ton'
import { openWallet } from "../routes/user/userRoutes.js";
import axios from "axios";
import User from "../models/user/userModel.js";

const { toNano, SendMode } = TON;

// TON Center API configuration
const TONCENTER_API_KEY = process.env.TONCENTER_API_KEY;
const TONCENTER_API_URL = "https://toncenter.com/api/v2";

// Mock user retrieval (replace with your actual User model logic)
const getConnectedWallet = async (affiliateId, session) => {
  const user = await User.findOne({ id: affiliateId }, { tonWalletAddress: 1 }, { session });
  if (!user || !user.tonWalletAddress) {
    throw new Error("User or TON wallet address not found");
  }
  // Parse the address from the database (raw or user-friendly format)
  const parsedAddress = Address.parse(user.tonWalletAddress);
  console.log(`Parsed wallet address for affiliate ${affiliateId}: ${parsedAddress.toString({ bounceable: false })}`);
  return parsedAddress;
};

// Wallet setup
let walletContract, keyPair, tonClient;

const mnemonic = process.env.MNEMONICS.split(" "); // Expects space-separated mnemonic
const testnet = process.env.TESTNET === "true";

// Initialize wallet and TON client (using openWallet from userRoutes.js)
const initializeWallet = async () => {
  try {
    const walletData = await openWallet(mnemonic, testnet);
    walletContract = walletData.contract;
    keyPair = walletData.keyPair;
    tonClient = walletData.client;
    console.log(`Wallet initialized: ${walletContract.address.toString({ bounceable: false })}`);
  } catch (error) {
    console.error("Failed to initialize wallet:", error);
    throw new Error("Wallet initialization failed");
  }
};

// Check if the destination wallet is initialized
const isWalletInitialized = async (address) => {
  try {
    const response = await axios.get(`${TONCENTER_API_URL}/getAddressInformation`, {
      params: {
        address: address.toString({ bounceable: false }),
        api_key: TONCENTER_API_KEY,
      },
    });
    console.log(`Address information response: ${JSON.stringify(response.data, null, 2)}`);
    return response.data.result.state === "active";
  } catch (error) {
    console.error(`Failed to check wallet initialization for ${address.toString({ bounceable: false })}:`, error);
    return false; // Assume uninitialized if the API call fails
  }
};

// Transfer TON to the specified address and create AffiliateTransaction
const transferTON = async (destinationAddress, amount, session, affiliateId, starsTxIds, tonTxIds, pendingStars, pendingTON) => {
  let affiliateTransaction;
  try {
    // Ensure wallet is initialized
    if (!walletContract || !keyPair || !tonClient) {
      await initializeWallet();
    }

    // Make sure we have a proper Address object
    let addressObject;
    if (typeof destinationAddress === 'string') {
      // If it's a string, parse it into an Address
      addressObject = Address.parse(destinationAddress);
    } else if (destinationAddress instanceof Address) {
      // If it's already an Address object, use it directly
      addressObject = destinationAddress;
    } else {
      throw new Error("Invalid address format provided");
    }


    // Log the destination address for debugging
    console.log(`Destination address (raw): ${destinationAddress.toRawString()}`);
    console.log(`Destination address (non-bounceable): ${destinationAddress.toString({ bounceable: false })}`);
    console.log(`Destination address (bounceable): ${destinationAddress.toString({ bounceable: true })}`);

    // Convert the address to a non-bounceable string to force the SDK to parse it correctly
    const nonBounceableAddress = destinationAddress.toString({ bounceable: false });
    console.log(`Using non-bounceable address for transfer: ${nonBounceableAddress}`);

    // Check if the destination wallet is initialized
    const walletInitialized = await isWalletInitialized(destinationAddress);
    console.log(`Destination wallet initialized: ${walletInitialized}`);
    // Note: We proceed with the transfer even if the wallet is not initialized, as bounce: true will handle it

    // Convert amount to nanoTON (1 TON = 1e9 nanoTON)
    const amountNano = toNano(amount.toString());

    affiliateTransaction = new AffiliateTransaction({
      affiliateId: Number(affiliateId),
      starsTxIds: starsTxIds || [],
      tonTxIds: tonTxIds || [],
      starsAmount: parseFloat(pendingStars.toFixed(2)),
      tonAmount: parseFloat(pendingTON.toFixed(2)),
      totalTonWithdrawn: amount,
      status: "pending",
    });
    await affiliateTransaction.save({ session });

    // Get wallet sequence number (seqno)
    const seqno = await walletContract.getSeqno();

    // Try reconstructing the address from its raw string format
    const rawFormat = addressObject.toRawString();
    const freshAddress = Address.parse(rawFormat);

    // // Or try from the non-bounceable format
    // const nonBounceableStr = addressObject.toString({ bounceable: false });
    // const freshAddress = Address.parse(nonBounceableStr);

    const textBytes = Buffer.from("🎉 13th Floor Affiliate Payment 🎉", 'utf-8');
    const body = beginCell()
      .storeUint(0, 32) // op code 0 for comments
      .storeBuffer(textBytes)
      .endCell();

    // Create the transfer message using the fresh Address instance
    const transferMessage = internal({
      to: freshAddress,
      value: amountNano,
      body: body,
      bounce: true
    });

    // Send the transfer
    console.log(`Transferring ${amount} TON to ${nonBounceableAddress} (seqno: ${seqno})`);
    await walletContract.sendTransfer({
      seqno,
      secretKey: keyPair.secretKey,
      messages: [transferMessage],
      sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
    });

    // Update AffiliateTransaction status to transferring
    affiliateTransaction.status = "transferring";
    await affiliateTransaction.save({ session });

    // Wait for the transaction to be confirmed
    let currentSeqno = seqno;
    for (let attempt = 0; attempt < 10; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
      currentSeqno = await walletContract.getSeqno();
      if (currentSeqno > seqno) break;
    }

    if (currentSeqno === seqno) {
      affiliateTransaction.status = "failed";
      affiliateTransaction.error_message = "Transaction not confirmed after 10 attempts";
      await affiliateTransaction.save({ session });
      throw new Error("Transaction not confirmed after 10 attempts");
    }

    // Fetch the transaction hash using TON Center API
    const response = await axios.get(`${TONCENTER_API_URL}/getTransactions`, {
      params: {
        address: walletContract.address.toString({ bounceable: false }),
        limit: 1,
        sort: "desc",
        api_key: TONCENTER_API_KEY,
        archival: true,
      },
    });

    // Log the full response for debugging
    console.log("TON Center API response:", JSON.stringify(response.data, null, 2));

    // Validate the response structure
    if (!response.data || typeof response.data !== "object") {
      affiliateTransaction.status = "failed";
      affiliateTransaction.error_message = "Failed to fetch transaction hash: Invalid response from TON Center API";
      await affiliateTransaction.save({ session });
      throw new Error("Failed to fetch transaction hash: Invalid response from TON Center API");
    }

    // Check if result exists and is an array
    if (!response.data.result || !Array.isArray(response.data.result) || response.data.result.length === 0) {
      affiliateTransaction.status = "failed";
      affiliateTransaction.error_message = "Failed to fetch transaction hash: No transactions found in response";
      await affiliateTransaction.save({ session });
      throw new Error("Failed to fetch transaction hash: No transactions found in response");
    }

    const latestTx = response.data.result[0];

    // Check if transaction_id exists and has a hash
    if (!latestTx.transaction_id || typeof latestTx.transaction_id.hash !== "string") {
      affiliateTransaction.status = "failed";
      affiliateTransaction.error_message = "Failed to fetch transaction hash: Missing or invalid transaction_id.hash in response";
      await affiliateTransaction.save({ session });
      throw new Error("Failed to fetch transaction hash: Missing or invalid transaction_id.hash in response");
    }

    const txHash = latestTx.transaction_id.hash;

    // Update AffiliateTransaction status to complete
    affiliateTransaction.status = "complete";
    affiliateTransaction.tonTxHash = txHash;
    await affiliateTransaction.save({ session });

    console.log(`Transfer successful! Transaction hash: ${txHash}`);
    return txHash;
  } catch (error) {
    console.error("TON transfer failed:", error);
    if (affiliateTransaction) {
      affiliateTransaction.status = "failed";
      affiliateTransaction.error_message = error.message;
      await affiliateTransaction.save({ session });
    }
    throw new Error(`TON transfer failed: ${error.message}`);
  }
};

// Combined function to get Stars and TON affiliate earnings
export const getAffiliateEarningsData = async (affiliateId) => {
  if (!affiliateId) throw new Error("Affiliate ID is required");

  const STARS_LOCK_PERIOD_MS = 21 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000; // 21 days + 10 minutes
  const TON_LOCK_PERIOD_MS = 1 * 24 * 60 * 60 * 1000; // 1 day
  const AFFILIATE_PERCENTAGE = 0.1; // 10% commission
  const NANOTONS_TO_TON = 1e9; // 1 TON = 1,000,000,000 nanotons
  const STARS_TO_TON_RATE = 1000; // 1000 Stars = 1 TON
  const now = new Date();

  // --- Stars Transactions ---
  const starsTxs = await StarsTransactions.find({
    affiliate_id: Number(affiliateId),
    currency: "XTR",
    status: "complete",
  }).select("_id createdAt amount");

  const starsWithdrawnTxIds = await AffiliateTransaction.find({
    affiliateId: Number(affiliateId),
    status: "complete",
  }).distinct("starsTxIds");

  const starsAvailableTxs = starsTxs.filter(
    (tx) => !starsWithdrawnTxIds.some((id) => id.equals(tx._id))
  );

  const starsResult = starsAvailableTxs.reduce(
    (acc, tx) => {
      const txAgeMs = now - new Date(tx.createdAt);
      const txAmount = parseFloat(tx.amount) * AFFILIATE_PERCENTAGE;
      const roundedAmount = parseFloat(txAmount.toFixed(2));
      if (txAgeMs < STARS_LOCK_PERIOD_MS) {
        acc.lockedStars += roundedAmount;
      } else {
        acc.pendingStars += roundedAmount;
      }
      return acc;
    },
    { lockedStars: 0, pendingStars: 0 }
  );

  // Convert Stars to TON
  const totalStarsLockedInTON = parseFloat(
    (starsResult.lockedStars / STARS_TO_TON_RATE).toFixed(2)
  );
  const totalStarsPendingInTON = parseFloat(
    (starsResult.pendingStars / STARS_TO_TON_RATE).toFixed(2)
  );

  // --- TON Transactions ---
  const tonTxs = await TONTransactions.find({
    affiliate_id: Number(affiliateId),
    currency: "TON",
    status: "complete",
  }).select("_id createdAt amount");

  const tonWithdrawnTxIds = await AffiliateTransaction.find({
    affiliateId: Number(affiliateId),
    status: "complete",
  }).distinct("tonTxIds");

  const tonAvailableTxs = tonTxs.filter(
    (tx) => !tonWithdrawnTxIds.some((id) => id.equals(tx._id))
  );

  const tonResult = tonAvailableTxs.reduce(
    (acc, tx) => {
      const txAgeMs = now - new Date(tx.createdAt);
      const txAmountTON =
        (parseFloat(tx.amount) / NANOTONS_TO_TON) * AFFILIATE_PERCENTAGE;
      const roundedAmount = parseFloat(txAmountTON.toFixed(2));
      if (txAgeMs < TON_LOCK_PERIOD_MS) {
        acc.lockedTON += roundedAmount;
      } else {
        acc.pendingTON += roundedAmount;
      }
      return acc;
    },
    { lockedTON: 0, pendingTON: 0 }
  );

  return {
    totalStarsLocked: parseFloat(starsResult.lockedStars.toFixed(2)), // Stars amount locked
    totalStarsPendingWithdrawal: parseFloat(
      starsResult.pendingStars.toFixed(2)
    ), // Stars amount pending
    totalStarsLockedInTON: totalStarsLockedInTON, // TON equivalent of locked Stars
    totalStarsPendingInTON: totalStarsPendingInTON, // TON equivalent of pending Stars
    totalTONLocked: parseFloat(tonResult.lockedTON.toFixed(2)), // TON amount locked
    totalTONPendingWithdrawal: parseFloat(tonResult.pendingTON.toFixed(2)), // TON amount pending
  };
};

// Withdraw both Stars and TON earnings with transaction safety
export const withdrawAffiliateEarnings = async (affiliateId) => {
  const STARS_LOCK_PERIOD_MS = 21 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000;
  const TON_LOCK_PERIOD_MS = 1 * 24 * 60 * 60 * 1000;
  const AFFILIATE_PERCENTAGE = 0.1;
  const STARS_TO_TON_RATE = 1000;
  const NANOTONS_TO_TON = 1e9;
  const now = new Date();

  const operation = async (session) => {
    // Fetch Pending Stars
    const starsTxs = await StarsTransactions.find(
      {
        affiliate_id: Number(affiliateId),
        currency: "XTR",
        status: "complete",
        createdAt: { $lt: new Date(now - STARS_LOCK_PERIOD_MS) },
        _id: {
          $nin: await AffiliateTransaction.find({
            affiliateId: Number(affiliateId),
            status: "complete",
          }).distinct("starsTxIds"),
        },
      },
      null,
      { session }
    ).sort({ createdAt: 1 });

    const pendingStars = starsTxs.reduce((sum, tx) => {
      const txAmount = parseFloat(tx.amount) * AFFILIATE_PERCENTAGE;
      return sum + parseFloat(txAmount.toFixed(2));
    }, 0);
    const starsTxIds = starsTxs.map((tx) => tx._id);

    // Fetch Pending TON
    const tonTxs = await TONTransactions.find(
      {
        affiliate_id: Number(affiliateId),
        currency: "TON",
        status: "complete",
        createdAt: { $lt: new Date(now - TON_LOCK_PERIOD_MS) },
        _id: {
          $nin: await AffiliateTransaction.find({
            affiliateId: Number(affiliateId),
            status: "complete",
          }).distinct("tonTxIds"),
        },
      },
      null,
      { session }
    ).sort({ createdAt: 1 });

    const pendingTON = tonTxs.reduce((sum, tx) => {
      const txAmountTON =
        (parseFloat(tx.amount) / NANOTONS_TO_TON) * AFFILIATE_PERCENTAGE;
      return sum + parseFloat(txAmountTON.toFixed(2));
    }, 0);
    const tonTxIds = tonTxs.map((tx) => tx._id);

    // Calculate Total TON
    const starsInTON = parseFloat((pendingStars / STARS_TO_TON_RATE).toFixed(2));
    const totalTON = parseFloat((starsInTON + pendingTON).toFixed(2));

    if (totalTON <= 0) throw new Error("No available earnings to withdraw");

    // Check Wallet and Transfer
    const walletAddress = await getConnectedWallet(affiliateId, session);
    if (walletAddress) {
      const tonTxHash = await transferTON(
        walletAddress, // Pass the Address object directly
        totalTON,
        session,
        affiliateId,
        starsTxIds,
        tonTxIds,
        pendingStars,
        pendingTON
      );
      return { totalTON, tonTxHash, walletAddress: walletAddress.toString({ bounceable: false }) };
    } else {
      console.log("No wallet connected, withdrawal recorded but not transferred");
      return { totalTON, tonTxHash: null, walletAddress: null };
    }
  };

  return await withTransaction(operation);
};