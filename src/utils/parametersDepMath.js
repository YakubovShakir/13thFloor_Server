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

// Update dependent functions to use queue
export const recalcValuesByParameters = async (
  userParameters,
  { coinsReward = 0, moodProfit = 0 }
) => {
  console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}`)

  const moodUpdates = []
  if (userParameters.hungry > 59) {
    moodUpdates.push(async (session) => {
      userParameters.mood = Math.min(100, userParameters.mood + moodProfit)
      await userParameters.save({ session })
      console.log(
        `[recalcValuesByParameters] mood updated to ${userParameters.mood}`
      )
    })
  } else if (userParameters.hungry <= 59 && userParameters.hungry >= 19) {
    moodUpdates.push(async (session) => {
      userParameters.mood = Math.min(
        100,
        Math.max(0, userParameters.mood - 0.09722) + moodProfit
      )
      await userParameters.save({ session })
      console.log(
        `[recalcValuesByParameters] mood updated to ${userParameters.mood}`
      )
    })
  } else {
    moodUpdates.push(async (session) => {
      userParameters.mood = Math.min(
        100,
        Math.max(0, userParameters.mood - 0.155) + moodProfit
      )
      await userParameters.save({ session })
      console.log(
        `[recalcValuesByParameters] mood updated to ${userParameters.mood}`
      )
    })
  }

  const balanceUpdates = []
  if (userParameters.mood > 59) {
    balanceUpdates.push(
      async (session) =>
        await upUserBalance(userParameters.id, coinsReward, session)
    )
  } else if (userParameters.mood <= 59 && userParameters.mood > 19) {
    balanceUpdates.push(
      async (session) =>
        await upUserBalance(userParameters.id, coinsReward * 0.9, session)
    )
  } else if (userParameters.mood <= 19 && userParameters.mood > 1) {
    balanceUpdates.push(
      async (session) =>
        await upUserBalance(userParameters.id, coinsReward * 0.5, session)
    )
  } else if (coinsReward > 0) {
    balanceUpdates.push(
      async (session) => await upUserBalance(userParameters.id, 1, session)
    )
  }

  for (const update of [...moodUpdates, ...balanceUpdates]) {
    await queueDbUpdate(
      update,
      `recalcValuesByParameters for user ${userParameters.id}`,
      userParameters.id
    )
  }
}

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
