import process from "../models/process/processModel.js"
import UserParameters from "../models/user/userParametersModel.js"
import cron from "node-cron"
import moment from 'moment-timezone'
import { canApplyConstantEffects } from "../utils/parametersDepMath.js"
import { upUserExperience } from "../utils/userParameters/upUserBalance.js";
import { recalcValuesByParameters } from "../utils/parametersDepMath.js" // Import recalcValuesByParameters

// Models
import Work from "../models/work/workModel.js"
import TrainingParameters from "../models/training/trainingParameters.js"
import LevelsParameters from "../models/level/levelParametersModel.js"
import { ConstantEffects } from "../models/effects/constantEffectsLevels.js"
import Food from "../models/food/foodModel.js"
import Boost from "../models/boost/boostModel.js"
import UserSkill from "../models/user/userSkillModel.js";
import User from "../models/user/userModel.js"
import Investments from '../models/investments/investmentModel.js'
import { InvestmentTypes } from "../models/investments/userLaunchedInvestments.js"
import UserLaunchedInvestments from '../models/investments/userLaunchedInvestments.js'
import { upUserBalance as upUserBalance_autoclaim } from "../utils/userParameters/upUserBalance.js" // Alias to avoid naming conflict

// --- Logging Function ---
const log = async (level, message, context = {}) => {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message} ${Object.keys(context).length ? JSON.stringify(context) : ''}`;
    console.log(logMessage);
    // In the future, replace console.log with Winston or other logging library
};

// --- Helper Functions for Calculations ---

const calculateDuration = (baseDurationMinutes, durationDecreasePercentage) => {
    const baseDurationSeconds = baseDurationMinutes * 60;
    return baseDurationSeconds * (1 - durationDecreasePercentage / 100);
};

const calculatePeriodCosts = (baseParameters, processEffects, diffSeconds, costConfig) => {
    if (!costConfig) return {};
    return Object.keys(costConfig).reduce((acc, key) => {
        const config = costConfig[key];
        let costPerSecondBase;
        if (config.type === 'hourly') {
            costPerSecondBase = baseParameters[config.baseValueKey] / 3600;
        } else if (config.type === 'per_minute') {
            costPerSecondBase = baseParameters[config.baseValueKey] / 60;
        }
        let effectDecrease = processEffects?.[config.effectDecreaseKey] || 0;
        let cost = costPerSecondBase * diffSeconds * ((100 - (effectDecrease !== null ? effectDecrease : 0)) / 100);
        acc[key] = cost;
        return acc;
    }, {});
};


const calculatePeriodProfits = (baseParameters, processEffects, diffSeconds, profitConfig) => {
    if (!profitConfig) return {};

    return Object.keys(profitConfig).reduce((acc, key) => {
        const config = profitConfig[key];
        let profitPerSecondBase;
         if (config.type === 'hourly') {
            profitPerSecondBase = baseParameters[config.baseValueKey] / 3600; // Assuming hourly profit still needs /3600 if tick is in seconds
        } else if (config.type === 'per_minute') {
            profitPerSecondBase = baseParameters[config.baseValueKey] / 60;
        } else { // Default to per second if type is not specified, or explicitly 'per_second' could be added if needed
            profitPerSecondBase = baseParameters[config.baseValueKey]; // Assuming already per second, or constant per tick
        }
        let effectIncrease = processEffects?.[config.effectIncreaseKey] || 0;
        let profit = profitPerSecondBase * diffSeconds * ((100 + (effectIncrease !== null ? effectIncrease : 0)) / 100);
        acc[key] = profit;
        return acc;
    }, {});
};


const recalcValuesProcessTypeWhitelist = ['work', 'training', 'sleep'];

const applyUserParameterUpdates = async (userParameters, periodCosts, periodProfits, processType = null) => {
    Object.keys(periodCosts).forEach(key => {
        userParameters[key] = Math.max(0, userParameters[key] - periodCosts[key]);
    });
    Object.keys(periodProfits).forEach(key => {
        if (key === 'energy') {
            // Energy is capped by energy_capacity
            userParameters[key] = Math.min(userParameters.energy_capacity, userParameters[key] + periodProfits[key]);
        } else if (key === 'mood' || key === 'hungry') {
            // Mood and hungry are capped at 100
            userParameters[key] = Math.min(100, userParameters[key] + periodProfits[key]);
        } else if (userParameters[key] !== undefined) {
            // For other parameters (if any in future), no cap or handle differently if needed
            userParameters[key] = userParameters[key] + periodProfits[key];
        }
    });

    if(recalcValuesProcessTypeWhitelist.includes(processType)) {
        await recalcValuesByParameters(userParameters, { coinsReward: 0 })
        return 
    }

    await userParameters.save()
};


// --- Core Process Duration Handler (more modular) ---
const processDurationHandler = async (process, userParameters, baseParameters, processConfig) => {
    const {
        durationDecreaseKey,
        costConfig,
        profitConfig,
        rewardCalculation,
        finishConditionCheck,
        updateUserParamsOnTick,
        onProcessCompletion,
        baseDurationKey = 'duration',
        processType
    } = processConfig;

    try {
        const canUsePerks = canApplyConstantEffects(userParameters);
        let durationDecreasePercentage = 0;
        if (canUsePerks && process.effects) {
            await log('info', `User can use perks`, { userId: userParameters.id, processType: processType, processId: process._id });
            durationDecreasePercentage = process.effects[durationDecreaseKey] || 0;
        }

        const baseDurationMinutes = baseParameters[baseDurationKey] || 1;
        const actualDurationSeconds = calculateDuration(baseDurationMinutes, durationDecreasePercentage);

        const now = moment();
        const lastUpdateTime = moment(process.user_parameters_updated_at || process.updatedAt);
        const diffSeconds = now.diff(lastUpdateTime, 'seconds');
        const processDurationSeconds = now.diff(moment(process.createdAt), 'seconds');

        const remainingSeconds = Math.max(0, actualDurationSeconds - processDurationSeconds);
        const remainingMinutes = Math.floor(remainingSeconds / 60);
        const remainingSecondsAfterMinutes = remainingSeconds % 60;

        process.duration = remainingMinutes;
        process.seconds = remainingSecondsAfterMinutes;


        const periodCosts = calculatePeriodCosts(baseParameters, process.effects, diffSeconds, costConfig);
        const periodProfits = calculatePeriodProfits(baseParameters, process.effects, diffSeconds, profitConfig);


        const canContinue = Object.keys(periodCosts).every(key => Math.floor(userParameters[key]) >= periodCosts[key]);


        if (canContinue) {
            await applyUserParameterUpdates(userParameters, periodCosts, periodProfits, process.type);

            if (updateUserParamsOnTick) {
                updateUserParamsOnTick(userParameters, periodProfits, baseParameters, diffSeconds); // Pass diffSeconds if needed for tick logic
            }

            if (processDurationSeconds >= actualDurationSeconds || finishConditionCheck?.(userParameters, periodCosts, baseParameters, process)) {
                if (onProcessCompletion) {
                    await onProcessCompletion(process, userParameters, baseParameters); // Reward calc inside completion now
                }
                await log('info', `${processType} process finished`, { userId: userParameters.id, processType: processType, processId: process._id });
                await process.deleteOne({ _id: process._id });
                return;
            }

            process.user_parameters_updated_at = now.toDate();
            await process.save();

        } else {
            await log('info', `${processType} process ended - insufficient resources`, { userId: userParameters.id, processType: processType, processId: process._id, costs: periodCosts, userResources: {energy: userParameters.energy, hungry: userParameters.hungry, mood: userParameters.mood } }); // Enhanced logging with resource context
            await process.deleteOne({ _id: process._id });
        }
        await userParameters.save();

    } catch (error) {
        await log('error', `Error in ${processType} process duration handler`, { processId: process._id, error: error.message, stack: error.stack });
    }
};


// --- Generic Process Scheduler ---
const genericProcessScheduler = (processType, processConfig) => {
    const { cronSchedule, durationFunction, Model, getTypeSpecificParams } = processConfig;

    return cron.schedule(
        cronSchedule,
        async () => {
            try {
                await log('verbose', `${processType} process scheduler started iteration`);
                const processes = await process.find({ type: processType });

                for (let process of processes) {
                    const userParameters = await UserParameters.findOne({ id: process.id });
                    const baseParameters = await Model.findOne(getTypeSpecificParams(process));

                    if (!userParameters || !baseParameters) {
                        await log('error', `${processType} process error: base parameters or userParameters not found`, { processId: process._id });
                        continue;
                    }
                    await durationFunction(process, userParameters, baseParameters, processConfig);
                }
                await log('verbose', `${processType} process scheduler finished iteration`, { processesCount: processes.length });
            } catch (e) {
                await log('error', `Error in ${processType} Process:`, { error: e.message, stack: e.stack });
            }
        },
        {
            scheduled: false,
        }
    );
};


// --- Process Configurations ---

const workProcessConfig = {
    processType: 'work',
    cronSchedule: '*/10 * * * * * *',
    Model: Work,
    durationFunction: processDurationHandler,
    getTypeSpecificParams: (process) => ({ work_id: process.type_id }),
    durationDecreaseKey: 'duration_decrease',
    rewardIncreaseKey: 'reward_increase',
    costConfig: {
        mood: { type: 'hourly', baseValueKey: 'mood_cost_in_hour' },
        hungry: { type: 'hourly', baseValueKey: 'hungry_cost_in_hour' },
        energy: { type: 'hourly', baseValueKey: 'energy_cost_in_hour' }
    },
    rewardCalculation: (work, rewardIncreaseHourly, actualWorkDuration, baseWorkDuration) => { //Example still in config for reference, but moved to onProcessCompletion below
        return (work.coins_in_hour + rewardIncreaseHourly) / 3600 * baseWorkDuration;
    },
    onProcessCompletion: async (process, userParameters, baseParameters) => {
        const rewardIncreaseHourly = process.effects?.reward_increase || 0;
        const coinsReward = (baseParameters.coins_in_hour + rewardIncreaseHourly) / 3600 * (baseParameters.duration * 60); //Use baseDuration for reward
        await recalcValuesByParameters(userParameters, { coinsReward }); // REMOVED
        await upUserExperience(userParameters.id, baseParameters.experience_reward);
    },
};


const trainingProcessConfig = {
    processType: 'training',
    cronSchedule: '*/10 * * * * *',
    Model: TrainingParameters,
    durationFunction: processDurationHandler,
    getTypeSpecificParams: (process) => ({ level: process.type_id }),
    durationDecreaseKey: 'duration_decrease', // Not used in training logic, but kept for consistency
    rewardIncreaseKey: 'reward_increase',     // Not used in training logic, but kept for consistency
    costConfig: {
        energy: { type: 'per_minute', baseValueKey: 'energy_spend', effectDecreaseKey: 'energy_cost_decrease' },
        hungry: { type: 'per_minute', baseValueKey: 'hungry_spend', effectDecreaseKey: 'hunger_cost_decrease' }
    },
    profitConfig: {
        mood: { type: 'per_minute', baseValueKey: 'mood_profit', effectIncreaseKey: 'mood_increase' }
    },
    finishConditionCheck: (userParameters) => {
        return userParameters.energy <= 0 || userParameters.hungry <= 0;
    },
    onProcessCompletion: async (process, userParameters, baseParameters) => {
        // await recalcValuesByParameters(userParameters, { moodProfit: 0 }); // REMOVED
    },
    // updateUserParamsOnTick: Not needed anymore as mood profit is handled in `applyUserParameterUpdates`
    baseDurationKey: 'duration',
};


const sleepProcessConfig = {
    processType: 'sleep',
    cronSchedule: '*/10 * * * * *',
    Model: LevelsParameters,
    durationFunction: processDurationHandler,
    getTypeSpecificParams: (process) => ({ level: process.type_id }),
    profitConfig: {
        energy: { type: 'per_minute', baseValueKey: 'energy_capacity' } // Using per_minute as sleep duration is in minutes
    },
    updateUserParamsOnTick: (userParameters, periodProfits, baseParameters, diffSeconds) => {
        // Energy restore is now handled by `applyUserParameterUpdates` through profitConfig
        // No need for explicit update here unless there's other tick-based logic
    },
    finishConditionCheck: (userParameters) => {
        return userParameters.energy === userParameters.energy_capacity;
    },
    onProcessCompletion: async (process, userParameters, baseParameters) => {
        // await recalcValuesByParameters(userParameters, { moodProfit: 0 }); // REMOVED
    },
    baseDurationKey: 'sleep_duration',
};


const skillProcessConfig = {
    processType: 'skill',
    cronSchedule: '*/10 * * * * *',
    Model: ConstantEffects,
    durationFunction: processDurationHandler,
    getTypeSpecificParams: (process) => ({ id: process.type_id }),
    onProcessCompletion: async (process, userParameters, baseParameters) => {
        const userId = process.id;
        const skillId = process.type_id;
        if (process.sub_type === 'constant_effects') {
            const effect = baseParameters;
            userParameters.constant_effects_levels[effect.type] = effect.level;
            await upUserExperience(userId, effect.experience_reward);
        } else {
            await upUserExperience(userId, baseParameters.experience_reward);
            await UserSkill.create({
                id: userId,
                skill_id: skillId,
            });
        }
        // await recalcValuesByParameters(userParameters, { moodProfit: 0 }); // REMOVED
    },
    baseDurationKey: 'base_duration_in_seconds',
};


const foodProcessConfig = {
    processType: 'food',
    cronSchedule: '*/10 * * * * *', // Every second
    Model: Food,
    durationFunction: processDurationHandler, // Still using handler structure, but process is near instant
    getTypeSpecificParams: (process) => ({ food_id: process.type_id }),
    processIntervalSeconds: 1,
    onProcessCompletion: async (process, userParameters, baseParameters) => { // Completion logic is the immediate effect
        const food = baseParameters;
        const profits = {};
        if (food?.long_hungry_restore?.value) profits.hungry = (food.long_hungry_restore.value / 60) * 60;
        if (food?.long_mood_restore?.value) profits.mood = (food.long_mood_restore.value / 60) * 60;
        if (food?.long_energy_restore?.value) profits.energy = (food.long_energy_restore.value / 60) * 60;

        applyUserParameterUpdates(userParameters, {}, profits); // Apply profits directly, no costs in food process
        // await recalcValuesByParameters(userParameters, { moodProfit: food?.short_mood_restore?.value || 0 }); // REMOVED - Short mood restore is now handled dynamically by recalc in applyUserParams
    },
};


const boostProcessConfig = {
    processType: 'boost',
    cronSchedule: '*/10 * * * * *',
    Model: Boost,
    durationFunction: processDurationHandler,
    getTypeSpecificParams: (process) => ({ boost_id: process.type_id }),
    processIntervalSeconds: 10,
    profitConfig: { // Using profit config for energy boost from tonic drink
        energy: { type: 'per_minute', baseValueKey: 'energy_capacity'} // "Profit" here means restoration toward capacity
    },
    updateUserParamsOnTick: (userParameters, periodProfits, baseParameters, diffSeconds) => {
        if (baseParameters.type === "tonic-drink") {
            // Energy restoration is now handled by profitConfig and `applyUserParameterUpdates`
        }
        // personal-training type boost doesn't have tick logic here
    },
    finishConditionCheck: (userParameters, periodCosts, baseParameters, process) => {
        const boostDurationSeconds = calculateDuration(baseParameters.duration, 0); // No duration decrease for boosts themselves in current logic
        const processDurationSeconds = moment().diff(moment(process.createdAt), 'seconds');
        return processDurationSeconds >= boostDurationSeconds;
    },
    onProcessCompletion: async (process, userParameters, baseParameters) => {
         // await recalcValuesByParameters(userParameters, { moodProfit: 0 }); // REMOVED
    },
    baseDurationKey: 'duration', // Boost duration in minutes
};

const claim = async (investment_type, userId) => {
    try {
        if(!Object.values(InvestmentTypes).includes(investment_type)) {
            await log('warn', `Invalid investment type`, { investment_type, userId });
            return;
        }

        const user = await User.findOne({ id: userId }, { investment_levels: 1 });
        const userParams = await UserParameters.findOne({ id: userId });
        const userInvestmentLevel = user.investment_levels[investment_type];
        const investmentsOfType = (await Investments.find({ type: investment_type }, { id: 1 })).map(item => item.id);
        const investmentToClaim = await UserLaunchedInvestments.findOne({ user_id: userId, investment_id: { $in: investmentsOfType } }, null, { sort: { createdAt: -1 } });

        if(!investmentToClaim || investmentToClaim.claimed) {
            await log('debug', `No claimable investment found or already claimed`, { userId, investment_type, investmentId: investmentToClaim?.investment_id });
            return;
        }

        const investment = await Investments.findOne({ type: investment_type, level: userInvestmentLevel });
        if (!investment) {
            await log('error', `Investment definition not found`, { investment_type, userInvestmentLevel, userId });
            return;
        }

        // Make claimable in 30 sec on test, 1 hour otherwise
        const claimableTime = process.env.NODE_ENV === 'test' ? 30000 : 3600000;
        if(Date.now() - new Date(investmentToClaim.createdAt).getTime() < claimableTime) {
            await log('debug', `Investment not yet claimable`, { userId, investment_type, investmentId: investmentToClaim.investment_id, timeRemainingMs: claimableTime - (Date.now() - new Date(investmentToClaim.createdAt).getTime()) });
            return;
        }

        await upUserBalance_autoclaim(userId, investmentToClaim.to_claim);
        await upUserExperience(userId, investment.experience_reward);

        investmentToClaim.claimed = true;
        await investmentToClaim.save();

        await ( new UserLaunchedInvestments({ user_id: userId, investment_id: investment.id, to_claim: investment.coins_per_hour }) ).save();

        await userParams.save(); // Although userParams might not be directly modified in claim, it's good practice to save in case `upUserBalance` or `upUserExperience` modifies it.
        // await recalcValuesByParameters(userParameters, { coinsReward:  investmentToClaim.to_claim}); // REMOVED - Recalc is now done dynamically in applyUserParameterUpdates

        await log('info', `Successfully auto-claimed investment`, { userId, investment_type, investmentId: investmentToClaim.investment_id, claimedAmount: investmentToClaim.to_claim, experienceReward: investment.experience_reward });


    } catch (error) {
        await log('error', `Error during investment claim process`, { userId, investment_type, error: error.message, stack: error.stack });
    }
}

const autoclaimProcessConfig = {
    processType: 'autoclaim',
    cronSchedule: "*/1 * * * * *", // Every minute - Adjusted from original 'every 5 sec' to 'every minute' as '*/1 * * * * *' is every minute, '*/5 * * * * *' would be every 5 minutes. Assuming 'every 1 min' was intended.
    durationFunction: async () => { // This is a dummy durationFunction as autoclaim doesn't use process duration logic.
        try {
            await log('verbose', `Autoclaim process scheduler started iteration`);
            let usersWithAutoclaim = await User.find({
                $or: [
                    { "has_autoclaim.game_center": true },
                    { "has_autoclaim.zoo_shop": true },
                    { "has_autoclaim.coffee_shop": true }
                ]
            });

            let usersProcessed = 0;
            let claimsMade = 0;

            for (let user of usersWithAutoclaim) {
                usersProcessed++;
                const { has_autoclaim: { game_center = false, zoo_shop = false, coffee_shop = false } } = user;

                const claim_promises = [];
                if(game_center) {
                    claim_promises.push(claim(InvestmentTypes.GameCenter, user.id));
                }
                if(zoo_shop) {
                    claim_promises.push(claim(InvestmentTypes.ZooShop, user.id));
                }
                if(coffee_shop) {
                    claim_promises.push(claim(InvestmentTypes.CoffeeShop, user.id));
                }

                const results = await Promise.all(claim_promises);
                claimsMade += results.filter(result => result !== undefined).length; // Count successful claims (non-undefined results)
            }
            await log('verbose', `Autoclaim process scheduler finished iteration`, { usersEligible: usersWithAutoclaim.length, usersProcessed, claimsMade });

        } catch (e) {
            await log('error', "Error in autoclaim process", { error: e.message, stack: e.stack });
        }
    },
    Model: User, // Although not directly used in durationFunction, needed for generic scheduler structure, can be a placeholder Model if truly unused.
    getTypeSpecificParams: () => ({}), // No type-specific parameters needed for user query in this process.
};


// --- Process Schedulers ---
export const WorkProcess = genericProcessScheduler('work', workProcessConfig);
export const TrainingProccess = genericProcessScheduler('training', trainingProcessConfig);
export const SleepProccess = genericProcessScheduler('sleep', sleepProcessConfig);
export const SkillProccess = genericProcessScheduler('skill', skillProcessConfig);
export const FoodProccess = genericProcessScheduler('food', foodProcessConfig);
export const BoostProccess = genericProcessScheduler('boost', boostProcessConfig);
export const AutoclaimProccess = genericProcessScheduler('autoclaim', autoclaimProcessConfig);