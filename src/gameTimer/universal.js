import { config } from "dotenv";
config();

import colors from 'ansi-colors';
import gameProcess from "../models/process/processModel.js";
import UserParameters from "../models/user/userParametersModel.js";
import cron from "node-cron";
import moment from "moment-timezone";
import { canApplyConstantEffects } from "../utils/parametersDepMath.js";
import { upUserExperience } from "../utils/userParameters/upUserBalance.js";
import { recalcValuesByParameters } from "../utils/parametersDepMath.js";
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
import { log } from "../utils/log.js";
import Referal from "../models/referral/referralModel.js";
import { calculateGamecenterLevel } from "../controllers/user/userController.js";
import mongoose from "mongoose";
import UserCurrentInventory from "../models/user/userInventoryModel.js";
import { getBoostPercentageFromType } from "../routes/user/userRoutes.js";
import ShelfItemModel from "../models/shelfItem/shelfItemModel.js";
import UserClothing from "../models/user/userClothingModel.js";
import Clothing from "../models/clothing/clothingModel.js";
import Skill from "../models/skill/skillModel.js";
import { mnemonicToPrivateKey } from '@ton/crypto';
import TONTransactions from "../models/tx/tonTransactionModel.js";
import NFTItems from "../models/nft/nftItemModel.js";
import NftItem from "./contracts/NftItem.js";
import NftCollection from "./contracts/NftCollection.js";
import Queue from 'bull';

// Centralized queue for all DB updates
const dbUpdateQueue = new Queue('db-updates', {
  redis: { host: 'localhost', port: 6379, password: 'redis_password' }, // Adjust Redis config
  defaultJobOptions: {
    attempts: 3, // Retry on transient failures
    backoff: { type: 'exponential', delay: 100 }, // Exponential backoff
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
      await log('info', `${colors.cyanBright('Applied energy restore from tonic-drink')}`, { user_id: userParameters.id, energyRestore });
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
    await log("debug", `Updated timestamp for process ${processId} to ${timestamp}`);
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
    await log("debug", `Applied updates for ${processType} to user ${userParametersId}`);
  },
  completeWorkProcess: async (params, session) => {
    const { processId, userParametersId, baseParametersId } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const baseParameters = await Work.findOne({ work_id: baseParametersId }, null, { session });

    if (!process || !userParameters || !baseParameters) {
      throw new Error(`Missing data for work process completion: ${processId}`);
    }

    const nekoBoostMultiplier = await getNekoBoostMultiplier(userParameters.id);
    const baseCoinsReward = (baseParameters.coins_in_hour / 3600) * (baseParameters.duration * 60);
    const coinsReward = baseCoinsReward * nekoBoostMultiplier;

    await recalcValuesByParameters(userParameters, { coinsReward }, session);
    await upUserExperience(userParameters.id, baseParameters.experience_reward, session);
    await log("info", `Work process completed`, { userId: userParameters.id, coinsReward, experience: baseParameters.experience_reward });
  },
  completeTrainingProcess: async (params, session) => {
    const { processId, userParametersId, baseParametersId } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const baseParameters = await TrainingParameters.findOne({ level: baseParametersId }, null, { session });

    if (!process || !userParameters || !baseParameters) {
      throw new Error(`Missing data for training process completion: ${processId}`);
    }

    // Training completion logic (e.g., apply skill upgrades or stats)
    await log("info", `Training process completed`, { userId: userParameters.id });
  },
  completeSleepProcess: async (params, session) => {
    const { processId, userParametersId, baseParametersId } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const baseParameters = await LevelsParameters.findOne({ level: baseParametersId }, null, { session });

    if (!process || !userParameters || !baseParameters) {
      throw new Error(`Missing data for sleep process completion: ${processId}`);
    }

    await log("info", `Sleep process completed`, { userId: userParameters.id });
  },
  completeSkillProcess: async (params, session) => {
    const { processId, userParametersId, skillId, subType } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const skill = subType === 'constant_effects' 
      ? await ConstantEffects.findOne({ id: skillId }, null, { session }) 
      : await Skill.findOne({ skill_id: skillId }, null, { session });

    if (!process || !userParameters || !skill) {
      throw new Error(`Missing data for skill process completion: ${processId}`);
    }

    if (subType === "constant_effects") {
      userParameters.constant_effects_levels[skill.type] = skill.level;
      await userParameters.save({ session });
      await upUserExperience(userParametersId, skill.experience_reward, session);
    } else {
      await UserSkill.create({ id: userParametersId, skill_id: skillId }, { session });
      await upUserExperience(userParametersId, skill.experience_reward, session);
    }

    await log("info", `Skill process completed`, { userId: userParametersId, skillId });
  },
  completeFoodProcess: async (params, session) => {
    const { processId, userParametersId, baseParametersId } = params;
    const process = await gameProcess.findOne({ _id: processId }, null, { session });
    const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
    const baseParameters = await Food.findOne({ food_id: baseParametersId }, null, { session });

    if (!process || !userParameters || !baseParameters) {
      throw new Error(`Missing data for food process completion: ${processId}`);
    }

    const profits = {};
    if (baseParameters?.long_hungry_restore?.value) profits.hungry = baseParameters.long_hungry_restore.value;
    if (baseParameters?.long_mood_restore?.value) profits.mood = baseParameters.long_mood_restore.value;
    if (baseParameters?.long_energy_restore?.value) profits.energy = baseParameters.long_energy_restore.value;

    await applyUserParameterUpdates(userParameters, {}, profits, "food");
    await log("info", `Food process completed`, { userId: userParameters.id, profits });
  },
};

export const queueDbUpdate = async (operationType, params, description, userId = null) => {
  if (!operationMap[operationType]) {
    throw new Error(`Unknown operation type: ${operationType} for ${description}`);
  }
  const jobData = { operationType, params, description, userId };
  await log("debug", `Enqueuing job for ${description}`, { jobData });
  const job = await dbUpdateQueue.add(jobData);
  return job.id;
};

dbUpdateQueue.process(async (job) => {
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
    await log("info", colors.green(`DB update completed: ${description}`));
  } catch (error) {
    await session.abortTransaction();
    await log("error", colors.red(`DB update failed: ${description}`), { error: error.message, stack: error.stack });
    throw error;
  } finally {
    session.endSession();
  }
});

