// src/utils/affiliateWithdraw.js
import StarsTransactions from "../models/tx/starsTransactionModel.mjs";
import TONTransactions from "../models/tx/tonTransactionModel.js";
import AffiliateTransaction from "../models/tx/affiliateTransactionModel.js";
import User from "../models/user/userModel.js";
import { withTransaction } from "../utils/dbUtils.js";
import { Address, internal, beginCell, toNano, SendMode } from "@ton/ton";
import { openWallet } from "../routes/user/userRoutes.js";
import axios from "axios";
import { log as logger } from "../gameTimer/gameTimer.js";

// TON Center API configuration
const TONCENTER_API_KEY = process.env.TONCENTER_API_KEY;
const TONCENTER_API_URL = "https://toncenter.com/api/v2";

// Constants
const STARS_LOCK_PERIOD_MS = 21 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000; // 21 days + 10 minutes
const TON_LOCK_PERIOD_MS = 1 * 24 * 60 * 60 * 1000; // 1 day
const AFFILIATE_PERCENTAGE = 0.1; // 10% commission
const STARS_TO_TON_RATE = 1000; // 1000 Stars = 1 TON
const NANOTONS_TO_TON = 1e9; // 1 TON = 1,000,000,000 nanotons

// Retry utility with exponential backoff
const retry = async (operation, maxRetries = 5, delay = 1000) => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const result = await operation();
      logger.info({ message: "Operation succeeded", attempt: attempt + 1 });
      return result;
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) {
        logger.error({
          message: "Operation failed after max retries",
          attempts: maxRetries,
          error: error.message,
        });
        throw error;
      }
      const waitTime = delay * Math.pow(2, attempt - 1);
      logger.warn({
        message: "Operation failed, retrying",
        attempt,
        waitTime,
        error: error.message,
      });
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }
};

// Wallet setup
let walletContract, keyPair, tonClient;
const mnemonic = process.env.MNEMONICS.split(" ");
const testnet = process.env.TESTNET === "true";

const initializeWallet = async () => {
  logger.info({ message: "Initializing wallet" });
  const walletData = await openWallet(mnemonic, testnet);
  walletContract = walletData.contract;
  keyPair = walletData.keyPair;
  tonClient = walletData.client;
  logger.info({
    message: "Wallet initialized",
    address: walletContract.address.toString({ bounceable: false }),
  });
};

// Check if wallet is initialized
const isWalletInitialized = async (address) => {
  const response = await axios.get(`${TONCENTER_API_URL}/getAddressInformation`, {
    params: {
      address: address.toString({ bounceable: false }),
      api_key: TONCENTER_API_KEY,
    },
  });
  const isActive = response.data.result.state === "active";
  logger.info({
    message: "Checked wallet initialization",
    address: address.toString({ bounceable: false }),
    initialized: isActive,
  });
  return isActive;
};

// Get user's TON wallet address
const getConnectedWallet = async (affiliateId, session) => {
  const user = await User.findOne(
    { id: affiliateId },
    { tonWalletAddress: 1 },
    { session }
  );
  if (!user || !user.tonWalletAddress) {
    logger.error({ message: "User or wallet address not found", affiliateId });
    throw new Error("User or TON wallet address not found");
  }
  const parsedAddress = Address.parse(user.tonWalletAddress);
  logger.info({
    message: "Retrieved wallet address",
    affiliateId,
    address: parsedAddress.toString({ bounceable: false }),
  });
  return parsedAddress;
};

