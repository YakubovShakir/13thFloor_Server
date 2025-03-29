import { config } from "dotenv";
config();

import colors from 'ansi-colors'
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
import { Address } from "@ton/ton";
import nftMap from "./nft_mapping.json" with { type: "json" };
import axios from "axios";
import { ActiveEffectTypes, ActiveEffectsModel } from "../models/effects/activeEffectsModel.js";
import { log } from "../utils/log.js";
import Referal from "../models/referral/referralModel.js";
import { calculateGamecenterLevel } from "../controllers/user/userController.js";
import { ActionTypes, ActionLogModel } from "../models/effects/actionLogModel.js";
import UserCurrentInventory from "../models/user/userInventoryModel.js";
import { getBoostPercentageFromType } from "../routes/user/userRoutes.js";
import ShelfItemModel from "../models/shelfItem/shelfItemModel.js";
import UserClothing from "../models/user/userClothingModel.js";
import Clothing from "../models/clothing/clothingModel.js";
import Skill from "../models/skill/skillModel.js";

const TONCENTER_API_KEY = process.env.TONCENTER_API_KEY;
const TONCENTER_API_URL = "https://toncenter.com/api/v2";

const limiter = new Bottleneck({
  minTime: 1000, // 1 request per second
  maxConcurrent: 1,
});

const TONAPI_KEY = process.env.TONAPI_KEY || "";

// Helper Functions
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

