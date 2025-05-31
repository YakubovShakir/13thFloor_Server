import { config } from "dotenv";
config();

import cron from "node-cron";
import IORedis from 'ioredis'
import colors from 'ansi-colors';
import gameProcess from "../models/process/processModel.js";
import UserParameters from "../models/user/userParametersModel.js";
import moment from "moment-timezone";
import Work from "../models/work/workModel.js";
import TrainingParameters from "../models/training/trainingParameters.js";
import LevelsParameters from "../models/level/levelParametersModel.js";
import { ConstantEffects } from "../models/effects/constantEffectsLevels.js";
import Food from "../models/food/foodModel.js";
import Boost from "../models/boost/boostModel.js";
import UserSkill from "../models/user/userSkillModel.js";
import User from "../models/user/userModel.js";
import Investments from "../models/investments/investmentModel.js";
import { InvestmentTypes } from "../models/investments/userLaunchedInvestments.js";
import UserLaunchedInvestments from "../models/investments/userLaunchedInvestments.js";
import Bottleneck from "bottleneck";
import { Address, beginCell, internal, SendMode, toNano, TonClient, WalletContractV4 } from "@ton/ton";
import nftMap from "./nft_mapping.json" with { type: "json" };
import axios from "axios";
import { ActiveEffectTypes, ActiveEffectsModel } from "../models/effects/activeEffectsModel.js";
import Referal from "../models/referral/referralModel.js";
import mongoose from "mongoose";
import UserCurrentInventory from "../models/user/userInventoryModel.js";
import ShelfItemModel from "../models/shelfItem/shelfItemModel.js";
import UserClothing from "../models/user/userClothingModel.js";
import Clothing from "../models/clothing/clothingModel.js";
import Skill from "../models/skill/skillModel.js";
import { mnemonicToPrivateKey } from '@ton/crypto';
import TONTransactions from "../models/tx/tonTransactionModel.js";
import NFTItems from "../models/nft/nftItemModel.js";
import Queue from 'bull';
import winston from "winston";
import Autoclaims from "../models/investments/autoclaimsModel.js";
import { UserSpins } from "../models/user/userSpinsModel.js";

// Global flags to prevent cron overlaps
const schedulerFlags = {
  work: false,
  training: false,
  sleep: false,
  skill: false,
  food: false,
  boost: false,
  autoclaim: false,
  nft_scan: false,
  TX_SCANNER: false,
  investment_level_checks: false,
  spin_scan: false,
  level_scan: false,
};

export const withTransaction = async (operation, session, maxRetries = 1, retryDelay = 1500) => {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
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
          log.warn(
            colors.yellow(`WriteConflict detected, retrying (${retryCount}/${maxRetries})`),
            { error: error.message }
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay * retryCount)); // Exponential delay
          continue;
        } else {
          log.error(
            colors.red(`Max retries (${maxRetries}) reached for WriteConflict`),
            { error: error.message, stack: error.stack }
          );
          throw new Error(`Failed after ${maxRetries} retries due to WriteConflict: ${error.message}`);
        }
      } else {
        log.error(
          colors.red(`Transaction failed`),
          { error: error.message, stack: error.stack }
        );
        throw error;
      }
    }
  }
};

