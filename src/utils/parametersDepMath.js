import { upUserBalance } from "./userParameters/upUserBalance.js";

export const isFullMood = (mood) => mood === 100;
export const isHighMood = (mood) => mood < 100 && mood > 49;
export const isMediumMood = (mood) => mood <= 49 && mood > 9;
export const isLowMood = (mood) => mood <= 9 && mood >= 1;
export const isCriticallyMood = (mood) => mood < 1;

export const isFullEnergy = (energy, energy_capacity) => energy / energy_capacity * 100 === 100;
export const isHighEnergy = (energy, energy_capacity) => {
    const percentOutOfCapacity = energy / energy_capacity * 100
    
    return percentOutOfCapacity < 100 && percentOutOfCapacity >= 49;
}
export const isMediumEnergy = (energy, energy_capacity) => {
    const percentOutOfCapacity = energy / energy_capacity * 100

    return percentOutOfCapacity <= 49 && percentOutOfCapacity > 9;
}
export const isLowEnergy = (energy, energy_capacity) => {
    const percentOutOfCapacity = energy / energy_capacity * 100

    return percentOutOfCapacity <= 9 && percentOutOfCapacity >= 1;
}

export const isCriticallyEnergy = (energy, energy_capacity) => {
    const percentOutOfCapacity = energy / energy_capacity * 100

    return percentOutOfCapacity < 1;
}

export const isFullHungry = (hungry) => hungry === 100;
export const isHighHungry = (hungry) => hungry < 100 && hungry > 49;
export const isMeiumHungry = (hungry) => hungry <= 49 && hungry > 9;
export const isLowHungry = (hungry) => hungry <= 9 && hungry >= 1;
export const isCriticallyHungry = (hungry) => hungry < 1;
export function canEarnOrClaim (userParameters) {
    const { hungry, mood, energy, energy_capacity } = userParameters
    
    return !isCriticallyHungry(hungry) && !isCriticallyMood(mood) && !isCriticallyEnergy(energy, energy_capacity)
}

export function canStartTraining(userParameters) {
    const { hungry, energy, mood } = userParameters
    
    return !isCriticallyHungry(hungry) && !isCriticallyEnergy(energy) && !isFullMood(mood)
}

export function canStartSleeping(userParameters) {
    const { energy, energy_capacity } = userParameters

    return !isFullEnergy(energy, energy_capacity)
}

export function canStartWorking(userParameters) {
    const { energy, energy_capacity, mood, hungry } = userParameters

    return !isCriticallyEnergy(energy, energy_capacity) && !isCriticallyHungry(hungry) && !isCriticallyMood(mood)
}

export async function recalcValuesByParameters(
    userParameters,
    { coinsReward = 0, moodProfit = 0 },
    session = null // Optional session parameter for transaction support
  ) {
    console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}`);
  
    // If no session is provided, run without a transaction (for backward compatibility)
    const useTransaction = !!session;
    let localSession;
  
    if (!useTransaction) {
      localSession = await mongoose.startSession();
      localSession.startTransaction();
    }
  
    try {
      // Mood adjustments based on hunger levels
      if (userParameters.hungry > 59) {
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, hungry > 59`);
        userParameters.mood = Math.min(100, userParameters.mood + moodProfit);
      } else if (userParameters.hungry <= 59 && userParameters.hungry >= 19) {
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, 59 <= hungry >= 19`);
        userParameters.mood = Math.min(100, Math.max(0, userParameters.mood - 0.09722) + moodProfit);
      } else {
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, hungry < 19`);
        userParameters.mood = Math.min(100, Math.max(0, userParameters.mood - 0.155) + moodProfit);
      }
  
      // Balance adjustments based on mood levels
      if (userParameters.mood > 59) {
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, mood > 59`);
        await upUserBalance(userParameters.id, coinsReward, useTransaction ? session : localSession);
      } else if (userParameters.mood <= 59 && userParameters.mood > 19) {
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, 59 <= mood > 19, applying 10% income penalty`);
        await upUserBalance(userParameters.id, coinsReward * 0.9, useTransaction ? session : localSession);
      } else if (userParameters.mood <= 19 && userParameters.mood > 1) {
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, 19 >= mood > 1, applying 50% income penalty`);
        await upUserBalance(userParameters.id, coinsReward * 0.5, useTransaction ? session : localSession);
      } else {
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, mood <= 1, equating any potential income to 1!!!`);
        if (coinsReward > 0) {
          await upUserBalance(userParameters.id, 1, useTransaction ? session : localSession);
        }
      }
  
      // Save userParameters within the transaction
      await userParameters.save({ session: useTransaction ? session : localSession });
  
      // Commit the transaction if we created it locally
      if (!useTransaction) {
        await localSession.commitTransaction();
      }
    } catch (error) {
      // Roll back the transaction if it fails
      if (!useTransaction) {
        await localSession.abortTransaction();
      }
      console.error(`[recalcValuesByParameters] Error for user ${userParameters.id}: ${error.message}`);
      throw error; // Re-throw to let the caller handle it
    } finally {
      // End the local session if we created it
      if (!useTransaction && localSession) {
        localSession.endSession();
      }
    }
  }

export function canApplyConstantEffects (userParameters) {
    console.log(`[canApplyConstantEffects] hit by user ${userParameters.id}, deciding...`);

    const { hungry, mood } = userParameters
    
    const isLowOrCriticalHunger = isLowHungry(hungry) || isCriticallyHungry(hungry)
    const isLowOrCriticalMood = isLowMood(mood) || isCriticallyMood(mood)

    const res = !(isLowOrCriticalHunger || isLowOrCriticalMood)
    console.log(`[canApplyConstantEffects] hit by user ${userParameters.id}, decided: ${res}`);
    
    return res
}
