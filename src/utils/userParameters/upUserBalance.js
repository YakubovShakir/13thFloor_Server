import UserParameters from "../../models/user/userParametersModel.js"
import LevelsParamters from "../../models/level/levelParametersModel.js"

export const upUserBalance = async (id, amount, session = null) => {
  const useTransaction = !!session;
  let localSession;

  if (!useTransaction) {
    localSession = await mongoose.startSession();
    localSession.startTransaction();
  }

  try {
    const effectiveSession = useTransaction ? session : localSession;
    const user = await UserParameters.findOne({ id: id }, null, { session: effectiveSession });

    if (!user) {
      throw new Error(`UserParameters not found for ID: ${id}`);
    }

    user.coins += amount;
    user.total_earned += amount;

    console.log(`[upUserBalance] ${id} +${amount} COINS`);

    await user.save({ session: effectiveSession });

    if (!useTransaction) {
      await localSession.commitTransaction();
    }
  } catch (e) {
    if (!useTransaction && localSession) {
      await localSession.abortTransaction();
    }
    console.log(`[upUserBalance] ERROR ${id}:`, e);
    throw e;
  } finally {
    if (!useTransaction && localSession) {
      localSession.endSession();
    }
  }
};

export const upUserExperience = async (id, amount, session = null) => {
  const useTransaction = !!session;
  let localSession;

  if (!useTransaction) {
    localSession = await mongoose.startSession();
    localSession.startTransaction();
  }

  try {
    const effectiveSession = useTransaction ? session : localSession;
    const user = await UserParameters.findOne({ id: id }, null, { session: effectiveSession });
    const levels = await LevelsParameters.find({}, null, { session: effectiveSession });

    if (!user) {
      throw new Error(`UserParameters not found for ID: ${id}`);
    }

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

    await user.save({ session: effectiveSession });

    if (!useTransaction) {
      await localSession.commitTransaction();
    }
  } catch (e) {
    if (!useTransaction && localSession) {
      await localSession.abortTransaction();
    }
    console.log(`[upUserExperience] ERROR ${id}:`, e);
    throw e;
  } finally {
    if (!useTransaction && localSession) {
      localSession.endSession();
    }
  }
};