export const recalcValuesByParameters = async (
  userParameters,
  { coinsReward = 0, moodProfit = 0 },
  session
) => {
  console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}`);

  return await withTransaction(async (session) => {
    // Fetch the latest userParameters within the transaction
    const user = await UserParameters.findOne({ id: userParameters.id }, null, { session });
    if (!user) throw new Error(`UserParameters not found for ID: ${userParameters.id}`);

    // Mood updates
    let moodChange = moodProfit;
    if (user.hungry > 49) {
      // No penalty
    } else if (user.hungry <= 49 && user.hungry >= 9) {
      moodChange = Math.max(0, -0.09722) + moodProfit;
    } else {
      moodChange = Math.max(0, -0.155) + moodProfit;
    }

    if (moodChange !== 0) {
      user.mood = Math.min(100, user.mood + moodChange);
      await user.save({ session });
      console.log(`[recalcValuesByParameters] mood updated to ${user.mood}`);
    }

    // Balance updates
    let adjustedCoinsReward = coinsReward;
    if (user.mood > 49) {
      adjustedCoinsReward = coinsReward;
    } else if (user.mood <= 49 && user.mood > 9) {
      adjustedCoinsReward = coinsReward * 0.9;
    } else if (user.mood <= 9 && user.mood > 1) {
      adjustedCoinsReward = coinsReward * 0.5;
    } else if (coinsReward > 0) {
      adjustedCoinsReward = 1;
    }

    if (adjustedCoinsReward !== 0) {
      await operationMap.updateUserBalance({ id: userParameters.id, amount: adjustedCoinsReward}, session); // Already uses withTransaction
      console.log(`[recalcValuesByParameters] balance updated with amount ${adjustedCoinsReward}`);
    }

    log.debug(colors.cyan(`Completed recalcValuesByParameters for user ${userParameters.id}`));
    return { mood: user.mood, coins: user.coins }; // Return updated values
  }, session);
};

// Redis setup
const redis = new IORedis({
  host: process.env.REDIS_HOST || "redis-test",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  password: process.env.REDIS_PASSWORD || "redis_password",
});
redis.on("connect", () => console.log("Redis connected for middleware"));
redis.on("error", (err) => console.error("Redis error in middleware:", err));

// Logger setup
const log = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

// Helper to get boost percentage for owner
export const getBoostPercentageFromType = (type) => {
  switch (type) {
    case ActiveEffectTypes.BasicNekoBoost:
      return 5
    case ActiveEffectTypes.NftNekoBoost:
      return 10
    default:
      return 0
  }
}


export function calculateGamecenterLevel(refsCount) {
  const levels = Object.keys(gamecenterLevelMap)
    .map(Number)
    .sort((a, b) => a - b) // Ensure sorted order
  let low = 0
  let high = levels.length - 1

  if (refsCount < levels[0]) return 0 // Below first threshold

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const threshold = levels[mid]

    if (refsCount < threshold) {
      high = mid - 1
    } else if (
      refsCount >= threshold &&
      (mid === levels.length - 1 || refsCount < levels[mid + 1])
    ) {
      return gamecenterLevelMap[threshold] // Found the correct level
    } else {
      low = mid + 1
    }
  }

  // If we exit the loop, return the highest level (shouldn't happen with proper map)
  return gamecenterLevelMap[levels[levels.length - 1]]
}

export const gamecenterLevelMap = {
  1: 1,
  5: 2,
  10: 3,
  25: 4,
  40: 5,
  60: 6,
  90: 7,
  200: 8,
  300: 9,
  450: 10,
  500: 11,
  750: 12,
  1000: 13,
  1500: 14,
  2250: 15,
  2500: 16,
  3750: 17,
  5500: 18,
  8250: 19,
  10000: 20,
  15000: 21,
  22500: 22,
  33750: 23,
  50000: 24,
  75000: 25,
  112500: 26,
  168750: 27,
  253130: 28,
  379700: 29,
  569550: 30,
  854330: 31,
  1281500: 32,
  1922250: 33,
  2883380: 34,
  4325070: 35,
}

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

const calculateDuration = (baseDurationMinutes, durationDecreasePercentage) => {
  const decreaseFactor = durationDecreasePercentage / 100;
  const totalSeconds = baseDurationMinutes * 60;
  const adjustedSeconds = totalSeconds * (1 - decreaseFactor);
  return Math.max(1, adjustedSeconds);
};

// Centralized queue for all DB updates
const dbUpdateQueue = new Queue('db-updates', {
  redis: { 
    host: process.env.REDIS_HOST || 'redis-test', 
    port: process.env.REDIS_PORT, 
    password: process.env.REDIS_PASSWORD 
  },
  defaultJobOptions: {
    attempts: 1, // Retry on transient failures
    backoff: { type: 'fixed', delay: 1000 }, // Exponential backoff
    removeOnComplete: { count: 100 }, // Keep only the 1000 most recent completed jobs
    removeOnFail: { count: 100 }, // Keep only the 1000 most recent failed jobs
  },
});

// Map of operation types to their implementations
const operationMap = {
  updateParamsOnTick: async (params, session) => {
    const { userParametersId, finalProfits, baseParametersId, diffSeconds, processType } = params;
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const baseParameters = await Boost.findOne({ boost_id: baseParametersId }, null, { session });

    if (!userParameters || !baseParameters) {
      throw new Error(`Missing userParameters or baseParameters for ${processType}`);
    }

    if (baseParameters.type === "tonic-drink") {
      const energyRestore = (userParameters.energy_capacity / (3 * 3600)) * diffSeconds;
      userParameters.energy = Math.min(
        userParameters.energy_capacity,
        userParameters.energy + energyRestore
      );
      await userParameters.save({ session });
      log.info(`${colors.cyanBright('Applied energy restore from tonic-drink')}`, { user_id: userParameters.id, energyRestore });
    }
  },
  updateTimestamp: async (params, session) => {
    const { processId, timestamp } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    if (!process) {
      throw new Error(`Process ${processId} not found`);
    }
    process.user_parameters_updated_at = timestamp;
    await process.save({ session });
    log.debug(`Updated timestamp for process ${processId} to ${timestamp}`);
  },
  deleteProcess: async (params, session) => {
    const { processId } = params;
    await gameProcess.deleteOne({ _id: processId }, { session });
  },
  applyUserParameterUpdates: async (params, session) => {
    const { userParametersId, periodCosts, periodProfits, processType } = params;
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    if (!userParameters) {
      throw new Error(`UserParameters ${userParametersId} not found`);
    }

    // Apply costs
    Object.keys(periodCosts).forEach((key) => {
      userParameters[key] = Math.max(0, userParameters[key] - periodCosts[key]);
    });

    // Apply profits
    Object.keys(periodProfits).forEach((key) => {
      if (key === "energy") {
        userParameters[key] = Math.min(userParameters.energy_capacity, userParameters[key] + periodProfits[key]);
      } else if (key === "mood" || key === "hungry") {
        userParameters[key] = Math.min(100, userParameters[key] + periodProfits[key]);
      } else if (userParameters[key] !== undefined) {
        userParameters[key] += periodProfits[key];
      }
    });

    await userParameters.save({ session });
    log.debug(`Applied updates for ${processType} to user ${userParametersId}`);
  },
  completeWorkProcess: async (params, session) => {
    const { processId, userParametersId, baseParametersId } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const baseParameters = await Work.findOne({ work_id: baseParametersId }, null, { session });

    if (!process || !userParameters || !baseParameters) {
      return
    }

    const nekoBoostMultiplier = await getNekoBoostMultiplier(userParameters.id);
    const baseCoinsReward = (baseParameters.coins_in_hour / 3600) * (baseParameters.duration * 60);
    const coinsReward = baseCoinsReward * nekoBoostMultiplier;

    // Pass profits to recalcValuesByParameters
    await recalcValuesByParameters(userParameters, { coinsReward }, session);
    await operationMap.updateUserExperience({ id: userParameters.id, amount: baseParameters.experience_reward }, session);
    log.info(`Work process completed`, { userId: userParameters.id, coinsReward, experience: baseParameters.experience_reward });
  },
  completeTrainingProcess: async (params, session) => {
    // Training completion logic (e.g., apply skill upgrades or stats)
    log.info(`Training process completed`, { userId: userParameters.id });
  },
  completeSleepProcess: async (params, session) => {
    log.info(`Sleep process completed`, { userId: userParameters.id });
  },
  completeSkillProcess: async (params, session) => {
    const { processId, userParametersId, skillId, subType } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const skill = subType === 'constant_effects'
      ? await ConstantEffects.findOne({ id: skillId }, null, { session })
      : await Skill.findOne({ skill_id: skillId }, null, { session });

    if (!process || !userParameters || !skill) {
     return
    }

    if (subType === "constant_effects") {
      userParameters.constant_effects_levels[skill.type] = skill.level;
      await userParameters.save({ session });
      await operationMap.updateUserExperience({ id: userParametersId, amount: skill.experience_reward }, session);
    } else {
      await UserSkill.create({ id: userParametersId, skill_id: skillId }, { session });
      await operationMap.updateUserExperience({ id: userParametersId, amount: skill.experience_reward }, session);
    }

    log.info(`Skill process completed`, { userId: userParametersId, skillId });
  },
  completeFoodProcess: async (params, session) => {
    log.info(`Food process completed`, { userId: userParameters.id, profits });
  },
  processWork: async (params, session) => {
    const { processId, userParametersId, baseParametersId } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const baseParameters = await Work.findOne({ work_id: baseParametersId }, null, { session });
    const user = await User.findOne({ id: userParametersId }, null, { session });
    const userClothing = await UserClothing.findOne({ user_id: userParametersId }, null, { session });

    if (!process || !userParameters || !baseParameters || !user) {
     return
    }

    let durationDecreasePercentage = 0;
    let combinedEffects = {};
    if (process.effects && process.type !== "boost") mergeEffects(combinedEffects, process.effects);
    const shelfItems = Object.values(user.shelf).filter(Boolean);
    if (shelfItems.length > 0) {
      const shelf = await ShelfItemModel.find({ id: { $in: shelfItems } }, null, { session });
      shelf.forEach((item) => {
        if (item.effects) mergeEffects(combinedEffects, item.effects);
      });
    }
    if (userClothing) {
      const clothesItems = [userClothing.hat, userClothing.top, userClothing.pants, userClothing.shoes, userClothing.accessories]
        .filter(item => item !== null && item !== undefined);
      if (clothesItems.length > 0) {
        const clothing = await Clothing.find({ clothing_id: { $in: clothesItems } }, null, { session });
        clothing.forEach((item) => {
          if (item.effects) mergeEffects(combinedEffects, item.effects);
        });
      }
    }
    if (userParameters.constant_effects_levels["work_duration_decrease"]) {
      durationDecreasePercentage = userParameters.constant_effects_levels["work_duration_decrease"];
    } else if (combinedEffects.duration_decrease) {
      durationDecreasePercentage = combinedEffects.duration_decrease;
    }
    log.debug(colors.cyan(`Combined effects for work: ${JSON.stringify(combinedEffects)}`));

    const costConfig = {
      mood: baseParameters.mood_cost_per_minute || 0,
      hungry: baseParameters.hungry_cost_per_minute || 0,
      energy: baseParameters.energy_cost_per_minute || 0,
    };
    const profitConfig = { coins: 0 };
    const now = moment();
    const diffSeconds = now.diff(moment(process.user_parameters_updated_at || process.updatedAt), "seconds");
    const processDurationSeconds = now.diff(moment(process.createdAt), "seconds");
    const totalDurationSeconds = baseParameters.duration * 60;
    const actualDurationSeconds = calculateDuration(baseParameters.duration, durationDecreasePercentage);

    const periodCosts = calculatePeriodCosts(baseParameters, combinedEffects, diffSeconds, costConfig, [], userParameters, totalDurationSeconds, "work");
    const periodProfits = calculatePeriodProfits(baseParameters, combinedEffects, diffSeconds, profitConfig, [], userParameters, totalDurationSeconds);

    const hasSufficientResources = Object.keys(periodCosts).every(key => {
      const available = Math.floor(userParameters[key] || 0);
      const cost = Math.floor(periodCosts[key] || 0);
      const ok = available >= cost;
      if (!ok) log.warn(colors.yellow(`Insufficient ${key}: ${available} < ${cost}`));
      return ok;
    });

    if (!hasSufficientResources) {
      await gameProcess.deleteOne({ _id: processId }, { session });
      log.info(colors.yellow(`Work process ended - insufficient resources`), {
        userId: userParametersId,
        processId,
        costs: periodCosts,
        available: { mood: userParameters.mood, hungry: userParameters.hungry, energy: userParameters.energy },
      });
      return;
    }

    Object.keys(periodCosts).forEach((key) => {
      userParameters[key] = Math.max(0, userParameters[key] - periodCosts[key]);
    });
    Object.keys(periodProfits).forEach((key) => {
      if (userParameters[key] !== undefined) userParameters[key] += periodProfits[key];
    });
    await userParameters.save({ session });

    if (processDurationSeconds >= actualDurationSeconds) {
      const nekoBoostMultiplier = await getNekoBoostMultiplier(userParametersId, session);
      const baseCoinsReward = (baseParameters.coins_in_hour / 3600) * (baseParameters.duration * 60);
      const coinsReward = baseCoinsReward * nekoBoostMultiplier;
      await operationMap.updateUserBalance({ id: userParametersId, amount: coinsReward }, session);
      await operationMap.updateUserExperience({ id: userParametersId, amount: baseParameters.experience_reward }, session);

      await gameProcess.deleteOne({ _id: processId }, { session });
      log.info(colors.green(`Work process completed and deleted`), {
        userId: userParametersId,
        coinsReward,
        experience: baseParameters.experience_reward,
      });
    } else {
      process.user_parameters_updated_at = now.toDate();
      await process.save({ session });
      log.debug(`Updated work process timestamp`, { processId });
    }
  },

  processTraining: async (params, session) => {
    const { processId, userParametersId, baseParametersId } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const baseParameters = await TrainingParameters.findOne({ level: baseParametersId }, null, { session });
    const user = await User.findOne({ id: userParametersId }, null, { session });
    const userClothing = await UserClothing.findOne({ user_id: userParametersId }, null, { session });

    if (!process || !userParameters || !baseParameters || !user) {
      return
    }

    let durationDecreasePercentage = 0;
    let combinedEffects = {};
    if (process.effects && process.type !== "boost") mergeEffects(combinedEffects, process.effects);
    const shelfItems = Object.values(user.shelf).filter(Boolean);
    if (shelfItems.length > 0) {
      const shelf = await ShelfItemModel.find({ id: { $in: shelfItems } }, null, { session });
      shelf.forEach((item) => {
        if (item.effects) mergeEffects(combinedEffects, item.effects);
      });
    }
    if (userClothing) {
      const clothesItems = [userClothing.hat, userClothing.top, userClothing.pants, userClothing.shoes, userClothing.accessories]
        .filter(item => item !== null && item !== undefined);
      if (clothesItems.length > 0) {
        const clothing = await Clothing.find({ clothing_id: { $in: clothesItems } }, null, { session });
        clothing.forEach((item) => {
          if (item.effects) mergeEffects(combinedEffects, item.effects);
        });
      }
    }
    if (userParameters.constant_effects_levels["training_duration_decrease"]) {
      durationDecreasePercentage = userParameters.constant_effects_levels["training_duration_decrease"];
    } else if (combinedEffects.duration_decrease) {
      durationDecreasePercentage = combinedEffects.duration_decrease;
    }

    const costConfig = {
      energy: baseParameters.energy_spend || 0,
      hungry: baseParameters.hungry_spend || 0,
    };
    const profitConfig = { mood: baseParameters.mood_profit || 0 };
    const now = moment();
    const diffSeconds = now.diff(moment(process.user_parameters_updated_at || process.updatedAt), "seconds");
    const processDurationSeconds = now.diff(moment(process.createdAt), "seconds");
    const totalDurationSeconds = (baseParameters.duration || 1) * 60;
    const actualDurationSeconds = calculateDuration(baseParameters.duration || 1, durationDecreasePercentage);

    const periodCosts = calculatePeriodCosts(baseParameters, combinedEffects, diffSeconds, costConfig, [], userParameters, totalDurationSeconds, "training");
    const periodProfits = calculatePeriodProfits(baseParameters, combinedEffects, diffSeconds, profitConfig, [], userParameters, totalDurationSeconds);

    const hasSufficientResources = Object.keys(periodCosts).every(key => {
      const available = Math.floor(userParameters[key] || 0);
      const cost = Math.floor(periodCosts[key] || 0);
      const ok = available >= cost;
      if (!ok) log.warn(colors.yellow(`Insufficient ${key}: ${available} < ${cost}`));
      return ok;
    });

    if (!hasSufficientResources) {
      await gameProcess.deleteOne({ _id: processId }, { session });
      log.info(colors.yellow(`Training process ended - insufficient resources`), {
        userId: userParametersId,
        costs: periodCosts,
        available: { energy: userParameters.energy, hungry: userParameters.hungry },
      });
      return;
    }

    Object.keys(periodCosts).forEach((key) => {
      userParameters[key] = Math.max(0, userParameters[key] - periodCosts[key]);
    });
    Object.keys(periodProfits).forEach((key) => {
      if (key === "mood") {
        userParameters[key] = Math.min(100, userParameters[key] + periodProfits[key]);
      } else if (userParameters[key] !== undefined) {
        userParameters[key] += periodProfits[key];
      }
    });
    await userParameters.save({ session });

    const finishCondition = userParameters.energy <= 0 || userParameters.hungry <= 0;
    if (processDurationSeconds >= actualDurationSeconds || finishCondition) {
      await gameProcess.deleteOne({ _id: processId }, { session });
      log.info(colors.green(`Training process completed and deleted`), { userId: userParametersId });
    } else {
      process.user_parameters_updated_at = now.toDate();
      await process.save({ session });
    }
  },

  processSleep: async (params, session) => {
    const { processId, userParametersId, baseParametersId } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const baseParameters = await LevelsParameters.findOne({ level: baseParametersId }, null, { session });
    const user = await User.findOne({ id: userParametersId }, null, { session });
    const userClothing = await UserClothing.findOne({ user_id: userParametersId }, null, { session });

    if (!process || !userParameters || !baseParameters || !user) {
     return
    }

    let durationDecreasePercentage = 0;
    let combinedEffects = {};
    if (process.effects && process.type !== "boost") mergeEffects(combinedEffects, process.effects);
    const shelfItems = Object.values(user.shelf).filter(Boolean);
    if (shelfItems.length > 0) {
      const shelf = await ShelfItemModel.find({ id: { $in: shelfItems } }, null, { session });
      shelf.forEach((item) => {
        if (item.effects) mergeEffects(combinedEffects, item.effects);
      });
    }
    if (userClothing) {
      const clothesItems = [userClothing.hat, userClothing.top, userClothing.pants, userClothing.shoes, userClothing.accessories]
        .filter(item => item !== null && item !== undefined);
      if (clothesItems.length > 0) {
        const clothing = await Clothing.find({ clothing_id: { $in: clothesItems } }, null, { session });
        clothing.forEach((item) => {
          if (item.effects) mergeEffects(combinedEffects, item.effects);
        });
      }
    }
    if (userParameters.constant_effects_levels["sleeping_duration_decrease"]) {
      durationDecreasePercentage = userParameters.constant_effects_levels["sleeping_duration_decrease"];
    } else if (combinedEffects.duration_decrease) {
      durationDecreasePercentage = combinedEffects.duration_decrease;
    }

    const profitConfig = { energy: baseParameters.energy_capacity || 0 };
    const now = moment();
    const diffSeconds = now.diff(moment(process.user_parameters_updated_at || process.updatedAt), "seconds");
    const processDurationSeconds = now.diff(moment(process.createdAt), "seconds");
    const totalDurationSeconds = baseParameters.sleep_duration * 60;
    const actualDurationSeconds = calculateDuration(baseParameters.sleep_duration, durationDecreasePercentage);

    const periodProfits = calculatePeriodProfits(baseParameters, combinedEffects, diffSeconds, profitConfig, [], userParameters, totalDurationSeconds);

    userParameters.energy = Math.min(userParameters.energy_capacity, userParameters.energy + periodProfits.energy);
    await userParameters.save({ session });

    if (processDurationSeconds >= actualDurationSeconds) {
      await gameProcess.deleteOne({ _id: processId }, { session });
      log.info(colors.green(`Sleep process completed and deleted`), { userId: userParametersId });
    } else {
      process.user_parameters_updated_at = now.toDate();
      await process.save({ session });
    }
  },

  processSkill: async (params, session) => {
    const { processId, userParametersId, baseParametersId, subType } = params; // Use baseParametersId instead of skillId
    console.log("Base Parameters ID (skillId):", baseParametersId, "SubType:", subType); // Debug log

    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const skill = subType === "constant_effects"
      ? await ConstantEffects.findOne({ id: baseParametersId }, null, { session })
      : await Skill.findOne({ skill_id: baseParametersId }, null, { session });

    if (!process || !userParameters || !skill) {
     return
    }

    const now = moment();
    const processDurationSeconds = now.diff(moment(process.createdAt), "seconds");
    const totalDurationSeconds = process.target_duration_in_seconds || process.base_duration_in_seconds || 60; // Default to 1 minute if missing
    const actualDurationSeconds = calculateDuration(totalDurationSeconds / 60, 0); // No decrease for simplicity

    if (processDurationSeconds >= actualDurationSeconds) {
      if (subType === "constant_effects") {
        userParameters.constant_effects_levels[skill.type] = skill.level;
        await userParameters.save({ session });
        await operationMap.updateUserExperience({ id: userParametersId, amount: skill.experience_reward }, session); // Use atomic version
      } else {
        await UserSkill.create([{
          id: userParameters.id, // Match schema field 'id'
          skill_id: skill.skill_id, // Match schema field 'skill_id'
        }], { session });
        await operationMap.updateUserExperience({ id: userParametersId, amount: skill.experience_reward }, session); // Use atomic version
      }
      await gameProcess.deleteOne({ _id: processId }, { session });
      log.info(colors.green(`Skill process completed and deleted`), { userId: userParametersId, skillId: baseParametersId });
    } else {
      process.user_parameters_updated_at = now.toDate();
      await process.save({ session });
      log.debug(`Skill process timestamp updated`, { processId });
    }
  },

  processFood: async (params, session) => {
    const { processId, userParametersId, baseParametersId } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const baseParameters = await Food.findOne({ food_id: baseParametersId }, null, { session });

    if (!process || !userParameters || !baseParameters) {
      return
    }

    // Add food-specific logic here if needed (e.g., hungry profit)
    const now = moment();
    const processDurationSeconds = now.diff(moment(process.createdAt), "seconds");
    const totalDurationSeconds = baseParameters.duration * 60 || 60; // Default duration
    const actualDurationSeconds = calculateDuration(totalDurationSeconds / 60, 0);

    if (processDurationSeconds >= actualDurationSeconds) {
      // Placeholder completion logic (e.g., increase hungry)
      userParameters.hungry = Math.min(100, userParameters.hungry + (baseParameters.hungry_profit || 0));
      await userParameters.save({ session });
      await gameProcess.deleteOne({ _id: processId }, { session });
      log.info(colors.green(`Food process completed and deleted`), { userId: userParametersId });
    } else {
      process.user_parameters_updated_at = now.toDate();
      await process.save({ session });
    }
  },

  processBoost: async (params, session) => {
    const { processId, userParametersId, baseParametersId } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const baseParameters = await Boost.findOne({ boost_id: baseParametersId }, null, { session });

    if (!process || !userParameters || !baseParameters) {
     return
    }
    log.warn(`${colors.cyanBright('Applied energy restore from tonic-drink')}`, {
      user_id: userParametersId,
      baseParameters,
    });
    const now = moment();
    const diffSeconds = now.diff(moment(process.user_parameters_updated_at || process.updatedAt), "seconds");
    const processDurationSeconds = now.diff(moment(process.createdAt), "seconds");
    const totalDurationSeconds = baseParameters.duration * 60 || 60; // Default duration
    const actualDurationSeconds = calculateDuration(totalDurationSeconds / 60, 0);

    if (baseParameters.type === "tonic-drink") {
      const energyRestore = (userParameters.energy_capacity / (3 * 3600)) * diffSeconds;
      userParameters.energy = Math.min(
        userParameters.energy_capacity,
        userParameters.energy + energyRestore
      );
      await userParameters.save({ session });
      log.info(`${colors.cyanBright('Applied energy restore from tonic-drink')}`, {
        user_id: userParametersId,
        energyRestore,
      });
    }

    if (processDurationSeconds >= actualDurationSeconds) {
      await gameProcess.deleteOne({ _id: processId }, { session });
      log.info(colors.green(`Boost process completed and deleted`), { userId: userParametersId });
    } else {
      process.user_parameters_updated_at = now.toDate();
      await process.save({ session });
    }
  },

  processAutoclaim: async (params, session) => {
    const { investmentType, userId } = params;
    console.log(investmentType, userId)
    const currentInvestment = await UserLaunchedInvestments.findOne({
      user_id: userId,
      investment_type: investmentType,
      claimed: false,
    }, null, { session, sort: { createdAt: -1 } });

    if (!currentInvestment) {
      log.info(`No active unclaimed investment found for user ${userId}`, { investmentType });
      return;
    }

    const investmentDef = await Investments.findOne({ id: currentInvestment.investment_id }, null, { session });
    if (!investmentDef) {
      throw new Error(`Investment definition not found for ID ${currentInvestment.investment_id}`);
    }

    if (moment().diff(moment(currentInvestment.createdAt), 'seconds') >= 3600) {
      const userParameters = await UserParameters.findOne({ id: userId }, null, { session });
      if (!userParameters) {
        throw new Error(`UserParameters ${userId} not found`);
      }

      const reward = investmentDef.coins_per_hour;
      await operationMap.updateUserBalance({ id: userId, amount: reward }, session);

      currentInvestment.claimed = true;
      await currentInvestment.save({ session });

      const user = await User.findOne({ id: userId }, { investment_levels: 1 }, { session });
      const userInvestmentLevel = user.investment_levels[investmentType];
      const newInvestmentDef = await Investments.findOne({ type: investmentType, level: userInvestmentLevel }, null, { session });
      if (!newInvestmentDef) {
        throw new Error(`Investment definition not found for type ${investmentType}, level ${userInvestmentLevel}`);
      }

      const newInvestment = new UserLaunchedInvestments({
        user_id: userId,
        investment_id: newInvestmentDef.id,
        investment_type: investmentType,
        to_claim: newInvestmentDef.coins_per_hour,
      });
      await newInvestment.save({ session });

      log.info(colors.green(`Autoclaim processed: claimed, marked, new investment created`), {
        userId,
        investmentType,
        reward,
      });
    } else {
      log.info(colors.green(`Skipping autoclaim: investment not yet ready`), {
        userId,
        investmentType,
      });
    }
  },

  // Keep createUserLaunchedInvestment for initial activation
  createUserLaunchedInvestment: async (params, session) => {
    const { userId, investmentType } = params;
    const user = await User.findOne({ id: userId }, { investment_levels: 1 }, { session });
    const userInvestmentLevel = user.investment_levels[investmentType];
    const investment = await Investments.findOne({ type: investmentType, level: userInvestmentLevel }, null, { session });

    if (!investment) {
      throw new Error(`Investment definition not found for ${investmentType}, level ${userInvestmentLevel}`);
    }

    const newInvestment = new UserLaunchedInvestments({
      user_id: userId,
      investment_id: investment.id,
      investment_type: investmentType,
      to_claim: investment.coins_per_hour,
    });
    await newInvestment.save({ session });
    log.info(`New investment launched for user ${userId}`, { investmentType });
  },
  // Add atomic balance update
  updateUserBalance: async (params, session) => {
    const { id, amount } = params;
    const user = await UserParameters.findOne({ id }, null, { session });
    if (!user) throw new Error(`UserParameters not found for ID: ${id}`);
    user.coins += amount;
    user.total_earned += amount;
    await user.save({ session });
    console.log(`[updateUserBalance] ${id} +${amount} COINS`);
    return { coins: user.coins, total_earned: user.total_earned };
  },

  // Add atomic experience update
  updateUserExperience: async (params, session) => {
    const { id, amount } = params;
    const user = await UserParameters.findOne({ id }, null, { session });
    const levels = await LevelsParameters.find({}, null, { session }); // Note: Typo fixed from LevelsParamters
    if (!user) throw new Error(`UserParameters not found for ID: ${id}`);
    user.experience += amount;
    console.log(`[updateUserExperience] ${id} +${amount} EXP`);
    if (user.level !== 20) {
      const nextLevel = levels.find((level) => level?.level === user?.level + 1);
      const levelUpCondition = user.experience >= nextLevel?.experience_required;
      if (levelUpCondition) {
        user.level += 1;
        user.energy_capacity = nextLevel.energy_capacity;
        console.log(`[updateUserExperience] ${id} level up ${user.level - 1}->${user.level}`);
      }
    }
    await user.save({ session });
    return { experience: user.experience, level: user.level };
  },
};

export const queueDbUpdate = async (operationType, params, description, userId = null) => {
  if (!operationMap[operationType]) {
    throw new Error(`Unknown operation type: ${operationType} for ${description}`);
  }
  const jobData = { operationType, params, description, userId };
  log.debug(`Enqueuing job for ${description}`, { jobData });
  const job = await dbUpdateQueue.add(jobData);
  return job.id;
};

dbUpdateQueue.process(10, async (job) => {
  const { operationType, params, description, userId } = job.data || {};
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (!operationType) {
      throw new Error(`Missing operationType in job data for ${description}`);
    }
    const operation = operationMap[operationType];
    if (!operation) {
      throw new Error(`No implementation for operationType ${operationType} in ${description}`);
    }
    await operation(params, session);
    await session.commitTransaction();
    log.info(colors.green(`DB update completed: ${JSON.stringify(job.data)}`));
  } catch (error) {
    await session.abortTransaction();
    log.error(colors.red(`DB update failed: ${description}`), { error: error.message, stack: error.stack });
    throw error; // Bull will handle retries based on attempts
  } finally {
    session.endSession();
  }
});

dbUpdateQueue.on('completed', (job) => {
  log.info(colors.green(`DB update job completed`), { jobId: job.id, description: job.data.description });
});

dbUpdateQueue.on('failed', (job, err) => {
  log.error(colors.red(`DB update job failed after retries`), { jobId: job.id, description: job.data.description, error: err.message });
});

const TONCENTER_API_KEY = process.env.TONCENTER_API_KEY;
const TONCENTER_API_URL = "https://toncenter.com/api/v2";

const limiter = new Bottleneck({
  minTime: 1000, // 1 request per second
  maxConcurrent: 1,
});

const TONAPI_KEY = process.env.TONAPI_KEY || "";

// TON WALLET INIT
const mnemonic = process.env.MNEMONICS.split(" ");
const testnet = process.env.TESTNET === "true";
const wallet = await openWallet(mnemonic, testnet);
const walletContract = wallet.contract;
const RECEIVING_WALLET_ADDRESS = walletContract.address.toString();

function normalizeAddress(rawAddress) {
  try {
    const address = Address.parseRaw(rawAddress);
    return address.toString({ bounceable: true, urlSafe: true });
  } catch (error) {
    console.error(`Error normalizing address ${rawAddress}:`, error.message);
    return rawAddress;
  }
}

const recalcValuesProcessTypeWhitelist = ["work", "training", "sleep"];

// Update getNekoBoostMultiplier to accept session
export const getNekoBoostMultiplier = async (userId, session) => {
  const boost = await ActiveEffectsModel.findOne({
    user_id: userId,
    type: { $in: [ActiveEffectTypes.BasicNekoBoost, ActiveEffectTypes.NftNekoBoost] },
    valid_until: { $gt: new Date() },
  }, null, { session });
  return boost ? 1 + getBoostPercentageFromType(boost.type) / 100 : 1;
};

const mergeEffects = (target, source) => {
  for (const [key, value] of Object.entries(source)) {
    if (Array.isArray(value)) {
      target[key] = target[key] || [];
      target[key] = [...target[key], ...value];
    } else {
      target[key] = value;
    }
  }
};

const calculatePeriodCosts = (baseParameters, combinedEffects, durationSeconds, costConfig, costBlackList, userParameters, totalDurationSeconds, processType) => {
  const finalCosts = {};
  // Map of stat capacities for percentage-based threshold calculations
  const statCapacities = {
    mood: 100, // Mood is a percentage
    hungry: 100, // Hungry is a percentage
    energy: userParameters.energy_capacity || 100, // Energy capacity for threshold
  };

  Object.entries(costConfig).forEach(([key, baseValue]) => {
    if (costBlackList.includes(key)) return;
    log.debug(colors.cyan(`Starting cost calc for ${key}: baseValue=${baseValue}`));
    let adjustedValue = Number(baseValue) || 0;

    // Apply cost decrease effect
    const decreaseKey = `${key}_cost_decrease`;
    const decreaseValue = combinedEffects[decreaseKey];
    if (decreaseValue) {
      adjustedValue *= (1 - decreaseValue / 100);
      log.debug(colors.yellow(`Applied ${decreaseKey}: ${decreaseValue}% -> ${adjustedValue.toFixed(4)}`));
    }

    let cost;
    if (processType === "work") {
      const minutesElapsed = durationSeconds / 60;
      cost = adjustedValue * minutesElapsed;
      log.debug(colors.magenta(`Work cost for ${key}: ${adjustedValue.toFixed(4)} * ${minutesElapsed.toFixed(4)}min = ${cost.toFixed(4)}`));
    } else {
      const ratePerSecond = adjustedValue / totalDurationSeconds;
      cost = ratePerSecond * durationSeconds;
      log.debug(colors.magenta(`Cost for ${key}: ${ratePerSecond.toFixed(4)}/s * ${durationSeconds}s = ${cost.toFixed(4)}`));
    }

    // Apply cant_fall_below_percent effect
    const cantFallBelowEffects = combinedEffects.cant_fall_below_percent?.filter(effect => effect.param === key) || [];
    if (cantFallBelowEffects.length > 0) {
      const maxThresholdPercent = Math.max(...cantFallBelowEffects.map(effect => effect.value || 0));
      const minStatValue = (maxThresholdPercent / 100) * statCapacities[key]; // Minimum value for the stat
      const currentStatValue = Number(userParameters[key]) || 0;
      const maxAllowableCost = Math.max(0, currentStatValue - minStatValue);

      if (cost > maxAllowableCost) {
        log.info(colors.blue(`Capped ${key} cost due to cant_fall_below_percent: ${cost.toFixed(4)} -> ${maxAllowableCost.toFixed(4)}, minStat=${minStatValue.toFixed(2)}`));
        cost = maxAllowableCost;
      }
    }

    finalCosts[key] = Number(cost.toFixed(10));
    log.info(colors.blue(`Final cost for ${key}: ${finalCosts[key]}`));
  });
  return finalCosts;
};

const calculatePeriodProfits = (baseParameters, combinedEffects, diffSeconds, profitConfig, effectEntries, userParameters, totalDurationSeconds) => {
  const profits = {};
  if (!profitConfig) return profits;

  if (!totalDurationSeconds || isNaN(totalDurationSeconds)) {
    log.error(colors.red(`Invalid totalDurationSeconds: ${totalDurationSeconds}, defaulting to 1s`));
    totalDurationSeconds = 1;
  }

  Object.entries(profitConfig).forEach(([key, baseValue]) => {
    log.debug(colors.cyan(`Starting profit calc for ${key}: baseValue=${baseValue}`));
    let adjustedValue = Number(baseValue) || 0;

    if (combinedEffects[`${key}_increase`]) {
      const increasePercent = combinedEffects[`${key}_increase`];
      adjustedValue *= (1 + increasePercent / 100);
      log.debug(colors.yellow(`Applied ${key}_increase: ${increasePercent}% -> ${adjustedValue.toFixed(4)}`));
    }

    const ratePerSecond = adjustedValue / totalDurationSeconds;
    const profit = ratePerSecond * diffSeconds;
    profits[key] = isNaN(profit) ? 0 : Number(profit.toFixed(2));
    log.debug(colors.magenta(`Profit for ${key}: ${ratePerSecond.toFixed(4)}/s * ${diffSeconds}s = ${profits[key]}`));
  });

  combinedEffects.profit_hourly_percent?.forEach(effect => {
    const key = effect.param;
    const hourlyIncreasePercent = effect.value || 0;
    log.debug(colors.cyan(`Applying profit_hourly_percent for ${key}: ${hourlyIncreasePercent}%`));

    if (key === "energy" || key === "hungry" || key === "mood") {
      const currentValue = Number(userParameters[key]) || 0;
      const capacity = key === "energy" ? (Number(userParameters.energy_capacity) || 100) : 100;
      const baseRatio = currentValue / capacity;
      const hourlyProfit = baseRatio * (hourlyIncreasePercent / 100) * capacity;
      const profitOverDuration = (hourlyProfit / 3600) * totalDurationSeconds;
      const ratePerSecond = profitOverDuration / totalDurationSeconds;
      const profitForTick = ratePerSecond * diffSeconds;
      const uncappedProfit = (profits[key] || 0) + profitForTick;
      const newTotal = currentValue + uncappedProfit;
      const cappedProfit = Math.min(uncappedProfit, Math.max(0, capacity - currentValue));
      profits[key] = isNaN(cappedProfit) ? 0 : Number(cappedProfit.toFixed(5));
      log.debug(colors.yellow(`Capped ${key} profit: current=${currentValue}, uncapped=${newTotal.toFixed(5)}, capacity=${capacity}, capped=${profits[key]}`));
    }
    log.info(colors.blue(`Final profit for ${key}: ${profits[key]}`));
  });

  return profits;
};

const customDurationProcessTypes = ["autoclaim", "investment_level_checks", "nft_scan"];

const genericProcessScheduler = (processType, processConfig) => {
  const { cronSchedule, Model, getTypeSpecificParams } = processConfig;
  const operationName = `process${processType.charAt(0).toUpperCase() + processType.slice(1)}`;

  const scheduler = cron.schedule(processConfig.cronSchedule, async () => {

    try {
      log.info(`${processType} process scheduler started iteration`);

      const processes = await gameProcess.find({ type: processType }).lean(); // Add .lean()
      await Promise.all(processes.map(async (process) => {
        const params = {
          processId: process._id,
          userParametersId: process.id,
          baseParametersId: process.type_id,
          subType: process.sub_type,
        };
        await queueDbUpdate(
          operationName,
          params,
          `${processType} full cycle for process ${process._id}`,
          process.id
        );
      }));

      log.info(`${processType} process scheduler finished iteration`, { processesCount: processes.length });
    } catch (e) {
      log.error(`Error in ${processType} scheduler:`, { error: e.message, stack: e.stack });
    } finally {
      // Always release the lock
      await releaseLock(lockKey);
    }
  }, { scheduled: false });

  scheduler.name = processType;
  return scheduler;
};

const processIndependentScheduler = (processType, processConfig) => {
  const { cronSchedule, durationFunction } = processConfig;
  const lockKey = `lock:${processType}`;

  const scheduler = cron.schedule(cronSchedule, async () => {
    try {
      await durationFunction();
      log.info(`${processType} process scheduler finished iteration`);
    } catch (e) {
      log.error(`Error in ${processType} Process:`, { error: e.message, stack: e.stack });
    } finally {
    }
  }, { scheduled: false });

  scheduler.name = processType;
  return scheduler;
};

const workProcessConfig = {
  processType: "work",
  cronSchedule: "*/10 * * * * *",
  Model: Work,
  getTypeSpecificParams: (process) => ({ work_id: process.type_id }),
};

const trainingProcessConfig = {
  processType: "training",
  cronSchedule: "*/10 * * * * *",
  Model: TrainingParameters,
  getTypeSpecificParams: (process) => ({ level: process.type_id }),
};

const sleepProcessConfig = {
  processType: "sleep",
  cronSchedule: "*/10 * * * * *",
  Model: LevelsParameters,
  getTypeSpecificParams: (process) => ({ level: process.type_id }),
};

const skillProcessConfig = {
  processType: "skill",
  cronSchedule: "*/10 * * * * *",
  getTypeSpecificParams: (process) => ({ id: process.type_id }),
};

const foodProcessConfig = {
  processType: "food",
  cronSchedule: "*/10 * * * * *",
  Model: Food,
  getTypeSpecificParams: (process) => ({ food_id: process.type_id }),
};

const boostProcessConfig = {
  processType: "boost",
  cronSchedule: "*/10 * * * * *",
  Model: Boost,
  getTypeSpecificParams: (process) => ({ boost_id: process.type_id }),
};

// Add these to the operationMap
operationMap.applyInvestmentClaim = async (params, session) => {
  const { userParametersId, coinsReward, experienceReward } = params;
  const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
  if (!userParameters) {
    throw new Error(`UserParameters ${userParametersId} not found`);
  }

  await recalcValuesByParameters(userParameters, { coinsReward }, session);
  await operationMap.updateUserExperience({ id: userParametersId, amount: experienceReward }, session);
  await userParameters.save({ session });
  log.debug(`Applied investment claim rewards`, { userId: userParametersId, coinsReward, experienceReward });
};

operationMap.markInvestmentClaimed = async (params, session) => {
  const { investmentId } = params;
  const investment = await UserLaunchedInvestments.findOne({ _id: investmentId }, null, { session });
  if (!investment) {
    throw new Error(`Investment ${investmentId} not found`);
  }

  investment.claimed = true;
  await investment.save({ session });
  log.debug(`Marked investment as claimed`, { investmentId });
};

operationMap.createNewInvestment = async (params, session) => {
  const { userId, investmentId, toClaim, investmentType } = params;
  const newInvestment = new UserLaunchedInvestments({
    user_id: userId,
    investment_id: investmentId,
    to_claim: toClaim,
    investment_type: investmentType,
  });
  await newInvestment.save({ session });
  log.debug(`Created new investment entry`, { userId, investmentType, toClaim });
};

const processInBatches = async (items, batchSize, processFn) => {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(processFn));
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

export const autoclaimProcessConfig = {
  processType: "autoclaim",
  cronSchedule: "*/1 * * * * *",
  durationFunction: async () => {
    if (schedulerFlags.autoclaim === true) return;
    let cursor
    try {
      schedulerFlags.autoclaim = true;
      log.info(`Autoclaim process scheduler started iteration`);

      const now = new Date();
      // Use a cursor to stream Autoclaims
      cursor = Autoclaims.find({ expiresAt: { $gt: now } }).lean().cursor();

      let usersEligible = 0;
      await processInBatches(cursor, 5, async (autoclaim) => {
        const userId = autoclaim.userId;
        const investmentType = autoclaim.investmentType;
        console.log('Queuing transaction for autoclaim');
        await queueDbUpdate(
          "processAutoclaim",
          { investmentType, userId },
          `Autoclaim claim for ${investmentType}, user ${userId}`,
          userId
        );
        usersEligible++;
      });

      if (usersEligible === 0) {
        log.info("No active autoclaims found");
        return;
      }

      log.info(`Autoclaim process scheduler finished iteration`, {
        usersEligible,
      });
    } catch (e) {
      log.error("Error in autoclaim process", { error: e.message, stack: e.stack });
    } finally {
      schedulerFlags.autoclaim = false;
      if(cursor) {
        await cursor.close();
      }
    }
  },
  Model: Autoclaims,
  getTypeSpecificParams: () => ({}),
  start() {
    this.task = cron.schedule(this.cronSchedule, this.durationFunction, { scheduled: false });
    this.task.start();
    log.info(`Started ${this.processType} process`);
  },
  stop() {
    if (this.task) {
      this.task.stop();
      log.info(`Stopped ${this.processType} process`);
    }
  },
};

const investmentLevelsProcessConfig = {
  processType: "investment_level_checks",
  cronSchedule: "*/15 * * * * *",
  durationFunction: async () => {
    try {
      if (schedulerFlags.investment_level_checks === true) return;
      schedulerFlags.investment_level_checks = true;
      log.info(`investment_level_checks process scheduler started iteration`);
      const usersWithRefs = await Referal.aggregate([
        { $group: { _id: "$refer_id", referral_count: { $sum: 1 } } },
        { $project: { refer_id: "$_id", referral_count: 1 } },
      ]);

      await processInBatches(usersWithRefs, 5, async (user) => {
        const userDoc = await User.findOne({ id: user.refer_id });
        if (userDoc) {
          const currentLevel = userDoc.investment_levels.game_center;
          const calculatedLevel = calculateGamecenterLevel(user.referral_count);
          if (calculatedLevel > currentLevel) {
            userDoc.investment_levels.game_center = calculatedLevel;
            await userDoc.save();
            log.info(`Updated game_center level`, { userId: user.refer_id, newLevel: calculatedLevel });
          }
        }
      });

      log.info("investment_level_checks iterated all users");
    } catch (e) {
      log.error("Error in investment_level_checks process", { error: e.message, stack: e.stack });
    } finally {
      schedulerFlags.investment_level_checks = false;
    }
  },
  Model: User,
  getTypeSpecificParams: () => ({}),
};

const getWhitelistedNftsFromWallet = async (walletAddress) => {
  const limit = 1000;
  let offset = 0;
  let allNfts = [];
  let hasMore = true;

  try {
    while (hasMore) {
      const nftResponse = await limiter.schedule(() =>
        axios.get(`https://tonapi.io/v2/accounts/${walletAddress}/nfts`, {
          headers: { Authorization: `Bearer ${TONAPI_KEY}` },
          params: { limit, offset },
        })
      );
      const nftItems = nftResponse.data?.nft_items || [];
      allNfts = allNfts.concat(nftItems.map(nft => normalizeAddress(nft.address)));
      offset += limit;
      hasMore = nftItems.length === limit;
      await new Promise((resolve) => setTimeout(resolve, 250))
    }

    return [...new Set(allNfts.filter(address => nftMap[address] !== undefined).map(address => nftMap[address]))];
  } catch (error) {
    log.error(`Error fetching NFTs for ${walletAddress}`, { error: error.message });
    return [];
  }
};

