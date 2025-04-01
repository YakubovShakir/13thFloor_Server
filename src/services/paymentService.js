// src/utils/affiliateWithdraw.js
import StarsTransactions from "../models/tx/starsTransactionModel.mjs" // Your import
import TONTransactions from "../models/tx/tonTransactionModel.js" // Your import
import AffiliateTransaction from "../models/tx/affiliateTransactionModel.js" // Your import
import AffiliateTONTransaction from "../models/tx/affiliateTonTransactions.js" // Corrected import name
import mongoose from "mongoose"
import { withTransaction } from "../utils/dbUtils.js" // Assuming this is where withTransaction lives
import User from "../models/user/userModel.js"
import { Address } from "ton-core"
import { openWallet } from "../routes/user/userRoutes.js"

const { Address, TonClient, WalletContractV4, internal, toNano, SendMode } = TON;

// TON Center API configuration
const TONCENTER_API_KEY = process.env.TONCENTER_API_KEY;
const TONCENTER_API_URL = "https://toncenter.com/api/v2";

// Mock user retrieval (replace with your actual User model logic)
const getConnectedWallet = async (affiliateId, session) => {
  const user = await User.findOne({ id: affiliateId }, { tonWalletAddress: 1 }, { session });
  if (!user || !user.tonWalletAddress) {
    throw new Error("User or TON wallet address not found");
  }
  return Address.parse(user.tonWalletAddress);
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
    console.log(`Wallet initialized: ${walletContract.address.toString()}`);
  } catch (error) {
    console.error("Failed to initialize wallet:", error);
    throw new Error("Wallet initialization failed");
  }
};

// Transfer TON to the specified address
const transferTON = async (address, amount, session) => {
  let transaction;
  try {
    // Ensure wallet is initialized
    if (!walletContract || !keyPair || !tonClient) {
      await initializeWallet();
    }

    // Parse the destination address
    const destinationAddress = Address.parse(address);

    // Convert amount to nanoTON (1 TON = 1e9 nanoTON)
    const amountNano = toNano(amount.toString());

    // Create a transaction record
    transaction = new TONTransactions({
      userId: "system", // Replace with actual user ID if applicable
      amount: amountNano.toString(),
      destination: destinationAddress.toString(),
      status: "pending",
      affiliate_id: null, // Add if needed in your schema
      currency: "TON",
    });
    await transaction.save({ session });

    // Get wallet sequence number (seqno)
    const seqno = await walletContract.getSeqno();

    // Create the transfer message
    const transferMessage = internal({
      to: destinationAddress,
      value: amountNano,
      bounce: true, // Bounce back if the destination is not initialized
      body: null, // Optional: Add a comment if needed
    });

    // Send the transfer
    console.log(`Transferring ${amount} TON to ${address} (seqno: ${seqno})`);
    await walletContract.sendTransfer({
      seqno,
      secretKey: keyPair.secretKey,
      messages: [transferMessage],
      sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
    });

    // Update transaction status to transferring
    transaction.status = "transferring";
    await transaction.save({ session });

    // Wait for the transaction to be confirmed
    let currentSeqno = seqno;
    for (let attempt = 0; attempt < 10; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
      currentSeqno = await walletContract.getSeqno();
      if (currentSeqno > seqno) break;
    }

    if (currentSeqno === seqno) {
      transaction.status = "failed";
      transaction.error_message = "Transaction not confirmed after 10 attempts";
      await transaction.save({ session });
      throw new Error("Transaction not confirmed after 10 attempts");
    }

    // Fetch the transaction hash using TON Center API
    const response = await axios.get(`${TONCENTER_API_URL}/getTransactions`, {
      params: {
        address: walletContract.address.toString(),
        limit: 1,
        sort: "desc",
        api_key: TONCENTER_API_KEY,
        archival: true,
      },
    });

    // Validate the response structure
    if (!response.data || !response.data.result || !Array.isArray(response.data.result) || response.data.result.length === 0) {
      transaction.status = "failed";
      transaction.error_message = "Failed to fetch transaction hash: Invalid response from TON Center API";
      await transaction.save({ session });
      throw new Error("Failed to fetch transaction hash: Invalid response from TON Center API");
    }

    const latestTx = response.data.result[0];
    if (!latestTx.transaction_id || !latestTx.transaction_id.hash) {
      transaction.status = "failed";
      transaction.error_message = "Failed to fetch transaction hash: Missing transaction_id.hash in response";
      await transaction.save({ session });
      throw new Error("Failed to fetch transaction hash: Missing transaction_id.hash in response");
    }

    const txHash = latestTx.transaction_id.hash;

    // Update transaction status to complete
    transaction.status = "complete";
    transaction.tx_hash = txHash;
    await transaction.save({ session });

    console.log(`Transfer successful! Transaction hash: ${txHash}`);
    return txHash;
  } catch (error) {
    console.error("TON transfer failed:", error);
    if (transaction) {
      transaction.status = "failed";
      transaction.error_message = error.message;
      await transaction.save({ session });
    }
    throw new Error(`TON transfer failed: ${error.message}`);
  }
};