// Transfer TON with retries and detailed tracking
const transferTON = async (destinationAddress, amount, affiliateTransaction, session) => {
  try {
    logger.info({
      message: "Starting TON transfer",
      destination: destinationAddress.toString({ bounceable: false }),
      amount,
    });

    // Initialize wallet if not already done
    if (!walletContract || !keyPair || !tonClient) {
      await retry(initializeWallet);
    }

    const addressObject =
      destinationAddress instanceof Address
        ? destinationAddress
        : Address.parse(destinationAddress);

    // Check wallet initialization with retry
    const walletInitialized = await retry(() => isWalletInitialized(addressObject));

    const amountNano = toNano(amount.toString());

    // Update transaction to "transferring"
    affiliateTransaction.status = "transferring";
    affiliateTransaction.transferInitiatedAt = new Date();
    await affiliateTransaction.save({ session });
    logger.info({
      message: "Updated transaction status to transferring",
      transactionId: affiliateTransaction._id,
    });

    const seqno = await walletContract.getSeqno();
    const transferMessage = internal({
      to: addressObject,
      value: amountNano,
      body: beginCell()
        .storeUint(0, 32)
        .storeBuffer(Buffer.from("🎉 13th Floor Affiliate Payment 🎉", "utf-8"))
        .endCell(),
      bounce: !walletInitialized,
    });

    // Send transfer with retry
    await retry(() =>
      walletContract.sendTransfer({
        seqno,
        secretKey: keyPair.secretKey,
        messages: [transferMessage],
        sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
      })
    );
    logger.info({ message: "TON transfer sent", seqno });

    // Confirm transaction with retry
    const confirmTransaction = async () => {
      const currentSeqno = await walletContract.getSeqno();
      if (currentSeqno <= seqno) throw new Error("Transaction not confirmed yet");
      return currentSeqno;
    };
    await retry(confirmTransaction, 20, 3000);
    logger.info({ message: "Transaction confirmed on blockchain" });

    // Fetch transaction hash with retry
    const getTxHash = async () => {
      const response = await axios.get(`${TONCENTER_API_URL}/getTransactions`, {
        params: {
          address: walletContract.address.toString({ bounceable: false }),
          limit: 1,
          sort: "desc",
          api_key: TONCENTER_API_KEY,
          archival: true,
        },
      });
      const txHash = response.data.result[0]?.transaction_id?.hash;
      if (!txHash) throw new Error("Transaction hash not found");
      return txHash;
    };
    const txHash = await retry(getTxHash);
    logger.info({ message: "Fetched transaction hash", txHash });

    // Update transaction to "complete"
    affiliateTransaction.status = "complete";
    affiliateTransaction.tonTxHash = txHash;
    affiliateTransaction.transferConfirmedAt = new Date();
    await affiliateTransaction.save({ session });
    logger.info({
      message: "Transfer completed",
      transactionId: affiliateTransaction._id,
      txHash,
    });

    return txHash;
  } catch (error) {
    logger.error({
      message: "TON transfer failed",
      error: error.message,
      transactionId: affiliateTransaction?._id,
    });
    affiliateTransaction.status = "failed";
    affiliateTransaction.error_message = error.message;
    await affiliateTransaction.save({ session });
    throw error;
  }
};

// Get affiliate earnings data
export const getAffiliateEarningsData = async (affiliateId) => {
  if (!affiliateId) throw new Error("Affiliate ID is required");

  const now = new Date();
  logger.info({ message: "Fetching affiliate earnings data", affiliateId });

  // Stars transactions
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

  const totalStarsLockedInTON = parseFloat(
    (starsResult.lockedStars / STARS_TO_TON_RATE).toFixed(2)
  );
  const totalStarsPendingInTON = parseFloat(
    (starsResult.pendingStars / STARS_TO_TON_RATE).toFixed(2)
  );

  // TON transactions
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

  const earningsData = {
    totalStarsLocked: parseFloat(starsResult.lockedStars.toFixed(2)),
    totalStarsPendingWithdrawal: parseFloat(starsResult.pendingStars.toFixed(2)),
    totalStarsLockedInTON,
    totalStarsPendingInTON,
    totalTONLocked: parseFloat(tonResult.lockedTON.toFixed(2)),
    totalTONPendingWithdrawal: parseFloat(tonResult.pendingTON.toFixed(2)),
  };

  logger.info({ message: "Earnings data retrieved", affiliateId, data: earningsData });
  return earningsData;
};