const syncShelfInventory = async (userId, nftItemIds) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const inventory = await UserCurrentInventory.findOne({ user_id: userId }, null, { session }) ||
      await UserCurrentInventory.create([{ user_id: userId, shelf: [] }], { session });
    const user = await User.findOne({ id: userId }, null, { session });

    // Current shelf items
    const currentShelf = inventory.shelf || [];
    const currentShelfIds = currentShelf.map(item => item.id);

    // NFTs the user currently owns (filtered for managed range 9-38)
    const nftShelfIds = nftItemIds.filter(id => id >= 9 && id <= 38);
    const currentManagedIds = currentShelfIds.filter(id => id >= 9 && id <= 38);

    // Items to add: owned NFTs not in current shelf
    const itemsToAdd = nftShelfIds
      .filter(id => !currentShelfIds.includes(id))
      .map(id => ({ id }));

    // Items to remove: shelf items in managed range that aren't in owned NFTs
    const itemsToRemove = currentManagedIds
      .filter(id => !nftShelfIds.includes(id));

    // If user's selected neko is being removed, clear it
    if (user?.shelf?.neko && itemsToRemove.includes(user.shelf.neko)) {
      await User.updateOne(
        { id: userId },
        { $set: { "shelf.neko": null } },
        { session }
      );
    }

    // Apply updates
    if (itemsToAdd.length) {
      await UserCurrentInventory.updateOne(
        { user_id: userId },
        { $addToSet: { shelf: { $each: itemsToAdd } } },
        { session }
      );
    }

    if (itemsToRemove.length) {
      await UserCurrentInventory.updateOne(
        { user_id: userId },
        { $pull: { shelf: { id: { $in: itemsToRemove } } } },
        { session }
      );
    }

    await session.commitTransaction();
    return { added: itemsToAdd, removed: itemsToRemove };
  } catch (error) {
    await session.abortTransaction();
    log.error(`Error syncing inventory for ${userId}`, { error: error.message });
    return { added: [], removed: [] };
  }
};

