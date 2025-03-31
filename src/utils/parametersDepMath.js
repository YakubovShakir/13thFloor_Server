import { queueDbUpdate } from "../gameTimer/universal.js"
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
  
    const jobIds = [];
  
    // Mood updates
    let moodChange = moodProfit; // Base profit
    if (userParameters.hungry > 49) {
      // No penalty, just apply moodProfit
    } else if (userParameters.hungry <= 49 && userParameters.hungry >= 9) {
      moodChange = Math.max(0, -0.09722) + moodProfit; // Apply penalty + profit
    } else {
      moodChange = Math.max(0, -0.155) + moodProfit; // Apply larger penalty + profit
    }
  
    if (moodChange !== 0) {
      const moodJobId = await queueDbUpdate(
        'applyUserParameterUpdates',
        {
          userParametersId: userParameters.id,
          periodCosts: {}, // No costs here
          periodProfits: { mood: moodChange },
          processType: 'recalc_mood',
        },
        `Update mood for user ${userParameters.id}`,
        userParameters.id
      );
      jobIds.push(moodJobId);
      console.log(`[recalcValuesByParameters] Enqueued mood update with change ${moodChange}`);
    }
  
    // Balance updates
    let adjustedCoinsReward = coinsReward;
    if (userParameters.mood > 49) {
      adjustedCoinsReward = coinsReward; // Full reward
    } else if (userParameters.mood <= 49 && userParameters.mood > 9) {
      adjustedCoinsReward = coinsReward * 0.9; // 90% reward
    } else if (userParameters.mood <= 9 && userParameters.mood > 1) {
      adjustedCoinsReward = coinsReward * 0.5; // 50% reward
    } else if (coinsReward > 0) {
      adjustedCoinsReward = 1; // Minimum reward
    }
  
    if (adjustedCoinsReward !== 0) {
      const balanceJobId = await queueDbUpdate(
        'updateUserBalance',
        {
          userParametersId: userParameters.id,
          amount: adjustedCoinsReward,
        },
        `Update balance for user ${userParameters.id}`,
        userParameters.id
      );
      jobIds.push(balanceJobId);
      console.log(`[recalcValuesByParameters] Enqueued balance update with amount ${adjustedCoinsReward}`);
    }
  
    await log("debug", colors.cyan(`Enqueued updates in recalcValuesByParameters for user ${userParameters.id}`), { jobIds });
    return jobIds; // Return job IDs for tracking if needed
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