// Withdraw affiliate earnings
export const withdrawAffiliateEarnings = async (affiliateId) => {
  const now = new Date();
  logger.info({ message: "Starting withdrawal process", affiliateId });

  const operation = async (session) => {
    // Acquire lock atomically
    const user = await User.findOneAndUpdate(
      { id: affiliateId, is_withdrawing: false },
      { $set: { is_withdrawing: true } },
      { new: true, session }
    );
    if (!user) {
      logger.error({
        message: "Withdrawal already in progress or user not found",
        affiliateId,
      });
      throw new Error("Withdrawal already in progress or user not found");
    }

    try {
      // Calculate pending earnings
      const starsTxs = await StarsTransactions.find(
        {
          affiliate_id: Number(affiliateId),
          currency: "XTR",
          status: "complete",
          createdAt: { $lt: new Date(now - STARS_LOCK_PERIOD_MS) },
          _id: {
            $nin: await AffiliateTransaction.find(
              { affiliateId: Number(affiliateId), status: "complete" },
              null,
              { session }
            ).distinct("starsTxIds"),
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

      const tonTxs = await TONTransactions.find(
        {
          affiliate_id: Number(affiliateId),
          currency: "TON",
          status: "complete",
          createdAt: { $lt: new Date(now - TON_LOCK_PERIOD_MS) },
          _id: {
            $nin: await AffiliateTransaction.find(
              { affiliateId: Number(affiliateId), status: "complete" },
              null,
              { session }
            ).distinct("tonTxIds"),
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

      const starsInTON = parseFloat((pendingStars / STARS_TO_TON_RATE).toFixed(2));
      const totalTON = parseFloat((starsInTON + pendingTON).toFixed(2));

      logger.info({
        message: "Calculated pending earnings",
        affiliateId,
        pendingStars,
        pendingTON,
        totalTON,
      });

      if (totalTON <= 0) {
        logger.warn({ message: "No available earnings to withdraw", affiliateId });
        throw new Error("No available earnings to withdraw");
      }
      if (totalTON < 5) {
        logger.warn({ message: "Less than 5 TON pending", affiliateId, totalTON });
        throw new Error("Less than 5 TON pending");
      }

      // Create AffiliateTransaction
      const affiliateTransaction = new AffiliateTransaction({
        affiliateId: Number(affiliateId),
        starsTxIds,
        tonTxIds,
        starsAmount: parseFloat(pendingStars.toFixed(2)),
        tonAmount: parseFloat(pendingTON.toFixed(2)),
        totalTonWithdrawn: totalTON,
        status: "pending",
      });
      await affiliateTransaction.save({ session });
      logger.info({
        message: "Created affiliate transaction",
        transactionId: affiliateTransaction._id,
      });

      // Get wallet address
      const walletAddress = await getConnectedWallet(affiliateId, session);

      // Perform TON transfer
      const tonTxHash = await transferTON(
        walletAddress,
        totalTON,
        affiliateTransaction,
        session
      );

      // Release lock
      await User.updateOne(
        { id: affiliateId },
        { $set: { is_withdrawing: false } },
        { session }
      );
      logger.info({ message: "Withdrawal lock released", affiliateId });

      const result = {
        totalTON,
        tonTxHash,
        walletAddress: walletAddress.toString({ bounceable: false }),
      };
      logger.info({ message: "Withdrawal completed successfully", affiliateId, result });
      return result;
    } catch (error) {
      // Release lock on error
      await User.updateOne(
        { id: affiliateId },
        { $set: { is_withdrawing: false } },
        { session }
      );
      logger.error({
        message: "Withdrawal failed",
        affiliateId,
        error: error.message,
      });
      throw error;
    }
  };

  return await withTransaction(operation);
};