// Combined function to get Stars and TON affiliate earnings
export const getAffiliateEarningsData = async (affiliateId) => {
  if (!affiliateId) throw new Error("Affiliate ID is required")

  const STARS_LOCK_PERIOD_MS = 21 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000 // 21 days + 10 minutes
  const TON_LOCK_PERIOD_MS = 1 * 24 * 60 * 60 * 1000 // 1 day
  const AFFILIATE_PERCENTAGE = 0.1 // 10% commission
  const NANOTONS_TO_TON = 1e9 // 1 TON = 1,000,000,000 nanotons
  const STARS_TO_TON_RATE = 1000 // 1000 Stars = 1 TON
  const now = new Date()

  // --- Stars Transactions ---
  const starsTxs = await StarsTransactions.find({
    affiliate_id: Number(affiliateId),
    currency: "XTR",
    status: "complete",
  }).select("_id createdAt amount")

  const starsWithdrawnTxIds = await AffiliateTransaction.find({
    affiliateId: Number(affiliateId),
    status: "complete",
  }).distinct("starsTxIds")

  const starsAvailableTxs = starsTxs.filter(
    (tx) => !starsWithdrawnTxIds.some((id) => id.equals(tx._id))
  )

  const starsResult = starsAvailableTxs.reduce(
    (acc, tx) => {
      const txAgeMs = now - new Date(tx.createdAt)
      const txAmount = parseFloat(tx.amount) * AFFILIATE_PERCENTAGE
      const roundedAmount = parseFloat(txAmount.toFixed(2))
      if (txAgeMs < STARS_LOCK_PERIOD_MS) {
        acc.lockedStars += roundedAmount
      } else {
        acc.pendingStars += roundedAmount
      }
      return acc
    },
    { lockedStars: 0, pendingStars: 0 }
  )

  // Convert Stars to TON
  const totalStarsLockedInTON = parseFloat(
    (starsResult.lockedStars / STARS_TO_TON_RATE).toFixed(2)
  )
  const totalStarsPendingInTON = parseFloat(
    (starsResult.pendingStars / STARS_TO_TON_RATE).toFixed(2)
  )

  // --- TON Transactions ---
  const tonTxs = await TONTransactions.find({
    affiliate_id: Number(affiliateId),
    currency: "TON",
    status: "complete",
  }).select("_id createdAt amount")

  const tonWithdrawnTxIds = await AffiliateTONTransaction.find({
    affiliateId: Number(affiliateId),
    status: "complete",
  }).distinct("tonTxIds")

  const tonAvailableTxs = tonTxs.filter(
    (tx) => !tonWithdrawnTxIds.some((id) => id.equals(tx._id))
  )

  const tonResult = tonAvailableTxs.reduce(
    (acc, tx) => {
      const txAgeMs = now - new Date(tx.createdAt)
      const txAmountTON =
        (parseFloat(tx.amount) / NANOTONS_TO_TON) * AFFILIATE_PERCENTAGE
      const roundedAmount = parseFloat(txAmountTON.toFixed(2))
      if (txAgeMs < TON_LOCK_PERIOD_MS) {
        acc.lockedTON += roundedAmount
      } else {
        acc.pendingTON += roundedAmount
      }
      return acc
    },
    { lockedTON: 0, pendingTON: 0 }
  )

  return {
    totalStarsLocked: parseFloat(starsResult.lockedStars.toFixed(2)), // Stars amount locked
    totalStarsPendingWithdrawal: parseFloat(
      starsResult.pendingStars.toFixed(2)
    ), // Stars amount pending
    totalStarsLockedInTON: totalStarsLockedInTON, // TON equivalent of locked Stars
    totalStarsPendingInTON: totalStarsPendingInTON, // TON equivalent of pending Stars
    totalTONLocked: parseFloat(tonResult.lockedTON.toFixed(2)), // TON amount locked
    totalTONPendingWithdrawal: parseFloat(tonResult.pendingTON.toFixed(2)), // TON amount pending
  }
}
// Withdraw both Stars and TON earnings with transaction safety
export const withdrawAffiliateEarnings = async (affiliateId) => {
  const STARS_LOCK_PERIOD_MS = 21 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000
  const TON_LOCK_PERIOD_MS = 1 * 24 * 60 * 60 * 1000
  const AFFILIATE_PERCENTAGE = 0.1
  const STARS_TO_TON_RATE = 1000
  const NANOTONS_TO_TON = 1e9
  const now = new Date()

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
    ).sort({ createdAt: 1 })

    const pendingStars = starsTxs.reduce((sum, tx) => {
      const txAmount = parseFloat(tx.amount) * AFFILIATE_PERCENTAGE
      return sum + parseFloat(txAmount.toFixed(2))
    }, 0)
    const starsTxIds = starsTxs.map((tx) => tx._id)

    // Fetch Pending TON
    const tonTxs = await TONTransactions.find(
      {
        affiliate_id: Number(affiliateId),
        currency: "TON",
        status: "complete",
        createdAt: { $lt: new Date(now - TON_LOCK_PERIOD_MS) },
        _id: {
          $nin: await AffiliateTONTransaction.find({
            affiliateId: Number(affiliateId),
            status: "complete",
          }).distinct("tonTxIds"),
        },
      },
      null,
      { session }
    ).sort({ createdAt: 1 })

    const pendingTON = tonTxs.reduce((sum, tx) => {
      const txAmountTON =
        (parseFloat(tx.amount) / NANOTONS_TO_TON) * AFFILIATE_PERCENTAGE
      return sum + parseFloat(txAmountTON.toFixed(2))
    }, 0)
    const tonTxIds = tonTxs.map((tx) => tx._id)

    // Calculate Total TON
    const starsInTON = parseFloat((pendingStars / STARS_TO_TON_RATE).toFixed(2))
    const totalTON = parseFloat((starsInTON + pendingTON).toFixed(2))

    if (totalTON <= 0) throw new Error("No available earnings to withdraw")

    // Record Withdrawals
    const withdrawalRecords = []
    if (pendingStars > 0) {
      const starsWithdrawal = new AffiliateTransaction({
        affiliateId: Number(affiliateId),
        starsTxIds,
        amount: starsInTON,
        starsAmount: parseFloat(pendingStars.toFixed(2)),
        status: "pending",
      })
      await starsWithdrawal.save({ session })
      withdrawalRecords.push(starsWithdrawal)
    }
    if (pendingTON > 0) {
      const tonWithdrawal = new AffiliateTONTransaction({
        affiliateId: Number(affiliateId),
        tonTxIds,
        amount: pendingTON,
        status: "pending",
      })
      await tonWithdrawal.save({ session })
      withdrawalRecords.push(tonWithdrawal)
    }

    // Check Wallet and Transfer (outside transaction to avoid double transfer)
    const walletAddress = await getConnectedWallet(affiliateId)
    if (walletAddress) {
      const tonTxHash = await transferTON(walletAddress, totalTON)
      for (const record of withdrawalRecords) {
        record.status = "complete"
        record.tonTxHash = tonTxHash
        await record.save({ session })
      }
      return { totalTON, tonTxHash, walletAddress }
    } else {
      console.log(
        "No wallet connected, withdrawal recorded but not transferred"
      )
      return { totalTON, tonTxHash: null, walletAddress: null }
    }
  }

  await withTransaction(operation)
}
