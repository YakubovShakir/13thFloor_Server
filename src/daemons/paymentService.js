// src/utils/affiliateWithdraw.js
import StarsTransactions from "../models/tx/starsTransactionModel.mjs";
import TONTransactions from "../models/tx/tonTransactionModel.js";
import AffiliateTransaction from "../models/tx/affiliateTransactionModel.js";
import User from "../models/user/userModel.js";
import mongoose from "mongoose";
import { Address, internal, beginCell, toNano, SendMode, TonClient, WalletContractV4 } from "@ton/ton";
import axios from "axios";
import { mnemonicToPrivateKey } from "ton-crypto";
import winston from "winston";
import IORedis from 'ioredis'
import { config } from "dotenv";
import colors from 'ansi-colors'
import UserParameters from "../models/user/userParametersModel.js";
import Referal from "../models/referral/referralModel.js";
config()

// TON Center API configuration
const TONCENTER_API_KEY = process.env.TONCENTER_API_KEY;
const TONCENTER_API_URL = "https://toncenter.com/api/v2";

// Constants
const STARS_LOCK_PERIOD_MS = 21 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000; // 21 days + 10 minutes
const TON_LOCK_PERIOD_MS = 1 * 24 * 60 * 60 * 1000; // 1 day
const AFFILIATE_PERCENTAGE = 0.1; // 10% commission
const STARS_TO_TON_RATE = 1000; // 1000 Stars = 1 TON
const NANOTONS_TO_TON = 1e9; // 1 TON = 1,000,000,000 nanotons

const redis = new IORedis({
  host: process.env.REDIS_HOST || "redis-test",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  password: process.env.REDIS_PASSWORD || "redis_password",
  maxRetriesPerRequest: null
});
redis.on("connect", () => console.log("Redis connected for middleware"));
redis.on("error", (err) => console.error("Redis error in middleware:", err));

// Test the connection
redis.ping().then((result) => {
  console.log('IORedis PING result:', result);
}).catch((err) => {
  console.error('IORedis PING failed:', err);
});

const logger = winston.createLogger({
  level: "trace",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export const gameCenterLevelRequirements = {
  1: 1,
  2: 5,
  3: 10,
  4: 25,
  5: 40,
  6: 60,
  7: 90,
  8: 200,
  9: 300,
  10: 450,
  11: 500,
  12: 750,
  13: 1000,
  14: 1500,
  15: 2250,
  16: 2500,
  17: 3750,
  18: 5500,
  19: 8250,
  20: 10000,
  21: 15000,
  22: 22500,
  23: 33750,
  24: 50000,
  25: 75000,
  26: 112500,
  27: 168750,
  28: 253130,
  29: 379700,
  30: 569550,
  31: 854330,
  32: 1281500,
  33: 1922250,
  34: 2883380,
  35: 4325070,
}

export const withTransaction = async (operation, maxRetries = 3, retryDelay = 500) => {
  let retryCount = 0;
  let session;

  while (retryCount < maxRetries) {
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      const result = await operation(session);

      await session.commitTransaction();
      return result; // Return whatever the operation returns
    } catch (error) {
      if (session) {
        await session.abortTransaction();
      }

      if (error.name === "MongoServerError" && error.code === 112) {
        retryCount++;
        if (retryCount < maxRetries) {
          logger.warn(
            colors.yellow(`WriteConflict detected, retrying (${retryCount}/${maxRetries})`),
            { error: error.message }
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay * retryCount)); // Exponential delay
          continue;
        } else {
          logger.error(
            colors.red(`Max retries (${maxRetries}) reached for WriteConflict`),
            { error: error.message, stack: error.stack }
          );
          throw new Error(`Failed after ${maxRetries} retries due to WriteConflict: ${error.message}`);
        }
      } else {
        logger.error(
          "error",
          colors.red(`Transaction failed`),
          { error: error.message, stack: error.stack }
        );
        throw error;
      }
    } finally {
      if (session) {
        session.endSession();
      }
    }
  }
};

export async function openWallet(mnemonic, testnet) {
  const TONCENTER_API_KEY = process.env.TONCENTER_API_KEY
  const keyPair = await mnemonicToPrivateKey(mnemonic)

  const toncenterBaseEndpoint = testnet
    ? "https://testnet.toncenter.com"
    : "https://toncenter.com"

  const client = new TonClient({
    endpoint: `${toncenterBaseEndpoint}/api/v2/jsonRPC`,
    apiKey: TONCENTER_API_KEY,
  })

  const wallet = WalletContractV4.create({
    workchain: 0,
    publicKey: keyPair.publicKey,
  })

  const contract = client.open(wallet)
  return { contract, keyPair, client }
}

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

  console.log(user)

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

  const user = await User.findOne({ id: affiliateId })
  const refsCount = await Referal.countDocuments({ refer_id: affiliateId })
  const gameCenterLevel = user?.investment_levels?.game_center || 0
  const currentLevelRefsRequired = gameCenterLevelRequirements[gameCenterLevel] || 0
  const nextLevelRefsRequired = gameCenterLevelRequirements[gameCenterLevel + 1] || currentLevelRefsRequired

  const earningsData = {
    totalStarsLocked: parseFloat(starsResult.lockedStars.toFixed(2)),
    totalStarsPendingWithdrawal: parseFloat(starsResult.pendingStars.toFixed(2)),
    totalStarsLockedInTON,
    totalStarsPendingInTON,
    totalTONLocked: parseFloat(tonResult.lockedTON.toFixed(2)),
    totalTONPendingWithdrawal: parseFloat(tonResult.pendingTON.toFixed(2)),
    currentLevelRefsRequired,
    refsCount,
    nextLevelRefsRequired,
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