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
    { coinsReward = 0, moodProfit = 0 }
) {
    console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}`);

    if(userParameters.hungry > 49) {
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, hungry > 49`);
        //Nothing in terms of mood affection
        userParameters.mood = Math.min(100, userParameters.mood + moodProfit)
    } else if(userParameters.hungry <= 49 && userParameters.hungry > 9) {
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, 49 <= hungry > 9`);
        // -1.5% mood + potential profit
        userParameters.mood = Math.min(100, Math.max(0, userParameters.mood - 0.09722) + moodProfit);
    } else {
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, hungry < 9`);
        // -3% mood + potential profit
        userParameters.mood = Math.min(100, Math.max(0, userParameters.mood - 0,155) + moodProfit);
    }

    if(userParameters.mood > 49){
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, mood > 49`);
        userParameters.coins += coinsReward
    } else if(userParameters.mood <= 49 && userParameters.mood > 9) {
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, 49 <= mood > 9, applying 10% income penalty`);
        // -10% from potential income
        await upUserBalance(userParameters.id, coinsReward * 0.9)
    } else if(userParameters.mood <= 9 && userParameters.mood > 1) { 
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, mood <= 9 > 1, applying 50% income penalty`);
        await upUserBalance(userParameters.id, coinsReward * 0.5)
    } else {
        console.log(`[recalcValuesByParameters] hit by user ${userParameters.id}, mood < 1, equing any potential income to 1!!!`);
        // Make potential income 1
        if(coinsReward > 0) {
            await upUserBalance(userParameters.id, 1)
        }
    }

    await userParameters.save()
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
