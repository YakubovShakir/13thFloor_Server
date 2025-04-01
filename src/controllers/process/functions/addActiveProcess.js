import addProcess from "./addProcess.js";
import process from "../../../models/process/processModel.js";

const addActiveProcess = async (userId, type, typeId, duration, seconds, effects, processExtra, session) => {
  try {
    const activeProcess = await process.findOne({
      id: userId,
      active: true,
    }).session(session);

    if (activeProcess && type !== 'skill') {
      activeProcess.type = type;
      activeProcess.type_id = typeId;
      activeProcess.duration = duration || 0;
      activeProcess.seconds = seconds || 0;
      if (effects) activeProcess.effects = { ...effects };
      if (processExtra) {
        console.log('process extra', processExtra);
        const { base_duration_in_seconds = null, target_duration_in_seconds = null, reward_at_the_end = null, sub_type = null } = processExtra;

        activeProcess.base_duration_in_seconds = base_duration_in_seconds;
        activeProcess.target_duration_in_seconds = target_duration_in_seconds;
        activeProcess.reward_at_the_end = reward_at_the_end;
        activeProcess.sub_type = sub_type;
      }

      await activeProcess.save({ session });
      return true;
    } else {
      const result = await addProcess(userId, type, typeId, duration, seconds, effects, processExtra, session);
      return result;
    }
  } catch (e) {
    console.log("Error in addActiveProcess", e);
    return false;
  }
};

export default addActiveProcess;