dbUpdateQueue.on('completed', (job) => {
  log("verbose", colors.green(`DB update job completed`), { jobId: job.id, description: job.data.description });
});

dbUpdateQueue.on('failed', (job, err) => {
  log("error", colors.red(`DB update job failed after retries`), { jobId: job.id, description: job.data.description, error: err.message });
});

// Simplified applyUserParameterUpdates using the queue
const applyUserParameterUpdates = async (userParameters, periodCosts, periodProfits, processType) => {
  const jobId = await queueDbUpdate(
    'applyUserParameterUpdates',
    { userParametersId: userParameters.id, periodCosts, periodProfits, processType },
    `applyUserParameterUpdates for ${processType}, user ${userParameters.id}`,
    userParameters.id
  );
  return [jobId];
};

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
const keyPair = wallet.keyPair;
const tonClient = wallet.client;
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

export const getNekoBoostMultiplier = async (userId) => {
  const boost = await ActiveEffectsModel.findOne({
    user_id: userId,
    type: { $in: [ActiveEffectTypes.BasicNekoBoost, ActiveEffectTypes.NftNekoBoost] },
    valid_until: { $gt: new Date() },
  });
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

const processDurationHandler = async (process, userParameters, baseParameters, processConfig) => {
  const {
    durationDecreaseKey,
    costConfig: rawCostConfig,
    profitConfig: rawProfitConfig,
    finishConditionCheck,
    updateUserParamsOnTick,
    onProcessCompletion,
    baseDurationKey = "duration",
    processType,
  } = processConfig;

  let durationDecreasePercentage = 0;
  let combinedEffects = {};

  log("debug", colors.cyan(`Processing ${processType} (processId: ${process._id})`));
  log("debug", colors.white(`Base parameters: ${JSON.stringify(baseParameters)}`));

  let costConfig, profitConfig;
  if (processType === "work") {
    costConfig = {
      mood: baseParameters.mood_cost_per_minute || 0,
      hungry: baseParameters.hungry_cost_per_minute || 0,
      energy: baseParameters.energy_cost_per_minute || 0,
    };
    profitConfig = { coins: 0 };
  } else {
    costConfig = {};
    profitConfig = {};
    Object.entries(rawCostConfig || {}).forEach(([key, config]) => {
      costConfig[key] = config.baseValueKey ? baseParameters[config.baseValueKey] || 0 : config;
    });
    Object.entries(rawProfitConfig || {}).forEach(([key, config]) => {
      profitConfig[key] = config.baseValueKey ? baseParameters[config.baseValueKey] || 0 : config;
    });
  }

  if (process.effects && process.type !== "boost") {
    mergeEffects(combinedEffects, process.effects);
  }

  if (durationDecreaseKey && userParameters.constant_effects_levels[durationDecreaseKey]) {
    durationDecreasePercentage = userParameters.constant_effects_levels[durationDecreaseKey];
  } else if (combinedEffects.duration_decrease) {
    durationDecreasePercentage = combinedEffects.duration_decrease;
  }

  const baseDurationMinutes = process.base_duration_in_seconds / 60;
  const totalDurationSeconds = baseDurationMinutes * 60;
  const actualDurationSeconds = calculateDuration(baseDurationMinutes, durationDecreasePercentage);

  const now = moment();
  const diffSeconds = now.diff(moment(process.user_parameters_updated_at || process.updatedAt), "seconds");
  const processDurationSeconds = now.diff(moment(process.createdAt), "seconds");

  const periodCosts = calculatePeriodCosts(baseParameters, combinedEffects, diffSeconds, costConfig, [], userParameters, totalDurationSeconds, processType);
  const periodProfits = calculatePeriodProfits(baseParameters, combinedEffects, diffSeconds, profitConfig, [], userParameters, totalDurationSeconds);

  const finalCosts = { ...periodCosts };
  const finalProfits = { ...periodProfits };

  const hasSufficientResources = Object.keys(finalCosts).length === 0 || Object.keys(finalCosts).every(key => {
    const available = Math.floor(userParameters[key] || 0);
    const cost = Math.floor(finalCosts[key] || 0);
    const ok = available >= cost;
    if (!ok) log("warn", colors.yellow(`Insufficient ${key}: ${available} < ${cost}`));
    return ok;
  });

  const jobIds = [];
  if (hasSufficientResources) {
    const applyJobIds = await applyUserParameterUpdates(userParameters, finalCosts, finalProfits, processType);
    jobIds.push(...applyJobIds);

    if (updateUserParamsOnTick) {
      const updateTickJobId = await queueDbUpdate(
        'updateParamsOnTick',
        { userParametersId: userParameters.id, finalProfits, baseParametersId: process.type_id, diffSeconds, processType },
        `Update params on tick for process ${process._id}`,
        userParameters.id
      );
      jobIds.push(updateTickJobId);
    }

    if (processDurationSeconds >= actualDurationSeconds || (finishConditionCheck && finishConditionCheck(userParameters, finalCosts, baseParameters, process))) {
      if (onProcessCompletion) {
        const completeJobId = await queueDbUpdate(
          onProcessCompletion.operationType,
          { processId: process._id, userParametersId: userParameters.id, baseParametersId: process.type_id, skillId: process.type_id, subType: process.sub_type },
          `Complete process ${process._id}`,
          userParameters.id
        );
        jobIds.push(completeJobId);
      }
      const deleteJobId = await queueDbUpdate(
        'deleteProcess',
        { processId: process._id },
        `Delete completed process ${process._id}`,
        userParameters.id
      );
      jobIds.push(deleteJobId);
      await log("info", colors.green(`${processType} process finished`), { userId: userParameters.id, processType, processId: process._id });
    } else {
      if (!process || !process._id) {
        await log("error", colors.red(`Process is invalid or missing _id`), { process });
        return jobIds;
      }
      const updateJobId = await queueDbUpdate(
        'updateTimestamp',
        { processId: process._id, timestamp: now.toDate() },
        `Update process ${process._id} timestamp`,
        userParameters.id
      );
      jobIds.push(updateJobId);
    }
  } else {
    const deleteJobId = await queueDbUpdate(
      'deleteProcess',
      { processId: process._id },
      `Delete process ${process._id} due to insufficient resources`,
      userParameters.id
    );
    jobIds.push(deleteJobId);
    await log("info", colors.yellow(`${processType} process ended - insufficient resources`), {
      userId: userParameters.id,
      processType,
      processId: process._id,
      costs: finalCosts,
      available: { ...userParameters },
    });
  }

  return jobIds;
};

const calculateDuration = (baseDurationMinutes, durationDecreasePercentage) => {
  const decreaseFactor = durationDecreasePercentage / 100;
  const totalSeconds = baseDurationMinutes * 60;
  const adjustedSeconds = totalSeconds * (1 - decreaseFactor);
  return Math.max(1, adjustedSeconds);
};

const calculatePeriodCosts = (baseParameters, combinedEffects, durationSeconds, costConfig, costBlackList, userParameters, totalDurationSeconds, processType) => {
  const finalCosts = {};
  Object.entries(costConfig).forEach(([key, baseValue]) => {
    log("debug", colors.cyan(`Starting cost calc for ${key}: baseValue=${baseValue}`));
    let adjustedValue = Number(baseValue) || 0;

    const decreaseKey = `${key}_cost_decrease`;
    const decreaseValue = combinedEffects[decreaseKey];
    if (decreaseValue) {
      log("debug", colors.yellow(`Applying ${decreaseKey}: ${decreaseValue}%`));
      adjustedValue *= (1 - decreaseValue / 100);
      log("debug", colors.yellow(`Adjusted ${key} cost: ${baseValue} * (1 - ${decreaseValue / 100}) = ${adjustedValue.toFixed(4)}`));
    } else {
      log("debug", colors.yellow(`No ${decreaseKey} effect found`));
    }

    let cost;
    if (processType === "work") {
      const minutesElapsed = durationSeconds / 60;
      cost = adjustedValue * minutesElapsed;
      log("debug", colors.magenta(`Cost for ${key} over ${durationSeconds}s: ${adjustedValue.toFixed(4)} * ${minutesElapsed.toFixed(4)}min = ${cost.toFixed(4)}`));
    } else {
      const ratePerSecond = adjustedValue / totalDurationSeconds;
      cost = ratePerSecond * durationSeconds;
      log("debug", colors.magenta(`Rate per second for ${key}: ${adjustedValue.toFixed(4)} / ${totalDurationSeconds}s = ${ratePerSecond.toFixed(4)}/s`));
      log("debug", colors.magenta(`Cost for ${key} over ${durationSeconds}s: ${ratePerSecond.toFixed(4)} * ${durationSeconds} = ${cost.toFixed(4)}`));
    }

    finalCosts[key] = Number(cost.toFixed(10));
    log("info", colors.blue(`Final process cost for ${key}: ${finalCosts[key]} subtracted`));
  });
  return finalCosts;
};

const calculatePeriodProfits = (baseParameters, combinedEffects, diffSeconds, profitConfig, effectEntries, userParameters, totalDurationSeconds) => {
  const profits = {};
  if (!profitConfig) {
    log("debug", colors.yellow(`No profitConfig provided, returning empty profits`));
    return profits;
  }

  if (!totalDurationSeconds || isNaN(totalDurationSeconds)) {
    log("error", colors.red(`Invalid totalDurationSeconds: ${totalDurationSeconds}, defaulting to 1s to avoid NaN`));
    totalDurationSeconds = 1;
  }

  Object.entries(profitConfig).forEach(([key, baseValue]) => {
    log("debug", colors.cyan(`Starting profit calc for ${key}: baseValue=${baseValue}`));
    let adjustedValue = Number(baseValue) || 0;

    if (combinedEffects[`${key}_increase`]) {
      const increasePercent = combinedEffects[`${key}_increase`] || 0;
      const increase = adjustedValue * (increasePercent / 100);
      adjustedValue += increase;
      log("debug", colors.yellow(`Applied ${key}_increase: ${increasePercent}% of ${baseValue} = +${increase.toFixed(4)}, adjustedValue=${adjustedValue.toFixed(4)}`));
    } else {
      log("debug", colors.yellow(`No ${key}_increase effect found`));
    }

    const ratePerSecond = adjustedValue / totalDurationSeconds;
    log("debug", colors.magenta(`Base rate per second for ${key}: ${adjustedValue.toFixed(4)} / ${totalDurationSeconds}s = ${ratePerSecond.toFixed(4)}/s`));

    const profit = ratePerSecond * diffSeconds;
    profits[key] = isNaN(profit) ? 0 : Number(profit.toFixed(2));
    log("debug", colors.magenta(`Base profit for ${key} over ${diffSeconds}s: ${ratePerSecond.toFixed(4)} * ${diffSeconds} = ${profits[key].toFixed(4)}`));
  });

  combinedEffects.profit_hourly_percent?.forEach(effect => {
    const key = effect.param;
    const hourlyIncreasePercent = effect.value || 0;
    log("debug", colors.cyan(`Applying profit_hourly_percent for ${key}: ${hourlyIncreasePercent}%`));

    if (key === "energy" || key === "hungry" || key === "mood") {
      const currentValue = Number(userParameters[key]) || 0;
      const capacity = key === "energy" ? (Number(userParameters.energy_capacity) || 100) : 100;
      log("debug", colors.white(`${key} currentValue=${currentValue}, capacity=${capacity}`));

      const baseRatio = currentValue / capacity;
      log("debug", colors.white(`Base ratio for ${key}: ${currentValue} / ${capacity} = ${baseRatio.toFixed(4)}`));

      const hourlyProfit = baseRatio * (hourlyIncreasePercent / 100) * capacity;
      log("debug", colors.yellow(`Hourly profit for ${key}: ${baseRatio.toFixed(5)} * (${hourlyIncreasePercent} / 100) * ${capacity} = ${hourlyProfit.toFixed(4)} units/hour`));

      const profitOverDuration = (hourlyProfit / 3600) * totalDurationSeconds;
      log("debug", colors.yellow(`Profit over duration for ${key}: (${hourlyProfit.toFixed(5)} / 3600) * ${totalDurationSeconds}s = ${profitOverDuration.toFixed(4)}`));

      const ratePerSecond = profitOverDuration / totalDurationSeconds;
      log("debug", colors.magenta(`Effect rate per second for ${key}: ${profitOverDuration.toFixed(5)} / ${totalDurationSeconds}s = ${ratePerSecond.toFixed(4)}/s`));

      const profitForTick = ratePerSecond * diffSeconds;
      log("debug", colors.magenta(`Profit for ${key} over ${diffSeconds}s: ${ratePerSecond.toFixed(5)} * ${diffSeconds} = ${profitForTick.toFixed(4)}`));

      const uncappedProfit = (profits[key] || 0) + profitForTick;
      const newTotal = currentValue + uncappedProfit;
      const cappedProfit = Math.min(uncappedProfit, Math.max(0, capacity - currentValue));
      profits[key] = isNaN(cappedProfit) ? 0 : Number(cappedProfit.toFixed(5));
      log("debug", colors.yellow(`Capping ${key}: current=${currentValue}, uncapped new total=${newTotal.toFixed(5)}, capacity=${capacity}, capped profit=${profits[key].toFixed(4)}`));
    }
    log("info", colors.blue(`Final process profit for ${key}: ${profits[key].toFixed(5)} added`));
  });

  return profits;
};

const customDurationProcessTypes = ["autoclaim", "investment_level_checks", "nft_scan"];

const genericProcessScheduler = (processType, processConfig) => {
  const { cronSchedule, durationFunction, Model, getTypeSpecificParams } = processConfig;
  let isRunning = false;

  const scheduler = cron.schedule(cronSchedule, async () => {
    if (isRunning) {
      await log("verbose", `${processType} iteration skipped - previous run in progress`);
      return;
    }
    isRunning = true;

    const MAX_RETRIES = 3;
    let retryCount = 0;

    while (retryCount < MAX_RETRIES) {
      let session;
      try {
        session = await mongoose.startSession();
        session.startTransaction();

        if (customDurationProcessTypes.includes(processType)) {
          await log("verbose", `${processType} process scheduler started iteration, using custom duration func`);
          await durationFunction(session);
          await session.commitTransaction();
          break;
        }

        await log("verbose", `${processType} process scheduler started iteration`);
        const processes = await gameProcess.find({ type: processType }, null, { session });

        await Promise.all(processes.map(async (process) => {
          const userParameters = await UserParameters.findOne({ id: process.id }, null, { session });
          const baseParameters = Model ? await Model.findOne(getTypeSpecificParams(process), null, { session }) : {};

          await log("verbose", `${processType} process scheduler fetched params`, { userParameters, baseParameters });

          if (!userParameters || !baseParameters) {
            await log("error", `${processType} process error: base parameters or userParameters not found`, { processId: process._id });
            return;
          }
          await durationFunction(process, userParameters, baseParameters, processConfig, session);
        }));

        await log("verbose", `${processType} process scheduler finished iteration`, { processesCount: processes.length });
        await session.commitTransaction();
        break;
      } catch (e) {
        if (session) {
          await session.abortTransaction();
        }
        if (e.name === "MongoServerError" && e.code === 112) {
          retryCount++;
          if (retryCount < MAX_RETRIES) {
            await log("warn", colors.yellow(`WriteConflict detected in ${processType} scheduler, retrying (${retryCount}/${MAX_RETRIES})`));
            await new Promise(resolve => setTimeout(resolve, 100 * retryCount));
            continue;
          } else {
            await log("error", `Max retries reached for ${processType} scheduler`, { error: e.message, stack: e.stack });
          }
        } else {
          await log("error", `Error in ${processType} Process:`, { error: e.message, stack: e.stack });
        }
      } finally {
        if (session) {
          session.endSession();
        }
        isRunning = false;
      }
    }
  }, { scheduled: false });

  scheduler.name = processType;
  return scheduler;
};

const processIndependentScheduler = (processType, processConfig) => {
  const { cronSchedule, durationFunction } = processConfig;

  const scheduler = cron.schedule(cronSchedule, async () => {
    try {
      await durationFunction();
      await log("verbose", `${processType} process scheduler finished iteration`);
    } catch (e) {
      await log("error", `Error in ${processType} Process:`, { error: e.message, stack: e.stack });
    }
  }, { scheduled: false });

  scheduler.name = processType;
  return scheduler;
};

// Process Configurations
const workProcessConfig = {
  processType: "work",
  cronSchedule: "*/10 * * * * *",
  Model: Work,
  durationFunction: processDurationHandler,
  getTypeSpecificParams: (process) => ({ work_id: process.type_id }),
  durationDecreaseKey: "work_duration_decrease",
  costConfig: {
    mood: { baseValueKey: "mood_cost_per_minute" },
    hungry: { baseValueKey: "hungry_cost_per_minute" },
    energy: { baseValueKey: "energy_cost_per_minute" },
  },
  baseDurationKey: "base_duration_in_seconds",
  profitConfig: {},
  onProcessCompletion: { operationType: 'completeWorkProcess' },
};

const trainingProcessConfig = {
  processType: "training",
  cronSchedule: "*/10 * * * * *",
  Model: TrainingParameters,
  durationFunction: processDurationHandler,
  getTypeSpecificParams: (process) => ({ level: process.type_id }),
  costConfig: {
    energy: { baseValueKey: "energy_spend" },
    hungry: { baseValueKey: "hungry_spend" },
  },
  profitConfig: {
    mood: { baseValueKey: "mood_profit" },
  },
  durationDecreaseKey: "training_duration_decrease",
  finishConditionCheck: (userParameters) => userParameters.energy <= 0 || userParameters.hungry <= 0,
  onProcessCompletion: { operationType: 'completeTrainingProcess' },
};

const sleepProcessConfig = {
  processType: "sleep",
  cronSchedule: "*/10 * * * * *",
  Model: LevelsParameters,
  durationFunction: processDurationHandler,
  getTypeSpecificParams: (process) => ({ level: process.type_id }),
  profitConfig: {
    energy: { baseValueKey: "energy_capacity" },
  },
  baseDurationKey: "sleep_duration",
  durationDecreaseKey: "sleeping_duration_decrease",
  finishConditionCheck: (userParameters) => false,
  onProcessCompletion: { operationType: 'completeSleepProcess' },
};

const skillProcessConfig = {
  processType: "skill",
  cronSchedule: "*/10 * * * * *",
  durationFunction: processDurationHandler,
  getTypeSpecificParams: (process) => ({ id: process.type_id }),
  baseDurationKey: "base_duration_in_seconds",
  onProcessCompletion: { operationType: 'completeSkillProcess' },
};

const foodProcessConfig = {
  processType: "food",
  cronSchedule: "*/10 * * * * *",
  Model: Food,
  durationFunction: processDurationHandler,
  getTypeSpecificParams: (process) => ({ food_id: process.type_id }),
  onProcessCompletion: { operationType: 'completeFoodProcess' },
};

const boostProcessConfig = {
  processType: "boost",
  cronSchedule: "*/10 * * * * *",
  Model: Boost,
  durationFunction: processDurationHandler,
  getTypeSpecificParams: (process) => ({ boost_id: process.type_id }),
  profitConfig: {},
  updateUserParamsOnTick: true,
};

const claim = async (investment_type, userId) => {
  if (!Object.values(InvestmentTypes).includes(investment_type)) {
    await log("warn", `Invalid investment type`, { investment_type, userId });
    return;
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await User.findOne({ id: userId }, { investment_levels: 1 }, { session });
    const userParams = await UserParameters.findOne({ id: userId }, null, { session });
    const userInvestmentLevel = user.investment_levels[investment_type];
    const investmentsOfType = (await Investments.find({ type: investment_type }, { id: 1 }, { session })).map(item => item.id);
    const investmentToClaim = await UserLaunchedInvestments.findOne(
      { user_id: userId, investment_id: { $in: investmentsOfType }, claimed: false },
      null,
      { sort: { createdAt: -1 }, session }
    );

    if (!investmentToClaim) {
      await log("debug", `No claimable investment found`, { userId, investment_type });
      await session.abortTransaction();
      return;
    }

    const investment = await Investments.findOne({ type: investment_type, level: userInvestmentLevel }, null, { session });
    if (!investment) {
      await log("error", `Investment definition not found`, { investment_type, userInvestmentLevel, userId });
      await session.abortTransaction();
      return;
    }

    const claimableTime = 3600000;
    if (Date.now() - new Date(investmentToClaim.createdAt).getTime() < claimableTime) {
      await log("debug", `Investment not yet claimable`, { userId, investment_type });
      await session.abortTransaction();
      return;
    }

    // Enqueue operations using the queue
    const jobIds = [];

    // Update user parameters with coins reward
    jobIds.push(await queueDbUpdate(
      'applyInvestmentClaim',
      { userParametersId: userParams.id, coinsReward: investmentToClaim.to_claim, experienceReward: investment.experience_reward },
      `Claim investment reward for ${investment_type}, user ${userId}`,
      userId
    ));

    // Mark investment as claimed
    jobIds.push(await queueDbUpdate(
      'markInvestmentClaimed',
      { investmentId: investmentToClaim._id },
      `Mark investment as claimed for ${investment_type}, user ${userId}`,
      userId
    ));

    // Create new UserLaunchedInvestments entry
    jobIds.push(await queueDbUpdate(
      'createNewInvestment',
      { userId, investmentId: investment.id, toClaim: investment.coins_per_hour, investmentType: investment_type },
      `Create new investment entry for ${investment_type}, user ${userId}`,
      userId
    ));

    await session.commitTransaction();
    await log("info", `Investment claim process enqueued`, { userId, investment_type, jobIds });

    return jobIds; // Return job IDs for tracking if needed
  } catch (error) {
    await session.abortTransaction();
    await log("error", `Error during investment claim process`, { userId, investment_type, error: error.message });
    throw error;
  } finally {
    session.endSession();
  }
};

// Add these to the operationMap
operationMap.applyInvestmentClaim = async (params, session) => {
  const { userParametersId, coinsReward, experienceReward } = params;
  const userParameters = await UserParameters.findOne({ id: userParametersId }, null, { session });
  if (!userParameters) {
    throw new Error(`UserParameters ${userParametersId} not found`);
  }

  await recalcValuesByParameters(userParameters, { coinsReward }, session);
  await upUserExperience(userParametersId, experienceReward, session);
  await userParameters.save({ session });
  await log("debug", `Applied investment claim rewards`, { userId: userParametersId, coinsReward, experienceReward });
};

operationMap.markInvestmentClaimed = async (params, session) => {
  const { investmentId } = params;
  const investment = await UserLaunchedInvestments.findOne({ _id: investmentId }, null, { session });
  if (!investment) {
    throw new Error(`Investment ${investmentId} not found`);
  }

  investment.claimed = true;
  await investment.save({ session });
  await log("debug", `Marked investment as claimed`, { investmentId });
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
  await log("debug", `Created new investment entry`, { userId, investmentType, toClaim });
};

const processInBatches = async (items, batchSize, processFn) => {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(processFn));
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

const autoclaimProcessConfig = {
  processType: "autoclaim",
  cronSchedule: "*/1 * * * * *",
  durationFunction: async (session) => {
    try {
      await log("verbose", `Autoclaim process scheduler started iteration`);
      const usersWithAutoclaim = await User.aggregate([
        { $match: { $or: [{ "has_autoclaim.game_center": true }, { "has_autoclaim.zoo_shop": true }, { "has_autoclaim.coffee_shop": true }] } },
      ]);

      await processInBatches(usersWithAutoclaim, 50, async (user) => {
        const { has_autoclaim: { game_center = false, zoo_shop = false, coffee_shop = false } } = user;
        if (game_center) await claim(InvestmentTypes.GameCenter, user.id, session);
        if (zoo_shop) await claim(InvestmentTypes.ZooShop, user.id, session);
        if (coffee_shop) await claim(InvestmentTypes.CoffeeShop, user.id, session);
      });

      await log("verbose", `Autoclaim process scheduler finished iteration`, { usersEligible: usersWithAutoclaim.length });
    } catch (e) {
      await log("error", "Error in autoclaim process", { error: e.message, stack: e.stack });
    }
  },
  Model: User,
  getTypeSpecificParams: () => ({}),
};

const investmentLevelsProcessConfig = {
  processType: "investment_level_checks",
  cronSchedule: "*/10 * * * * *",
  durationFunction: async () => {
    try {
      await log("verbose", `investment_level_checks process scheduler started iteration`);
      const usersWithRefs = await Referal.aggregate([
        { $group: { _id: "$refer_id", referral_count: { $sum: 1 } } },
        { $project: { refer_id: "$_id", referral_count: 1 } },
      ]);

      await processInBatches(usersWithRefs, 50, async (user) => {
        const userDoc = await User.findOne({ id: user.refer_id });
        if (userDoc) {
          const currentLevel = userDoc.investment_levels.game_center;
          const calculatedLevel = calculateGamecenterLevel(user.referral_count);
          if (calculatedLevel > currentLevel) {
            userDoc.investment_levels.game_center = calculatedLevel;
            await userDoc.save();
            await log("info", `Updated game_center level`, { userId: user.refer_id, newLevel: calculatedLevel });
          }
        }
      });

      await log("verbose", "investment_level_checks iterated all users");
    } catch (e) {
      await log("error", "Error in investment_level_checks process", { error: e.message, stack: e.stack });
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
    }

    return [...new Set(allNfts.filter(address => nftMap[address] !== undefined).map(address => nftMap[address]))];
  } catch (error) {
    await log("error", `Error fetching NFTs for ${walletAddress}`, { error: error.message });
    return [];
  }
};

const syncShelfInventory = async (userId, nftItemIds) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const inventory = await UserCurrentInventory.findOne({ user_id: userId }, null, { session }) ||
                     await UserCurrentInventory.create({ user_id: userId, shelf: [] }, { session });
    const user = await User.findOne({ id: userId }, null, { session });

    const currentShelfIds = (inventory.shelf || []).map(item => item.id);
    const nftShelfIds = nftItemIds.filter(id => id >= 9 && id <= 38);
    const currentManagedIds = currentShelfIds.filter(id => id >= 9 && id <= 38);

    const itemsToAdd = nftShelfIds.filter(id => !currentManagedIds.includes(id)).map(id => ({ id }));
    const itemsToRemove = currentManagedIds.filter(id => !nftShelfIds.includes(id));

    if (user?.shelf?.neko && itemsToRemove.includes(user.shelf.neko)) {
      await User.updateOne({ id: userId }, { $set: { "shelf.neko": null } }, { session });
    }

    if (itemsToAdd.length) {
      await UserCurrentInventory.updateOne({ user_id: userId }, { $addToSet: { shelf: { $each: itemsToAdd } } }, { session });
    }
    if (itemsToRemove.length) {
      await UserCurrentInventory.updateOne({ user_id: userId }, { $pull: { shelf: { id: { $in: itemsToRemove } } } }, { session });
    }

    await session.commitTransaction();
    return { added: itemsToAdd, removed: itemsToRemove };
  } catch (error) {
    await session.abortTransaction();
    await log("error", `Error syncing inventory for ${userId}`, { error: error.message });
    return { added: [], removed: [] };
  } finally {
    session.endSession();
  }
};