const nftScanConfig = {
  processType: "nft_scan",
  cronSchedule: "*/10 * * * * *",
  durationFunction: async () => {
    try {
      if (schedulerFlags.nft_scan === true) return;
      schedulerFlags.nft_scan = true;
      log.info("NFT-scanner process scheduler started iteration");

      // Use a cursor to stream Users
      const cursor = User.find({ tonWalletAddress: { $ne: null } }).lean().cursor();
      let totalUsers = 0;

      for await (const user of cursor) {
        const nftItemIds = user.tonWalletAddress ? await getWhitelistedNftsFromWallet(user.tonWalletAddress) : [];
        await syncShelfInventory(user.id, nftItemIds);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        totalUsers++;
      }

      log.info("NFT-scanner process scheduler finished iteration", { totalUsers });
    } catch (e) {
      log.error("Error in NFT scan process", { error: e.message, stack: e.stack });
    } finally {
      schedulerFlags.nft_scan = false;
    }
  },
  Model: User,
  getTypeSpecificParams: () => ({}),
};

const spinScanConfig = {
  processType: "spin_scan",
  cronSchedule: "1 * * * * *",
  durationFunction: async () => {
    try {
      if (schedulerFlags.spin_scan === true) return;
      schedulerFlags.spin_scan = true;
      // Use a cursor to stream UserParameters
      const cursor = UserParameters.find({}, { id: 1 }).lean().cursor();
      let totalUsersAwarded = 0;

      await processInBatches(cursor, 5, async (user) => {
        const userObj = await User.findOne({ id: user.id }, { tz: 1 });
        const userTz = userObj?.tz || moment.tz.guess(); // Fallback to guessed timezone
        const midnightTodayInTz = moment.tz(userTz).startOf("day"); //Convert the date and time to user's timezone (05:20 PM +07 on Saturday, May 31, 2025)

        // Find all unused daily spins for this user
        const unusedSpins = await UserSpins.find({
          user_id: user.id,
          type: "daily",
          is_used: false,
        });

        // Mark spins created before midnight today as used
        for (const spin of unusedSpins) {
          const spinTimeInTz = moment.tz(spin.createdAt, userTz);
          if (spinTimeInTz.isBefore(midnightTodayInTz)) {
            spin.is_used = true;
            await spin.save();
            log.info("Marked daily spin as used", {
              userId: user.id,
              spinId: spin._id,
              timezone: userTz,
            });
          }
        }

        // Find the most recent daily spin for this user
        const latestSpin = await UserSpins.findOne(
          { user_id: user.id, type: "daily" },
          null,
          { sort: { createdAt: -1 } } // Ensure latest spin is fetched
        );

        let shouldAwardSpin = false;

        if (!latestSpin) {
          // No previous spin, award one
          shouldAwardSpin = true;
        } else {
          // Check if the last spin was before midnight today in the user's timezone
          const lastSpinTimeInTz = moment.tz(latestSpin.createdAt, userTz);
          shouldAwardSpin = lastSpinTimeInTz.isBefore(midnightTodayInTz);
        }

        if (shouldAwardSpin) {
          const newSpin = new UserSpins({
            user_id: user.id,
            type: "daily",
            is_used: grok
          });
          await newSpin.save();
          totalUsersAwarded += 1;
          log.info("Awarded daily spin", { userId: user.id, timezone: userTz });
        }
      });

      log.info("Spin checker process scheduler finished iteration", { totalUsersAwarded });
    } catch (err) {
      log.error("Error processing spin giveaways", { error: err.message, stack: err.stack });
    } finally {
      schedulerFlags.spin_scan = false;
    }
  }
};