const applyUserParameterUpdates = async (userParameters, periodCosts, periodProfits, processType) => {
  
  Object.keys(periodCosts).forEach((key) => {
    userParameters[key] = Math.max(0, userParameters[key] - periodCosts[key]);
  });
  Object.keys(periodProfits).forEach((key) => {
    if (key === "energy") {
      userParameters[key] = Math.min(userParameters.energy_capacity, userParameters[key] + periodProfits[key]);
    } else if (key === "mood" || key === "hungry") {
      userParameters[key] = Math.min(100, userParameters[key] + periodProfits[key]);
    } else if (userParameters[key] !== undefined) {
      userParameters[key] += periodProfits[key];
    }
  });

  if (recalcValuesProcessTypeWhitelist.includes(processType)) {
    await recalcValuesByParameters(userParameters, { coinsReward: 0, ...periodProfits });
  } else {
    await userParameters.save();
  }
};

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

  try {
    let durationDecreasePercentage = 0;
    let combinedEffects = {};

    log("debug", colors.cyan(`Processing ${processType} (processId: ${process._id})`));
    log("debug", colors.white(`Base parameters: ${JSON.stringify(baseParameters)}`));

    // Normalize costConfig and profitConfig
    let costConfig, profitConfig;
    if (processType === "work") {
      costConfig = {
        mood: baseParameters.mood_cost_per_minute || 0,
        hungry: baseParameters.hungry_cost_per_minute || 0,
        energy: baseParameters.energy_cost_per_minute || 0,
      };
      profitConfig = {
        // Calculated when finishing
        coins: 0
        // coins: baseParameters.coins_in_hour ? baseParameters.coins_in_hour / 60 : 0, // Convert to per-minute
      };
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
    log("debug", colors.white(`Cost config: ${JSON.stringify(costConfig)}`));
    log("debug", colors.white(`Profit config: ${JSON.stringify(profitConfig)}`));

    // Effects for non-skill processes
    if (processType !== "skill") {
      const userClothing = await UserClothing.findOne({ user_id: process.id }, { _id: 0, user_id: 0 });
      const user = await User.findOne({ id: process.id });
      log("debug", colors.cyan(`Collecting effects for ${processType} (processId: ${process._id})`));

      const shelfItems = Object.values(user.shelf).filter(Boolean);
      if (shelfItems.length > 0) {
        const shelf = await ShelfItemModel.find({ id: { $in: shelfItems } });
        shelf.forEach((item) => {
          if (item.effects) mergeEffects(combinedEffects, item.effects);
        });
      }

      if (userClothing) {
        const clothesItems = [userClothing.hat, userClothing.top, userClothing.pants, userClothing.shoes, userClothing.accessories]
          .filter(item => item !== null && item !== undefined);
        if (clothesItems.length > 0) {
          const clothing = await Clothing.find({ clothing_id: { $in: clothesItems } });
          clothing.forEach((item) => {
            if (item.effects) mergeEffects(combinedEffects, item.effects);
          });
        }
      }

      if (process.effects && process.type !== "boost") {
        mergeEffects(combinedEffects, process.effects);
      }

      log("debug", colors.cyan(`Final combinedEffects: ${JSON.stringify(combinedEffects)}`));
    }

    // Apply duration decrease
    if (durationDecreaseKey && userParameters.constant_effects_levels[durationDecreaseKey]) {
      durationDecreasePercentage = userParameters.constant_effects_levels[durationDecreaseKey];
    } else if (combinedEffects.duration_decrease) {
      durationDecreasePercentage = combinedEffects.duration_decrease;
    }
    log("debug", colors.yellow(`Applied ${durationDecreaseKey || 'duration_decrease'}: ${durationDecreasePercentage}%`));

    const baseDurationMinutes = process.base_duration_in_seconds / 60; // Assuming this is in seconds
    const totalDurationSeconds = baseDurationMinutes * 60;
    const actualDurationSeconds = calculateDuration(baseDurationMinutes, durationDecreasePercentage);

    log("debug", colors.white(`Duration: base=${baseDurationMinutes.toFixed(2)}min (${totalDurationSeconds}s), total=${totalDurationSeconds}s, actual=${actualDurationSeconds.toFixed(2)}s`));

    const now = moment();
    const diffSeconds = now.diff(moment(process.user_parameters_updated_at || process.updatedAt), "seconds");
    const processDurationSeconds = now.diff(moment(process.createdAt), "seconds");

    log("debug", colors.white(`Timing: diffSeconds=${diffSeconds}s, processDurationSeconds=${processDurationSeconds}s`));
    log("debug", colors.cyan(`Starting cost/profit calc for ${processType} (processId: ${process._id}) over ${diffSeconds}s`));

    const periodCosts = calculatePeriodCosts(baseParameters, combinedEffects, diffSeconds, costConfig, [], userParameters, totalDurationSeconds, processType);
    const periodProfits = calculatePeriodProfits(baseParameters, combinedEffects, diffSeconds, profitConfig, [], userParameters, totalDurationSeconds);

    const finalCosts = { ...periodCosts };
    const finalProfits = { ...periodProfits };

    log("debug", colors.blue(`Final costs: ${JSON.stringify(finalCosts)}`));
    log("debug", colors.blue(`Final profits: ${JSON.stringify(finalProfits)}`));

    const hasSufficientResources = Object.keys(finalCosts).length === 0 || Object.keys(finalCosts).every(key => {
      const available = Math.floor(userParameters[key] || 0);
      const cost = Math.floor(finalCosts[key] || 0);
      const ok = available >= cost;
      if (!ok) log("warn", colors.yellow(`Insufficient ${key}: ${available} < ${cost}`));
      return ok;
    });

    if (hasSufficientResources) {
      await applyUserParameterUpdates(userParameters, finalCosts, finalProfits, processType);

      if (updateUserParamsOnTick) {
        updateUserParamsOnTick(userParameters, finalProfits, baseParameters, diffSeconds);
      }

      if (processDurationSeconds >= actualDurationSeconds || (finishConditionCheck && finishConditionCheck(userParameters, finalCosts, baseParameters, process))) {
        if (onProcessCompletion) await onProcessCompletion(process, userParameters, baseParameters);
        await log("info", colors.green(`${processType} process finished`), { userId: userParameters.id, processType, processId: process._id });
        await gameProcess.deleteOne({ _id: process._id });
        return;
      }

      process.user_parameters_updated_at = now.toDate();
      await process.save();
    } else {
      await log("info", colors.yellow(`${processType} process ended - insufficient resources`), {
        userId: userParameters.id,
        processType,
        processId: process._id,
        costs: finalCosts,
        available: { ...userParameters },
      });
      await gameProcess.deleteOne({ _id: process._id });
    }
  } catch (error) {
    await log("error", colors.red(`Error in ${processType} process duration handler`), {
      processId: process._id,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
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
      // For "work," baseValue is a per-minute rate
      const minutesElapsed = durationSeconds / 60;
      cost = adjustedValue * minutesElapsed;
      log("debug", colors.magenta(`Cost for ${key} over ${durationSeconds}s: ${adjustedValue.toFixed(4)} * ${minutesElapsed.toFixed(4)}min = ${cost.toFixed(4)}`));
    } else {
      // For other processes (e.g., training, sleep), baseValue is a total over duration
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

  // Initialize profits from profitConfig
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

  // Apply profit_hourly_percent
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
    } else {
      //!TODO recheck effects
      // const baseValue = Number(profits[key]) || 0;
      // const hourlyProfit = (baseValue * hourlyIncreasePercent) / 100;
      // log("debug", colors.yellow(`Hourly profit for ${key}: ${baseValue} * ${hourlyIncreasePercent} / 100 = ${hourlyProfit.toFixed(4)}`));

      // const profitOverDuration = (hourlyProfit / 3600) * totalDurationSeconds;
      // log("debug", colors.yellow(`Profit over duration for ${key}: (${hourlyProfit.toFixed(5)} / 3600) * ${totalDurationSeconds}s = ${profitOverDuration.toFixed(4)}`));

      // const ratePerSecond = profitOverDuration / totalDurationSeconds;
      // log("debug", colors.magenta(`Effect rate per second for ${key}: ${profitOverDuration.toFixed(5)} / ${totalDurationSeconds}s = ${ratePerSecond.toFixed(4)}/s`));

      // const profit = ratePerSecond * diffSeconds;
      // profits[key] = isNaN(profit) ? baseValue : Number(((profits[key] || 0) + profit).toFixed(5));
      // log("debug", colors.magenta(`Profit for ${key} over ${diffSeconds}s: ${ratePerSecond.toFixed(5)} * ${diffSeconds} = ${profit.toFixed(4)}`));
    }

    log("info", colors.blue(`Final process profit for ${key}: ${profits[key].toFixed(5)} added`));
  });

  return profits;
};

