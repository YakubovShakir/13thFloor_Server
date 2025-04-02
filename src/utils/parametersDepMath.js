import colors from "ansi-colors"
import UserParameters from "../models/user/userParametersModel.js"
import { withTransaction } from "./dbUtils.js"
import { upUserBalance } from "./userParameters/upUserBalance.js"

export const isFullMood = (mood) => mood === 100
export const isHighMood = (mood) => mood < 100 && mood > 49
export const isMediumMood = (mood) => mood <= 49 && mood > 9
export const isLowMood = (mood) => mood <= 9 && mood >= 1
export const isCriticallyMood = (mood) => mood < 1

export const isFullEnergy = (energy, energy_capacity) =>
  (energy / energy_capacity) * 100 === 100
export const isHighEnergy = (energy, energy_capacity) => {
  const percentOutOfCapacity = (energy / energy_capacity) * 100

  return percentOutOfCapacity < 100 && percentOutOfCapacity >= 49
}
export const isMediumEnergy = (energy, energy_capacity) => {
  const percentOutOfCapacity = (energy / energy_capacity) * 100

  return percentOutOfCapacity <= 49 && percentOutOfCapacity > 9
}
export const isLowEnergy = (energy, energy_capacity) => {
  const percentOutOfCapacity = (energy / energy_capacity) * 100

  return percentOutOfCapacity <= 9 && percentOutOfCapacity >= 1
}

export const isCriticallyEnergy = (energy, energy_capacity) => {
  const percentOutOfCapacity = (energy / energy_capacity) * 100

  return percentOutOfCapacity < 1
}

export const isFullHungry = (hungry) => hungry === 100
export const isHighHungry = (hungry) => hungry < 100 && hungry > 49
export const isMeiumHungry = (hungry) => hungry <= 49 && hungry > 9
export const isLowHungry = (hungry) => hungry <= 9 && hungry >= 1
export const isCriticallyHungry = (hungry) => hungry < 1
export function canEarnOrClaim(userParameters) {
  const { hungry, mood, energy, energy_capacity } = userParameters

  return (
    !isCriticallyHungry(hungry) &&
    !isCriticallyMood(mood) &&
    !isCriticallyEnergy(energy, energy_capacity)
  )
}

export function canStartTraining(userParameters) {
  const { hungry, energy, mood } = userParameters

  return (
    !isCriticallyHungry(hungry) &&
    !isCriticallyEnergy(energy) &&
    !isFullMood(mood)
  )
}

export function canStartSleeping(userParameters) {
  const { energy, energy_capacity } = userParameters

  return !isFullEnergy(energy, energy_capacity)
}

export function canStartWorking(userParameters) {
  const { energy, energy_capacity, mood, hungry } = userParameters

  return (
    !isCriticallyEnergy(energy, energy_capacity) &&
    !isCriticallyHungry(hungry) &&
    !isCriticallyMood(mood)
  )
}

export const recalcValuesByParameters = async (
  userParameters,
  { coinsReward = 0, moodProfit = 0 }
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
      await upUserBalance(userParameters.id, adjustedCoinsReward); // Already uses withTransaction
      console.log(`[recalcValuesByParameters] balance updated with amount ${adjustedCoinsReward}`);
    }

    log("debug", colors.cyan(`Completed recalcValuesByParameters for user ${userParameters.id}`));
    return { mood: user.mood, coins: user.coins }; // Return updated values
  });
};

export function canApplyConstantEffects(userParameters) {
  console.log(
    `[canApplyConstantEffects] hit by user ${userParameters.id}, deciding...`
  )

  const { hungry, mood } = userParameters

  const isLowOrCriticalHunger =
    isLowHungry(hungry) || isCriticallyHungry(hungry)
  const isLowOrCriticalMood = isLowMood(mood) || isCriticallyMood(mood)

  const res = !(isLowOrCriticalHunger || isLowOrCriticalMood)
  console.log(
    `[canApplyConstantEffects] hit by user ${userParameters.id}, decided: ${res}`
  )

  return res
}
