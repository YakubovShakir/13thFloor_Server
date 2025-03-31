import UserParameters from "../../models/user/userParametersModel.js"
import LevelsParamters from "../../models/level/levelParametersModel.js"
import { queueDbUpdate } from "../../gameTimer/universal.js";

export const upUserBalance = async (id, amount) => {
  await queueDbUpdate(async (session) => {
    const user = await UserParameters.findOne({ id }, null, { session });
    if (!user) throw new Error(`UserParameters not found for ID: ${id}`);
    user.coins += amount;
    user.total_earned += amount;
    await user.save({ session });
    console.log(`[upUserBalance] ${id} +${amount} COINS`);
  }, `upUserBalance for user ${id}`);
};

export const upUserExperience = async (id, amount) => {
  await queueDbUpdate(async (session) => {
    const user = await UserParameters.findOne({ id }, null, { session });
    const levels = await LevelsParamters.find({}, null, { session });
    if (!user) throw new Error(`UserParameters not found for ID: ${id}`);
    user.experience += amount;
    console.log(`[upUserExperience] ${id} +${amount} EXP`);
    if (user.level !== 15) {
      const nextLevel = levels.find((level) => level?.level === user?.level + 1);
      const levelUpCondition = user.experience >= nextLevel?.experience_required;
      if (levelUpCondition) {
        user.level += 1;
        user.energy_capacity = nextLevel.energy_capacity;
        console.log(`[upUserExperience] ${id} level up ${user.level - 1}->${user.level}`);
      }
    }
    await user.save({ session });
  }, `upUserExperience for user ${id}`);
};