const levelScanConfig = {
  processType: "level_scan",
  cronSchedule: "*/1 * * * * *",
  durationFunction: async () => {
    if (schedulerFlags.level_scan === true) return;

    try {
      schedulerFlags.level_scan = true;
      log.info("Level scan process started iteration");

      // Fetch level parameters once and sort in memory
      const levelParameters = await LevelsParameters.find({}).lean();
      const sortedLevels = levelParameters.sort((a, b) => a.level - b.level);

      // Use a cursor to stream UserParameters
      const cursor = UserParameters.find({}).lean().cursor();

      let processedUsers = 0;
      for await (const userParam of cursor) {
        // Find the highest level where user's experience meets or exceeds the requirement
        let newLevel = userParam.level;
        let newEnergyCapacity = userParam.energy_capacity;

        for (const level of sortedLevels) {
          if (userParam.experience >= level.experience_required) {
            newLevel = level.level;
            newEnergyCapacity = level.energy_capacity;
          } else {
            break; // Exit loop as soon as experience is less than required
          }
        }

        // Update user level if changed
        if (newLevel !== userParam.level) {
          log.info(`[levelScanConfig] Updating ${userParam.id} level ${userParam.level}->${newLevel}`);
          await UserParameters.updateOne(
            { id: userParam.id },
            { $set: { level: newLevel, energy_capacity: newEnergyCapacity } }
          ).exec();
        }

        processedUsers++;
        // Optional: Add a small delay every 100 users to prevent CPU spikes
        if (processedUsers % 100 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }

      log.info("Level scan process finished iteration", { processedUsers });
    } catch (err) {
      log.error("Error in level_scan process", { error: err.message, stack: err.stack });
    } finally {
      schedulerFlags.level_scan = false;
    }
  },
};

async function openWallet(mnemonic, testnet) {
  const keyPair = await mnemonicToPrivateKey(mnemonic);
  const toncenterBaseEndpoint = testnet ? "https://testnet.toncenter.com" : "https://toncenter.com";
  const client = new TonClient({
    endpoint: `${toncenterBaseEndpoint}/api/v2/jsonRPC`,
    apiKey: process.env.TONCENTER_API_KEY,
  });
  const wallet = WalletContractV4.create({ workchain: 0, publicKey: keyPair.publicKey });
  const contract = client.open(wallet);
  return { contract, keyPair, client };
}

async function transferNFT(wallet, nftAddress, newOwner) {
  const seqno = await wallet.contract.getSeqno();
  const transferBody = beginCell()
    .storeUint(0x5fcc3d14, 32)
    .storeUint(0, 64)
    .storeAddress(newOwner)
    .storeAddress(wallet.contract.address)
    .storeBit(0)
    .storeCoins(toNano("0.02"))
    .storeBit(0)
    .endCell();

  await wallet.contract.sendTransfer({
    seqno,
    secretKey: wallet.keyPair.secretKey,
    messages: [internal({ value: "0.05", to: nftAddress, body: transferBody })],
    sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
  });

  return seqno;
}

async function verifyAndTransferTransactions() {
  try {
    const pendingTransactions = await TONTransactions.find({
      status: { $in: ["awaiting_payment", "payment_received", "transferring"] },
    });

    const response = await axios.get(`${TONCENTER_API_URL}/getTransactions`, {
      params: {
        address: RECEIVING_WALLET_ADDRESS,
        limit: 100,
        sort: "desc",
        api_key: TONCENTER_API_KEY,
        archival: true
      },
    });

    for (const tx of pendingTransactions) {
      if (tx.status === "awaiting_payment") {
        const transactions = response.data.result;
        const matchingTx = transactions.find(t =>
          t.in_msg?.message === tx.memo && t.in_msg?.value === tx.amount
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
            params: { address: RECEIVING_WALLET_ADDRESS, hash: tx.tx_hash, api_key: TONCENTER_API_KEY, archival: true }
          })).data.result[0].in_msg.source;

          await transferNFT(wallet, nft.address, Address.parse(buyerAddress));

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

const txScanConfig = {
  processType: "TX_SCANNER",
  cronSchedule: "*/10 * * * * *",
  durationFunction: async () => {
    try {
      if(schedulerFlags.TX_SCANNER === true) return;
      schedulerFlags.TX_SCANNER = true;
      await verifyAndTransferTransactions();
      await unlockExpiredLocks();
    } catch (error) {
      log.debug(`Error in tx_scan: ${error.message}`);
    } finally {
      schedulerFlags.TX_SCANNER = false;
    }
  }
};

// Export Schedulers
export const WorkProcess = genericProcessScheduler("work", workProcessConfig);
export const TrainingProccess = genericProcessScheduler("training", trainingProcessConfig);
export const SleepProccess = genericProcessScheduler("sleep", sleepProcessConfig);
export const SkillProccess = genericProcessScheduler("skill", skillProcessConfig);
export const FoodProccess = genericProcessScheduler("food", foodProcessConfig);
export const BoostProccess = genericProcessScheduler("boost", boostProcessConfig);
export const AutoclaimProccess = processIndependentScheduler("autoclaim", autoclaimProcessConfig);
export const NftScanProcess = processIndependentScheduler("nft_scan", nftScanConfig);
export const TxScanProcess = processIndependentScheduler("TX_SCANNER", txScanConfig);
export const RefsRecalsProcess = processIndependentScheduler("investment_level_checks", investmentLevelsProcessConfig);
export const SpinScanProcess = processIndependentScheduler("spin_scan", spinScanConfig);
export const LevelUpdate = processIndependentScheduler("level_scan", levelScanConfig);

const gameTimer = {
  FoodProccess,
  SkillProccess,
  TrainingProccess,
  WorkProcess,
  SleepProccess,
  BoostProccess,
  AutoclaimProccess,
  RefsRecalsProcess,
  NftScanProcess,
  TxScanProcess,
  SpinScanProcess,
  LevelUpdate,
  stopAll() {
    Object.values(this).forEach((scheduler) => {
      if (scheduler && typeof scheduler.stop === "function") {
        scheduler.stop();
        log.info(`Stopped ${scheduler.name || "unknown"} process`);
      }
    });
  },
};

// Store initial and previous memory usage
let initialMemoryUsage = null;
let previousMemoryUsage = null;
const startTime = Date.now(); // Record start time for elapsed time calculation
const WARMUP_PERIOD_MS = 30000; // 30 seconds warmup period

// Function to format memory usage in MB
const formatMemoryUsage = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

// Function to calculate percentage change
const calculatePercentageChange = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return (((current - previous) / previous) * 100).toFixed(2);
};

// Function to determine trend based on percentage change since initial
const determineTrend = (percentageChange, elapsedHours) => {
  const changePerHour = elapsedHours > 0 ? percentageChange / elapsedHours : percentageChange;
  if (Math.abs(changePerHour) < 2) return "STABLE"; // Increased threshold for stability
  if (changePerHour < 10) return percentageChange >= 0 ? "GROWING SLOWLY" : "DECREASING SLOWLY"; // Adjusted threshold
  return percentageChange >= 0 ? "GROWING RAPIDLY" : "DECREASING RAPIDLY";
};

// Function to log memory usage
const logMemoryUsage = () => {
  const memoryUsage = process.memoryUsage();
  const elapsedTime = (Date.now() - startTime) / (1000 * 60 * 60); // Elapsed time in hours
  const elapsedMs = Date.now() - startTime;

  // Set initialMemoryUsage after warmup period
  if (!initialMemoryUsage && elapsedMs >= WARMUP_PERIOD_MS) {
    initialMemoryUsage = { ...memoryUsage };
  }

  // Log current memory usage
  log.warn("Memory Usage Report", {
    rss: formatMemoryUsage(memoryUsage.rss),
    heapTotal: formatMemoryUsage(memoryUsage.heapTotal),
    heapUsed: formatMemoryUsage(memoryUsage.heapUsed),
    external: formatMemoryUsage(memoryUsage.external),
    arrayBuffers: formatMemoryUsage(memoryUsage.arrayBuffers),
  });

  // Log changes since last run
  if (previousMemoryUsage) {
    const changes = {
      rss: calculatePercentageChange(memoryUsage.rss, previousMemoryUsage.rss),
      heapTotal: calculatePercentageChange(memoryUsage.heapTotal, previousMemoryUsage.heapTotal),
      heapUsed: calculatePercentageChange(memoryUsage.heapUsed, previousMemoryUsage.heapUsed),
      external: calculatePercentageChange(memoryUsage.external, previousMemoryUsage.external),
      arrayBuffers: calculatePercentageChange(memoryUsage.arrayBuffers, previousMemoryUsage.arrayBuffers),
    };

    const changeReport = {
      rss: changes.rss >= 0 ? `INCREASED ${changes.rss}%` : `DECREASED ${Math.abs(changes.rss)}%`,
      heapTotal: changes.heapTotal >= 0 ? `INCREASED ${changes.heapTotal}%` : `DECREASED ${Math.abs(changes.heapTotal)}%`,
      heapUsed: changes.heapUsed >= 0 ? `INCREASED ${changes.heapUsed}%` : `DECREASED ${Math.abs(changes.heapUsed)}%`,
      external: changes.external >= 0 ? `INCREASED ${changes.external}%` : `DECREASED ${Math.abs(changes.external)}%`,
      arrayBuffers: changes.arrayBuffers >= 0 ? `INCREASED ${changes.arrayBuffers}%` : `DECREASED ${Math.abs(changes.arrayBuffers)}%`,
    };

    log.warn("MEMORY USAGE CHANGE REPORT (SINCE LAST)", changeReport);
  }

  // Log changes since initial run and trend (only after warmup)
  if (initialMemoryUsage) {
    const initialChanges = {
      rss: calculatePercentageChange(memoryUsage.rss, initialMemoryUsage.rss),
      heapTotal: calculatePercentageChange(memoryUsage.heapTotal, initialMemoryUsage.heapTotal),
      heapUsed: calculatePercentageChange(memoryUsage.heapUsed, initialMemoryUsage.heapUsed),
      external: calculatePercentageChange(memoryUsage.external, initialMemoryUsage.external),
      arrayBuffers: calculatePercentageChange(memoryUsage.arrayBuffers, initialMemoryUsage.arrayBuffers),
    };

    const initialChangeReport = {
      rss: `${initialChanges.rss >= 0 ? '+' : ''}${initialChanges.rss}% (${determineTrend(initialChanges.rss, elapsedTime)})`,
      heapTotal: `${initialChanges.heapTotal >= 0 ? '+' : ''}${initialChanges.heapTotal}% (${determineTrend(initialChanges.heapTotal, elapsedTime)})`,
      heapUsed: `${initialChanges.heapUsed >= 0 ? '+' : ''}${initialChanges.heapUsed}% (${determineTrend(initialChanges.heapUsed, elapsedTime)})`,
      external: `${initialChanges.external >= 0 ? '+' : ''}${initialChanges.external}% (${determineTrend(initialChanges.external, elapsedTime)})`,
      arrayBuffers: `${initialChanges.arrayBuffers >= 0 ? '+' : ''}${initialChanges.arrayBuffers}% (${determineTrend(initialChanges.arrayBuffers, elapsedTime)})`,
    };

    log.warn(`MEMORY USAGE SINCE LAUNCH (${elapsedTime.toFixed(2)} HOURS)`, initialChangeReport);
  } else {
    log.info("Waiting for warmup period before setting initial memory baseline", {
      remainingSeconds: ((WARMUP_PERIOD_MS - elapsedMs) / 1000).toFixed(1),
    });
  }

  // Update previous memory usage
  previousMemoryUsage = { ...memoryUsage };
};

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Floor', { maxPoolSize: 5 })
  .then(() => {
    // Start game process schedulers
    Object.entries(gameTimer).forEach(([name, scheduler]) => {
      if (typeof scheduler.start === "function") {
        scheduler.start();
        log.info(`Started ${name} process`);
      }
    });

    // Log initial memory usage
    logMemoryUsage();

    // Start memory usage logging every 5 minutes
    const memoryLogScheduler = cron.schedule(
      "*/5 * * * * *",
      () => {
        logMemoryUsage();
      },
      { scheduled: true }
    );

    // Ensure memory log scheduler stops on shutdown
    const originalStopAll = gameTimer.stopAll;
    gameTimer.stopAll = function () {
      originalStopAll.call(this);
      memoryLogScheduler.stop();
      log.info("Stopped memory usage logging");
    };

    log.info("Memory logging scheduler started");
  })
  .catch((err) => {
    log.error("Failed to connect to DB", { error: err.message });
    process.exit(1);
  });

// Graceful Shutdown with Promise-based mongoose.connection.close()
const shutdown = async (signal) => {
  log.info(`Received ${signal}, shutting down...`);
  gameTimer.stopAll();
  try {
    await mongoose.connection.close();
    log.info("MongoDB connection closed");
    process.exit(0);
  } catch (err) {
    log.error("Error closing MongoDB connection", { error: err.message });
    process.exit(1);
  }
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

export { log };