const customDurationProcessTypes = ["autoclaim", "investment_level_checks", "nft_scan"];

const genericProcessScheduler = (processType, processConfig) => {
  const { cronSchedule, durationFunction, Model, getTypeSpecificParams } = processConfig;

  const scheduler = cron.schedule(cronSchedule, async () => {
    try {
      if (customDurationProcessTypes.includes(processType)) {
        await log("verbose", `${processType} process scheduler started iteration, using custom duration func`);
        await durationFunction();
        return;
      }

      await log("verbose", `${processType} process scheduler started iteration`);
      const processes = await gameProcess.find({ type: processType });

      await Promise.all(processes.map(async (process) => {
        const userParameters = await UserParameters.findOne({ id: process.id });
        const baseParameters = Model ? await Model.findOne(getTypeSpecificParams(process)) : {};
        
        await log("verbose", `${processType} process scheduler fetched params`, { userParameters, baseParameters });

        if (!userParameters || !baseParameters) {
          await log("error", `${processType} process error: base parameters or userParameters not found`, { processId: process._id });
          return;
        }
        await durationFunction(process, userParameters, baseParameters, processConfig);
      }));

      await log("verbose", `${processType} process scheduler finished iteration`, { processesCount: processes.length });
    } catch (e) {
      await log("error", `Error in ${processType} Process:`, { error: e.message, stack: e.stack });
    }
  }, { scheduled: false });

  scheduler.name = processType; // For identification in stopAll
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
    mood: { type: "per_minute", baseValueKey: "mood_cost_per_minute", baseDurationKey: "duration" },
    hungry: { type: "per_minute", baseValueKey: "hungry_cost_per_minute", baseDurationKey: "duration" },
    energy: { type: "per_minute", baseValueKey: "energy_cost_per_minute", baseDurationKey: "duration" },
  },
  baseDurationKey: "base_duration_in_seconds",
  profitConfig: {},
  onProcessCompletion: async (process, userParameters, baseParameters) => {
    await log("verbose", colors.blue("Fetching neko multiplier for user..."), { processId: process._id, userId: process.id });
    const nekoBoostMultiplier = await getNekoBoostMultiplier(userParameters.id);
    await log("verbose", colors.blue("Fetched neko multiplier for user"), { processId: process._id, userId: process.id, nekoBoostMultiplier });
    const baseCoinsReward = (baseParameters.coins_in_hour / 3600) * (baseParameters.duration * 60);
    const coinsReward = baseCoinsReward * nekoBoostMultiplier;
    await log("verbose", colors.yellow("Base work reward for user: " + coinsReward), { processId: process._id, userId: process.id, nekoBoostMultiplier, workId: process.type_id });
    await recalcValuesByParameters(userParameters, { coinsReward });
    await upUserExperience(userParameters.id, baseParameters.experience_reward);
  },
};