let isRunning = false;

const nftScanConfig = {
  processType: "nft_scan",
  cronSchedule: "*/10 * * * * *",
  durationFunction: async () => {
    if (isRunning) {
      await log("verbose", "NFT-scanner iteration skipped - previous run still in progress");
      return;
    }
    isRunning = true;
    try {
      await log("verbose", "NFT-scanner process scheduler started iteration");
      const usersWithWallets = await User.find({ tonWalletAddress: { $ne: null } });

      await processInBatches(usersWithWallets, 50, async (user) => {
        const nftItemIds = await getWhitelistedNftsFromWallet(user.tonWalletAddress);
        await syncShelfInventory(user.id, nftItemIds);
      });

      await log("verbose", "NFT-scanner process scheduler finished iteration", { totalUsers: usersWithWallets.length });
    } catch (e) {
      await log("error", "Error in NFT scan process", { error: e.message, stack: e.stack });
    } finally {
      isRunning = false;
    }
  },
  Model: User,
  getTypeSpecificParams: () => ({}),
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
      console.log("Server wallet address:", RECEIVING_WALLET_ADDRESS);
      await verifyAndTransferTransactions();
      await unlockExpiredLocks();
    } catch (error) {
      console.error("Failed to initialize server wallet:", error);
      process.exit(1);
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
export const AutoclaimProccess = genericProcessScheduler("autoclaim", autoclaimProcessConfig);
export const RefsRecalsProcess = genericProcessScheduler("investment_level_checks", investmentLevelsProcessConfig);
export const NftScanProcess = genericProcessScheduler("nft_scan", nftScanConfig);
export const TxScanProcess = processIndependentScheduler("tx_scan", txScanConfig);