import UserParameters from "../../models/user/userParametersModel.js"
import LevelsParamters from "../../models/level/levelParametersModel.js"
import { withTransaction } from "../../utils/dbUtils.js";

export const upUserBalance = async (id, amount) => {
  return await withTransaction(async (session) => {
    const user = await UserParameters.findOne({ id }, null, { session });
    if (!user) throw new Error(`UserParameters not found for ID: ${id}`);
    user.coins += amount;
    user.total_earned += amount;
    await user.save({ session });
    console.log(`[upUserBalance] ${id} +${amount} COINS`);
    return { coins: user.coins, total_earned: user.total_earned }; // Optional: return updated values
  });
};

export const upUserExperience = async (id, amount) => {
  return await withTransaction(async (session) => {
    const user = await UserParameters.findOne({ id }, null, { session });
    const levels = await LevelsParamters.find({}, null, { session });
    if (!user) throw new Error(`UserParameters not found for ID: ${id}`);
    user.experience += amount;
    console.log(`[upUserExperience] ${id} +${amount} EXP`);
    if (user.level !== 20) {
      const nextLevel = levels.find((level) => level?.level === user?.level + 1);
      const levelUpCondition = user.experience >= nextLevel?.experience_required;
      if (levelUpCondition) {
        user.level += 1;
        user.energy_capacity = nextLevel.energy_capacity;
        console.log(`[upUserExperience] ${id} level up ${user.level - 1}->${user.level}`);
      }
    }
    await user.save({ session });
    return { experience: user.experience, level: user.level }; // Optional: return updated values
  });
};