const trainingProcessConfig = {
  processType: "training",
  cronSchedule: "*/10 * * * * *",
  Model: TrainingParameters,
  durationFunction: processDurationHandler,
  getTypeSpecificParams: (process) => ({ level: process.type_id }),
  costConfig: {
    energy: { type: "per_minute", baseValueKey: "energy_spend", effectDecreaseKey: "energy_cost_decrease", baseDurationKey: "duration" },
    hungry: { type: "per_minute", baseValueKey: "hungry_spend", effectDecreaseKey: "hunger_cost_decrease", baseDurationKey: "duration" },
  },
  profitConfig: {
    mood: { type: "per_minute", baseValueKey: "mood_profit", effectIncreaseKey: "mood_increase" },
  },
  durationDecreaseKey: "training_duration_decrease",
  finishConditionCheck: (userParameters) => userParameters.energy <= 0 || userParameters.hungry <= 0, // Additional termination conditions
};

const sleepProcessConfig = {
  processType: "sleep",
  cronSchedule: "*/10 * * * * *",
  Model: LevelsParameters,
  durationFunction: processDurationHandler,
  getTypeSpecificParams: (process) => ({ level: process.type_id }),
  profitConfig: {
    energy: { type: "progressive", baseValueKey: "energy_capacity", baseDurationKey: "sleep_duration" },
  },
  baseDurationKey: "sleep_duration",
  durationDecreaseKey: "sleeping_duration_decrease",
  finishConditionCheck: (userParameters) => false, // Rely on profit cap check in canContinue
};

const skillProcessConfig = {
  processType: "skill",
  cronSchedule: "*/10 * * * * *",
  durationFunction: processDurationHandler,
  getTypeSpecificParams: (process) => ({ id: process.type_id }),
  baseDurationKey: "base_duration_in_seconds",
  onProcessCompletion: async (process, userParameters, baseParameters) => {
    const userId = process.id;
    const skillId = process.type_id;
    const skill = process.sub_type === 'constant_effects' ? await ConstantEffects.findOne({ id: skillId }) : await Skill.find({ skill_id: skillId })
    
    console.log(skill)

    if (process.sub_type === "constant_effects") {
      userParameters.constant_effects_levels[skill.type] = skill.level;
      await upUserExperience(userId, skill.experience_reward);
      await userParameters.save();
    } else {
      await upUserExperience(userId, skill.experience_reward);
      await UserSkill.create({ id: userId, skill_id: skillId });
    }
  },
};

const foodProcessConfig = {
  processType: "food",
  cronSchedule: "*/10 * * * * *",
  Model: Food,
  durationFunction: processDurationHandler,
  getTypeSpecificParams: (process) => ({ food_id: process.type_id }),
  onProcessCompletion: async (process, userParameters, baseParameters) => {
    // const profits = {};
    // if (baseParameters?.long_hungry_restore?.value) profits.hungry = (baseParameters.long_hungry_restore.value / 60) * 60;
    // if (baseParameters?.long_mood_restore?.value) profits.mood = (baseParameters.long_mood_restore.value / 60) * 60;
    // if (baseParameters?.long_energy_restore?.value) profits.energy = (baseParameters.long_energy_restore.value / 60) * 60;
    // await applyUserParameterUpdates(userParameters, {}, profits);
  },
};

const boostProcessConfig = {
  processType: "boost",
  cronSchedule: "*/10 * * * * *",
  Model: Boost,
  durationFunction: processDurationHandler,
  getTypeSpecificParams: (process) => ({ boost_id: process.type_id }),
  profitConfig: {},
  updateUserParamsOnTick: (userParameters, periodProfits, baseParameters, diffSeconds) => {
    if (baseParameters.type === "tonic-drink") {
      userParameters.energy = Math.min(
        userParameters.energy_capacity,
        userParameters.energy + (userParameters.energy_capacity / (3 * 3600)) * diffSeconds
      );
    }
  },
  finishConditionCheck: (userParameters, periodCosts, baseParameters, process) => {
    const boostDurationSeconds = calculateDuration(baseParameters.duration, 0);
    return moment().diff(moment(process.createdAt), "seconds") >= boostDurationSeconds;
  },
};

