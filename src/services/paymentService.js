// src/utils/affiliateWithdraw.js
import StarsTransactions from "../models/tx/starsTransactionModel.mjs"; // Your import
import TONTransactions from "../models/tx/tonTransactionModel.js"; // Your import
import AffiliateTransaction from "../models/affiliate/affiliateTransactionModel.js"; // Your import
import AffiliateTONTransaction from "../models/tx/affiliateTonTransactions.js"; // Corrected import name
import mongoose from 'mongoose';
import { withTransaction } from '../utils/dbUtils.js'; // Assuming this is where withTransaction lives

// Mock wallet functions
const getConnectedWallet = async (affiliateId) => {
  return Math.random() > 0.5 ? "mock-ton-address-123" : null;
};

const transferTON = async (address, amount) => {
  console.log(`Transferring ${amount} TON to ${address}`);
  return `mock-tx-hash-${Date.now()}`;
};

// Combined function to get Stars and TON affiliate earnings
export const getAffiliateEarningsData = async (affiliateId) => {
  if (!affiliateId) throw new Error('Affiliate ID is required');

  const STARS_LOCK_PERIOD_MS = 21 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000; // 21 days + 10 minutes
  const TON_LOCK_PERIOD_MS = 1 * 24 * 60 * 60 * 1000; // 1 day
  const AFFILIATE_PERCENTAGE = 0.10; // 10% commission
  const NANOTONS_TO_TON = 1e9; // 1 TON = 1,000,000,000 nanotons
  const now = new Date();

  // --- Stars Transactions ---
  const starsTxs = await StarsTransactions.find({
    affiliate_id: Number(affiliateId),
    currency: 'XTR',
    status: 'complete',
  }).select('_id createdAt amount');

  const starsWithdrawnTxIds = await AffiliateTransaction.find({
    affiliateId: Number(affiliateId),
    status: 'complete',
  }).distinct('starsTxIds');

  const starsAvailableTxs = starsTxs.filter(tx => !starsWithdrawnTxIds.some(id => id.equals(tx._id)));

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

  // --- TON Transactions ---
  const tonTxs = await TONTransactions.find({
    affiliate_id: Number(affiliateId),
    currency: 'TON',
    status: 'complete',
  }).select('_id createdAt amount');

  const tonWithdrawnTxIds = await AffiliateTONTransaction.find({
    affiliateId: Number(affiliateId),
    status: 'complete',
  }).distinct('tonTxIds');

  const tonAvailableTxs = tonTxs.filter(tx => !tonWithdrawnTxIds.some(id => id.equals(tx._id)));

  const tonResult = tonAvailableTxs.reduce(
    (acc, tx) => {
      const txAgeMs = now - new Date(tx.createdAt);
      const txAmountTON = parseFloat(tx.amount) / NANOTONS_TO_TON * AFFILIATE_PERCENTAGE;
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
    totalStarsLocked: parseFloat(starsResult.lockedStars.toFixed(2)),
    totalStarsPendingWithdrawal: parseFloat(starsResult.pendingStars.toFixed(2)),
    totalTONLocked: parseFloat(tonResult.lockedTON.toFixed(2)),
    totalTONPendingWithdrawal: parseFloat(tonResult.pendingTON.toFixed(2)),
  };
};

// Withdraw both Stars and TON earnings with transaction safety
export const withdrawAffiliateEarnings = async (affiliateId) => {
  const STARS_LOCK_PERIOD_MS = 21 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000;
  const TON_LOCK_PERIOD_MS = 1 * 24 * 60 * 60 * 1000;
  const AFFILIATE_PERCENTAGE = 0.10;
  const STARS_TO_TON_RATE = 1000;
  const NANOTONS_TO_TON = 1e9;
  const now = new Date();

  const operation = async (session) => {
    // Fetch Pending Stars
    const starsTxs = await StarsTransactions.find({
      affiliate_id: Number(affiliateId),
      currency: 'XTR',
      status: 'complete',
      createdAt: { $lt: new Date(now - STARS_LOCK_PERIOD_MS) },
      _id: { $nin: await AffiliateTransaction.find({ affiliateId: Number(affiliateId), status: 'complete' }).distinct('starsTxIds') },
    }, null, { session }).sort({ createdAt: 1 });

    const pendingStars = starsTxs.reduce((sum, tx) => {
      const txAmount = parseFloat(tx.amount) * AFFILIATE_PERCENTAGE;
      return sum + parseFloat(txAmount.toFixed(2));
    }, 0);
    const starsTxIds = starsTxs.map(tx => tx._id);

    // Fetch Pending TON
    const tonTxs = await TONTransactions.find({
      affiliate_id: Number(affiliateId),
      currency: 'TON',
      status: 'complete',
      createdAt: { $lt: new Date(now - TON_LOCK_PERIOD_MS) },
      _id: { $nin: await AffiliateTONTransaction.find({ affiliateId: Number(affiliateId), status: 'complete' }).distinct('tonTxIds') },
    }, null, { session }).sort({ createdAt: 1 });

    const pendingTON = tonTxs.reduce((sum, tx) => {
      const txAmountTON = parseFloat(tx.amount) / NANOTONS_TO_TON * AFFILIATE_PERCENTAGE;
      return sum + parseFloat(txAmountTON.toFixed(2));
    }, 0);
    const tonTxIds = tonTxs.map(tx => tx._id);

    // Calculate Total TON
    const starsInTON = parseFloat((pendingStars / STARS_TO_TON_RATE).toFixed(2));
    const totalTON = parseFloat((starsInTON + pendingTON).toFixed(2));

    if (totalTON <= 0) throw new Error('No available earnings to withdraw');

    // Record Withdrawals
    const withdrawalRecords = [];
    if (pendingStars > 0) {
      const starsWithdrawal = new AffiliateTransaction({
        affiliateId: Number(affiliateId),
        starsTxIds,
        amount: starsInTON,
        starsAmount: parseFloat(pendingStars.toFixed(2)),
        status: 'pending',
      });
      await starsWithdrawal.save({ session });
      withdrawalRecords.push(starsWithdrawal);
    }
    if (pendingTON > 0) {
      const tonWithdrawal = new AffiliateTONTransaction({
        affiliateId: Number(affiliateId),
        tonTxIds,
        amount: pendingTON,
        status: 'pending',
      });
      await tonWithdrawal.save({ session });
      withdrawalRecords.push(tonWithdrawal);
    }

    // Check Wallet and Transfer (outside transaction to avoid double transfer)
    const walletAddress = await getConnectedWallet(affiliateId);
    if (walletAddress) {
      const tonTxHash = await transferTON(walletAddress, totalTON);
      for (const record of withdrawalRecords) {
        record.status = 'complete';
        record.tonTxHash = tonTxHash;
        await record.save({ session });
      }
      return { totalTON, tonTxHash, walletAddress };
    } else {
      console.log('No wallet connected, withdrawal recorded but not transferred');
      return { totalTON, tonTxHash: null, walletAddress: null };
    }
  };

  return await withTransaction(operation);
};

// Transaction utility (your provided function)
export const withTransaction = async (operation, maxRetries = 3, retryDelay = 500) => {
  let retryCount = 0;
  let session;

  while (retryCount < maxRetries) {
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      const result = await operation(session);

      await session.commitTransaction();
      return result;
    } catch (error) {
      if (session) {
        await session.abortTransaction();
      }

      if (error.name === "MongoServerError" && error.code === 112) {
        retryCount++;
        if (retryCount < maxRetries) {
          await log("warn", colors.yellow(`WriteConflict detected, retrying (${retryCount}/${maxRetries})`), { error: error.message });
          await new Promise((resolve) => setTimeout(resolve, retryDelay * retryCount));
          continue;
        } else {
          await log("error", colors.red(`Max retries (${maxRetries}) reached for WriteConflict`), { error: error.message, stack: error.stack });
          throw new Error(`Failed after ${maxRetries} retries due to WriteConflict: ${error.message}`);
        }
      } else {
        await log("error", colors.red(`Transaction failed`), { error: error.message, stack: error.stack });
        throw error;
      }
    } finally {
      if (session) {
        session.endSession();
      }
    }
  }
};