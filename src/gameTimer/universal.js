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

const calculateDuration = (baseDurationMinutes, durationDecreasePercentage) =>
  baseDurationMinutes * 60 * (1 - durationDecreasePercentage / 100);

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

const getNekoBoostMultiplier = async (userId) => {
  const boost = await ActiveEffectsModel.findOne({
    $or: [{ user_id: userId }, { triggered_by: userId }],
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
    costConfig,
    profitConfig,
    finishConditionCheck,
    updateUserParamsOnTick,
    onProcessCompletion,
    baseDurationKey = "duration",
    processType,
  } = processConfig;

  try {
    let durationDecreasePercentage = 0;
    let combinedEffects = {};

    const userInventory = await UserCurrentInventory.findOne({ user_id: process.id });
    const user = await User.findOne({ id: process.id }, { "personage.clothes": 1 });

    log("debug", colors.cyan(`Collecting effects for ${processType} (processId: ${process._id})`));
    
    if (userInventory?.shelf?.length) {
      const shelfItems = await ShelfItemModel.find({ id: { $in: userInventory.shelf.map(s => s.id) } });
      shelfItems.forEach(item => {
        if (item.effects) {
          log("debug", `${colors.cyan(`Shelf item effects`)}: ${JSON.stringify(item.effects)}`);
          mergeEffects(combinedEffects, item.effects);
        }
      });
    }

    if (user?.personage?.clothes?.length) {
      const clothing = await Clothing.find({ clothing_id: { $in: user.personage.clothes } });
      clothing.forEach(item => {
        if (item.effects) {
          log("debug", `${colors.cyan(`Clothing effects`)}: ${JSON.stringify(item.effects)}`);
          mergeEffects(combinedEffects, item.effects);
        }
      });
    }

    if (process.effects && process.type !== "boost") {
      log("debug", `${colors.cyan(`Process effects`)}: ${JSON.stringify(process.effects)}`);
      mergeEffects(combinedEffects, process.effects);
    }

    log("debug", `${colors.cyan(`Final combinedEffects`)}: ${JSON.stringify(combinedEffects)}`);

    const canApplyEffects = canApplyConstantEffects(userParameters);
    log("debug", colors.cyan(`canApplyConstantEffects check for ${processType} (userId: ${userParameters.id}): ${canApplyEffects}`));

    let effectEntries = [];
    Object.entries(combinedEffects).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(effect => {
          const entry = {
            key,
            value: effect.value,
            targetKey: effect.param || key,
          };
          effectEntries.push(entry);
          log("debug", `${colors.magenta(`Parsed effect: ${key}`)} -> target: ${entry.targetKey}, value: ${entry.value}`);
        });
      } else {
        const match = key.match(/^(cant_fall_below_percent|profit_hourly_percent|profit_hourly_fixed|cost_hourly_percent|profit_per_tick_fixed|cost_per_tick_fixed)_(.+)$/);
        const entry = {
          key: match ? match[1] : key,
          value,
          targetKey: match ? match[2] : key,
        };
        effectEntries.push(entry);
        log("debug", `${colors.magenta(`Parsed effect: ${key}`)} -> target: ${entry.targetKey}, value: ${entry.value}`);
      }
    });

    if (!canApplyEffects) {
      effectEntries = effectEntries.filter(entry => 
        !["cant_fall_below_percent", "profit_hourly_percent", "profit_hourly_fixed", "cost_hourly_percent", "profit_per_tick_fixed", "cost_per_tick_fixed"].includes(entry.key)
      );
      log("info", colors.yellow(`Constant effects filtered out for ${processType} due to canApplyConstantEffects=false`));
    }

    if (canApplyEffects && durationDecreaseKey in combinedEffects) {
      const effects = Array.isArray(combinedEffects[durationDecreaseKey]) ? combinedEffects[durationDecreaseKey] : [{ value: combinedEffects[durationDecreaseKey] }];
      durationDecreasePercentage = effects.reduce((sum, effect) => sum + (effect.value || 0), 0) || 0;
      log("debug", `${colors.cyan(`Duration decrease for ${processType}`)}: ${durationDecreasePercentage}% from ${durationDecreaseKey}`);
    } else {
      log("debug", colors.yellow(`No duration decrease applied for ${processType}: canApply=${canApplyEffects}, key=${durationDecreaseKey in combinedEffects}`));
    }

    const baseDurationMinutes = baseDurationKey === "base_duration_in_seconds"
      ? (process.target_duration_in_seconds || process[baseDurationKey]) / 60
      : baseParameters[baseDurationKey] || 1;
    const actualDurationSeconds = calculateDuration(baseDurationMinutes, durationDecreasePercentage);

    const now = moment();
    const lastUpdateTime = moment(process.user_parameters_updated_at || process.updatedAt);
    const diffSeconds = now.diff(lastUpdateTime, "seconds");
    const processDurationSeconds = now.diff(moment(process.createdAt), "seconds");

    log("debug", colors.cyan(`Starting cost/profit calc for ${processType} (processId: ${process._id}) over ${diffSeconds}s, mood: ${userParameters.mood}`));
    
    // Step 1: Calculate initial process costs and profits
    const periodCosts = calculatePeriodCosts(baseParameters, combinedEffects, diffSeconds, costConfig, effectEntries, userParameters);
    const periodProfits = calculatePeriodProfits(baseParameters, combinedEffects, diffSeconds, profitConfig, effectEntries);

    const additionalCosts = {};
    const additionalProfits = {};
    effectEntries.forEach(entry => {
      const { key, value, targetKey } = entry;
      if (!value || !targetKey) return;

      switch (key) {
        case "profit_hourly_percent":
          const currentValue = userParameters[targetKey] || 0;
          const capacity = baseParameters[`${targetKey}_capacity`] || 100;
          log("debug", colors.cyan(`Calculating ${targetKey} profit: current=${currentValue}, capacity=${capacity}, value=${value}`));
          const profitBase = (currentValue / capacity) * value; // e.g., (50 / 100) * 10 = 5
          const hourlyProfit = (profitBase / 3600) * diffSeconds; // Prorate hourly
          additionalProfits[targetKey] = (additionalProfits[targetKey] || 0) + hourlyProfit;
          log("info", `${colors.green(`Additional profit ${targetKey} from ${key}`)}: +${hourlyProfit.toFixed(2)} (${value}%)`);
          break;
        case "profit_hourly_fixed":
          additionalProfits[targetKey] = (additionalProfits[targetKey] || 0) + (value / 3600) * diffSeconds;
          log("info", `${colors.green(`Additional profit ${targetKey} from ${key}`)}: +${((value / 3600) * diffSeconds).toFixed(2)}`);
          break;
        case "profit_per_tick_fixed":
          additionalProfits[targetKey] = (additionalProfits[targetKey] || 0) + value;
          log("info", `${colors.green(`Additional profit ${targetKey} from ${key}`)}: +${value.toFixed(2)}`);
          break;
        case "cost_hourly_percent":
          const hourlyBaseCost = (baseParameters[`${targetKey}_cost_per_minute`] || 0) / 3600 * diffSeconds;
          additionalCosts[targetKey] = (additionalCosts[targetKey] || 0) + hourlyBaseCost * (value / 100);
          log("info", `${colors.red(`Additional cost ${targetKey} from ${key}`)}: +${(hourlyBaseCost * (value / 100)).toFixed(2)} (${value}%)`);
          break;
        case "cost_per_tick_fixed":
          additionalCosts[targetKey] = (additionalCosts[targetKey] || 0) + value;
          log("info", `${colors.red(`Additional cost ${targetKey} from ${key}`)}: +${value.toFixed(2)}`);
          break;
      }
    });

    // Step 3: Calculate Neko profit
    const nekoMultiplier = await getNekoBoostMultiplier(userParameters.id);
    const nekoTargetParam = "energy"; // Adjust to 'coins' or whatever Neko boosts
    const nekoBase = (baseParameters[`${nekoTargetParam}_base`] || 0) / 3600 * diffSeconds;
    const nekoProfit = nekoBase * (nekoMultiplier - 1);
    if (nekoProfit > 0) {
      additionalProfits[nekoTargetParam] = (additionalProfits[nekoTargetParam] || 0) + nekoProfit;
      log("info", `${colors.green(`Neko profit ${nekoTargetParam}`)}: +${nekoProfit.toFixed(2)} (${((nekoMultiplier - 1) * 100).toFixed(0)}%)`);
    }
    
    // Step 4: Combine all costs and profits
    const finalCosts = { ...periodCosts };
    for (const [key, cost] of Object.entries(additionalCosts)) {
      finalCosts[key] = (finalCosts[key] || 0) + cost;
    }
    const finalProfits = { ...periodProfits };
    for (const [key, profit] of Object.entries(additionalProfits)) {
      finalProfits[key] = (finalProfits[key] || 0) + profit;
    }

    // Step 5: Check if we can continue
    const canContinue = Object.keys(finalCosts).every(key => {
      const available = Math.floor(userParameters[key] || 0);
      const cost = finalCosts[key];
      const ok = available >= cost;
      if (!ok) log("warn", colors.yellow(`Insufficient ${key}: ${available} < ${cost}`));
      return ok;
    });

    if (canContinue) {
      if (process.type !== "boost") {
        // Step 6: Apply all changes at once
        for (const [key, cost] of Object.entries(finalCosts)) {
          userParameters[key] = Math.max(0, (userParameters[key] || 0) - cost);
        }
        for (const [key, profit] of Object.entries(finalProfits)) {
          userParameters[key] = (userParameters[key] || 0) + profit;
        }
        await userParameters.save();
        log("info", colors.cyan(`Updated params - mood: ${userParameters.mood}, finalCosts: ${JSON.stringify(finalCosts)}, finalProfits: ${JSON.stringify(finalProfits)}`));
      }

      if (updateUserParamsOnTick) {
        updateUserParamsOnTick(userParameters, finalProfits, baseParameters, diffSeconds);
      }

      if (processDurationSeconds >= actualDurationSeconds || finishConditionCheck?.(userParameters, finalCosts, baseParameters, process)) {
        if (onProcessCompletion) await onProcessCompletion(process, userParameters, baseParameters);
        await log("info", `${colors.green(`${processType} process finished`)}`, { userId: userParameters.id, processType, processId: process._id });
        await gameProcess.deleteOne({ _id: process._id });
        return;
      }

      process.user_parameters_updated_at = now.toDate();
      await process.save();
    } else {
      await log("info", `${colors.yellow(`${processType} process ended - insufficient resources`)}`, {
        userId: userParameters.id,
        processType,
        processId: process._id,
        costs: finalCosts,
        available: { ...userParameters },
      });
      await gameProcess.deleteOne({ _id: process._id });
    }
    await userParameters.save();
  } catch (error) {
    await log("error", `${colors.red(`Error in ${processType} process duration handler`)}`, {
      processId: process._id,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

const calculatePeriodCosts = (baseParameters, processEffects, diffSeconds, costConfig, effectEntries, userParameters) => {
  if (!costConfig) {
    log("debug", colors.yellow("No costConfig provided, returning empty costs"));
    return {};
  }

  const costModifiers = {};
  for (const entry of effectEntries || []) {
    if (entry.key === "cant_fall_below_percent") {
      costModifiers[entry.targetKey] = {
        minPercent: entry.value || 0,
        maxValue: baseParameters[`${entry.targetKey}_capacity`] || 100,
      };
      log("debug", `${colors.magenta("Effect 'cant_fall_below_percent'")} applied to ${entry.targetKey}: min ${entry.value}% of ${costModifiers[entry.targetKey].maxValue}`);
    }
  }

  return Object.keys(costConfig).reduce((acc, key) => {
    const config = costConfig[key];
    let costPerSecondBase =
      config.type === "hourly"
        ? (baseParameters[config.baseValueKey] || 0) / 3600
        : (baseParameters[config.baseValueKey] || 0) / 60;
    
    log("debug", `${colors.cyan(`Calculating base cost for ${key}`)}: ${costPerSecondBase.toFixed(4)}/s from ${config.baseValueKey}=${baseParameters[config.baseValueKey] || 0} over ${config.type === "hourly" ? "3600s" : "60s"}`);

    let effectDecrease = processEffects?.[config.effectDecreaseKey] || 0;
    let baseCost = costPerSecondBase * diffSeconds * ((100 - effectDecrease) / 100);
    log("debug", `${colors.cyan(`Base cost for ${key}`)}: ${baseCost.toFixed(2)} (${costPerSecondBase.toFixed(4)} * ${diffSeconds}s * ${(100 - effectDecrease) / 100})`);

    if (costModifiers[key]) {
      const { minPercent, maxValue } = costModifiers[key];
      if (minPercent && maxValue) {
        const minValue = (minPercent / 100) * maxValue;
        const currentValue = userParameters[key] || 0;
        const potentialNewValue = currentValue - baseCost;
        log("debug", `${colors.cyan(`Checking ${key} limit`)}: current=${currentValue}, potential=${potentialNewValue.toFixed(2)}, min=${minValue}`);
        if (potentialNewValue < minValue) {
          const oldCost = baseCost;
          baseCost = Math.max(0, currentValue - minValue);
          log("warn", `${colors.yellow(`Limited ${key} cost`)}: Reduced from ${oldCost.toFixed(2)} to ${baseCost.toFixed(2)} to keep ${key} ≥ ${minValue} (current: ${currentValue}, ${minPercent}% of ${maxValue})`);
        } else {
          log("debug", `${colors.cyan(`${key} cost check`)}: ${potentialNewValue.toFixed(2)} ≥ ${minValue}, no limit applied (current: ${currentValue})`);
        }
      }
    }

    acc[key] = Math.max(0, baseCost);
    log("info", `${colors.red(`Final process cost for ${key}`)}: ${acc[key].toFixed(2)} subtracted`);
    return acc;
  }, {});
};

const calculatePeriodProfits = (baseParameters, processEffects, diffSeconds, profitConfig, effectEntries) => {
  if (!profitConfig) {
    log("debug", colors.yellow("No profitConfig provided, returning empty profits"));
    return {};
  }

  return Object.keys(profitConfig).reduce((acc, key) => {
    const config = profitConfig[key];
    let profitPerSecondBase =
      config.type === "hourly"
        ? (baseParameters[config.baseValueKey] || 0) / 3600
        : config.type === "per_minute"
        ? (baseParameters[config.baseValueKey] || 0) / 60
        : config.type === "progressive"
        ? (baseParameters[config.baseValueKey] || 0) / (baseParameters[config.baseDurationKey] * 60)
        : (baseParameters[config.baseValueKey] || 0);
    
    log("debug", `${colors.cyan(`Calculating base profit for ${key}`)}: ${profitPerSecondBase.toFixed(4)}/s from ${config.baseValueKey}=${baseParameters[config.baseValueKey] || 0} over ${config.type === "hourly" ? "3600s" : config.type === "per_minute" ? "60s" : "duration"}`);

    let effectIncrease = processEffects?.[config.effectIncreaseKey] || 0;
    let baseProfit = profitPerSecondBase * diffSeconds * ((100 + effectIncrease) / 100);
    log("debug", `${colors.cyan(`Base profit for ${key}`)}: ${baseProfit.toFixed(2)} (${profitPerSecondBase.toFixed(4)} * ${diffSeconds}s * ${(100 + effectIncrease) / 100})`);

    acc[key] = baseProfit;
    log("info", `${colors.green(`Final process profit for ${key}`)}: ${acc[key].toFixed(2)} added`);
    return acc;
  }, {});
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
        const baseParameters = await Model.findOne(getTypeSpecificParams(process));

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
  onProcessCompletion: async (process, userParameters, baseParameters) => {
    const nekoBoostMultiplier = await getNekoBoostMultiplier(userParameters.id);
    const baseCoinsReward = (baseParameters.coins_in_hour / 3600) * (baseParameters.duration * 60);
    const coinsReward = baseCoinsReward * nekoBoostMultiplier;
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
  finishConditionCheck: (userParameters) => userParameters.energy <= 0 || userParameters.hungry <= 0,
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
  finishConditionCheck: (userParameters) => userParameters.energy === userParameters.energy_capacity,
};

const skillProcessConfig = {
  processType: "skill",
  cronSchedule: "*/10 * * * * *",
  Model: ConstantEffects,
  durationFunction: processDurationHandler,
  getTypeSpecificParams: (process) => ({ id: process.type_id }),
  baseDurationKey: "base_duration_in_seconds",
  onProcessCompletion: async (process, userParameters, baseParameters) => {
    const userId = process.id;
    const skillId = process.type_id;
    if (process.sub_type === "constant_effects") {
      userParameters.constant_effects_levels[baseParameters.type] = baseParameters.level;
      await upUserExperience(userId, baseParameters.experience_reward);
      await userParameters.save();
    } else {
      await upUserExperience(userId, baseParameters.experience_reward);
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
    const profits = {};
    if (baseParameters?.long_hungry_restore?.value) profits.hungry = (baseParameters.long_hungry_restore.value / 60) * 60;
    if (baseParameters?.long_mood_restore?.value) profits.mood = (baseParameters.long_mood_restore.value / 60) * 60;
    if (baseParameters?.long_energy_restore?.value) profits.energy = (baseParameters.long_energy_restore.value / 60) * 60;
    await applyUserParameterUpdates(userParameters, {}, profits);
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