const claim = async (investment_type, userId) => {
  try {
    if (!Object.values(InvestmentTypes).includes(investment_type)) {
      await log("warn", `Invalid investment type`, { investment_type, userId });
      return;
    }

    const user = await User.findOne({ id: userId }, { investment_levels: 1 });
    const userParams = await UserParameters.findOne({ id: userId });
    const userInvestmentLevel = user.investment_levels[investment_type];
    const investmentsOfType = (await Investments.find({ type: investment_type }, { id: 1 })).map(item => item.id);
    const investmentToClaim = await UserLaunchedInvestments.findOne(
      { user_id: userId, investment_id: { $in: investmentsOfType }, claimed: false },
      null,
      { sort: { createdAt: -1 } }
    );

    if (!investmentToClaim) {
      await log("debug", `No claimable investment found`, { userId, investment_type });
      return;
    }

    const investment = await Investments.findOne({ type: investment_type, level: userInvestmentLevel });
    if (!investment) {
      await log("error", `Investment definition not found`, { investment_type, userInvestmentLevel, userId });
      return;
    }

    const claimableTime = 3600000;
    if (Date.now() - new Date(investmentToClaim.createdAt).getTime() < claimableTime) {
      await log("debug", `Investment not yet claimable`, { userId, investment_type });
      return;
    }

    await recalcValuesByParameters(userParams, { coinsReward: investmentToClaim.to_claim });
    await upUserExperience(userId, investment.experience_reward);
    investmentToClaim.claimed = true;
    await investmentToClaim.save();

    await new UserLaunchedInvestments({
      user_id: userId,
      investment_id: investment.id,
      to_claim: investment.coins_per_hour,
      investment_type,
    }).save();

    await userParams.save();
  } catch (error) {
    await log("error", `Error during investment claim process`, { userId, investment_type, error: error.message });
  }
};

const processInBatches = async (items, batchSize, processFn) => {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(processFn));
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for GC
  }
};

const autoclaimProcessConfig = {
  processType: "autoclaim",
  cronSchedule: "*/1 * * * * *",
  durationFunction: async () => {
    try {
      await log("verbose", `Autoclaim process scheduler started iteration`);
      const usersWithAutoclaim = await User.aggregate([
        { $match: { $or: [{ "has_autoclaim.game_center": true }, { "has_autoclaim.zoo_shop": true }, { "has_autoclaim.coffee_shop": true }] } },
      ]);

      await processInBatches(usersWithAutoclaim, 50, async (user) => {
        const { has_autoclaim: { game_center = false, zoo_shop = false, coffee_shop = false } } = user;
        if (game_center) await claim(InvestmentTypes.GameCenter, user.id);
        if (zoo_shop) await claim(InvestmentTypes.ZooShop, user.id);
        if (coffee_shop) await claim(InvestmentTypes.CoffeeShop, user.id);
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
  try {
    const inventory = await UserCurrentInventory.findOne({ user_id: userId }) ||
                     await UserCurrentInventory.create({ user_id: userId, shelf: [] });
    const user = await User.findOne({ id: userId });

    const currentShelfIds = (inventory.shelf || []).map(item => item.id);
    const nftShelfIds = nftItemIds.filter(id => id >= 9 && id <= 38);
    const currentManagedIds = currentShelfIds.filter(id => id >= 9 && id <= 38);

    const itemsToAdd = nftShelfIds.filter(id => !currentManagedIds.includes(id)).map(id => ({ id }));
    const itemsToRemove = currentManagedIds.filter(id => !nftShelfIds.includes(id));

    if (user?.shelf?.neko && itemsToRemove.includes(user.shelf.neko)) {
      await User.updateOne({ id: userId }, { $set: { "shelf.neko": null } });
    }

    if (itemsToAdd.length) {
      await UserCurrentInventory.updateOne({ user_id: userId }, { $addToSet: { shelf: { $each: itemsToAdd } } });
    }
    if (itemsToRemove.length) {
      await UserCurrentInventory.updateOne({ user_id: userId }, { $pull: { shelf: { id: { $in: itemsToRemove } } } });
    }

    return { added: itemsToAdd, removed: itemsToRemove };
  } catch (error) {
    await log("error", `Error syncing inventory for ${userId}`, { error: error.message });
    return { added: [], removed: [] };
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

const txScanConfig = {
  processType: "TX_SCANNER",
  cronSchedule: "*/10 * * * * *",
  durationFunction: async () => {
    try {
      const mnemonic = process.env.MNEMONICS.split(" "); // Expects space-separated mnemonic
      const testnet = process.env.TESTNET === "true";
      const wallet = await openWallet(mnemonic, testnet);
      walletContract = wallet.contract;
      keyPair = wallet.keyPair;
      tonClient = wallet.client;
  
      const RECEIVING_WALLET_ADDRESS = walletContract.address.toString();
      console.log("Server wallet address:", RECEIVING_WALLET_ADDRESS);
  
      verifyAndTransferTransactions();
      unlockExpiredLocks();
    } catch (error) {
      console.error("Failed to initialize server wallet:", error);
      process.exit(1);
    }
  }
}

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
export const TxScanProcess = genericProcessScheduler("tx_scan", txScanConfig);