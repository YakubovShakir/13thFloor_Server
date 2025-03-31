import StarsTransactions from "../models/tx/starsTransactionModel.mjs";

// src/utils/starsAffiliate.js
import StarsTransactions from '../models/stars/starsTransactionModel.js';
import AffiliateTransaction from '../models/affiliate/affiliateTransactionModel.js';

// Get locked and pending Stars for an affiliate
export const getStarsAffiliateData = async (affiliateId) => {
  if (!affiliateId) {
    throw new Error('Affiliate ID is required');
  }

  const LOCK_PERIOD_MS = 21 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000; // 21 days + 10 minutes
  const now = new Date();
  const AFFILIATE_PERCENTAGE = 0.10; // 10% commission

  // Fetch all completed Stars transactions for the affiliate
  const starsTxs = await StarsTransactions.find({
    affiliate_id: Number(affiliateId), // Ensure type matches Number
    currency: 'XTR',
    status: 'complete',
  }).select('_id createdAt amount');

  // Get IDs of Stars transactions already withdrawn
  const withdrawnTxIds = await AffiliateTransaction.find({
    affiliateId: Number(affiliateId), // Match Number type
    status: { $in: ['complete', 'pending'] },
  }).distinct('starsTxIds');

  // Filter out withdrawn transactions
  const availableTxs = starsTxs.filter(tx => !withdrawnTxIds.some(id => id.equals(tx._id)));

  // Calculate locked and pending Stars
  const result = availableTxs.reduce(
    (acc, tx) => {
      const txAgeMs = now - new Date(tx.createdAt);
      const txAmount = parseFloat(tx.amount) * AFFILIATE_PERCENTAGE; // 10% of transaction amount
      const roundedAmount = parseFloat(txAmount.toFixed(2)); // Fix to 2 decimal places
      if (txAgeMs < LOCK_PERIOD_MS) {
        acc.locked += roundedAmount; // Locked Stars
      } else {
        acc.pending += roundedAmount; // Available for withdrawal
      }
      return acc;
    },
    { locked: 0, pending: 0 }
  );

  return {
    totalStarsLocked: parseFloat(result.locked.toFixed(2)),
    totalStarsPendingWithdrawal: parseFloat(result.pending.toFixed(2)),
  };
};

// Handle affiliate withdrawal
export const withdrawStars = async (affiliateId, tonAmount) => {
  const LOCK_PERIOD_MS = 21 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000; // 21 days + 10 minutes
  const now = new Date();
  const STARS_TO_TON_RATE = 1000; // Example: 1000 Stars = 1 TON
  const AFFILIATE_PERCENTAGE = 0.10; // 10% commission

  // Fetch pending transactions (past lock period, not withdrawn)
  const pendingTxs = await StarsTransactions.find({
    affiliate_id: Number(affiliateId), // Match Number type
    currency: 'XTR',
    status: 'complete',
    createdAt: { $lt: new Date(now - LOCK_PERIOD_MS) },
    _id: { $nin: await AffiliateTransaction.find({ affiliateId: Number(affiliateId), status: 'complete' }).distinct('starsTxIds') },
  }).sort({ createdAt: 1 }); // Oldest first

  // Calculate total pending Stars
  const totalPending = pendingTxs.reduce((sum, tx) => {
    const txAmount = parseFloat(tx.amount) * AFFILIATE_PERCENTAGE;
    return sum + parseFloat(txAmount.toFixed(2));
  }, 0);

  const starsToWithdraw = parseFloat((tonAmount * STARS_TO_TON_RATE).toFixed(2));

  if (starsToWithdraw > totalPending) {
    throw new Error('Insufficient pending Stars for withdrawal');
  }

  // Select transactions to withdraw
  let withdrawnStars = 0;
  const selectedTxIds = [];
  for (const tx of pendingTxs) {
    const txAmount = parseFloat((parseFloat(tx.amount) * AFFILIATE_PERCENTAGE).toFixed(2));
    if (withdrawnStars + txAmount > starsToWithdraw) break;
    selectedTxIds.push(tx._id);
    withdrawnStars += txAmount;
    if (withdrawnStars >= starsToWithdraw) break;
  }

  // Create withdrawal record
  const affiliateTx = await AffiliateTransaction.create({
    affiliateId: Number(affiliateId), // Match Number type
    starsTxIds: selectedTxIds,
    amount: parseFloat(tonAmount.toFixed(2)), // TON amount, 2 decimal places
    starsAmount: parseFloat(withdrawnStars.toFixed(2)), // Stars withdrawn, 2 decimal places
    status: 'pending',
  });

  return affiliateTx;
};