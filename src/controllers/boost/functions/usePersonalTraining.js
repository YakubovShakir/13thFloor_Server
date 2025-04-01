import { BoostsOnNextUse, ProcessTypes } from "../../../models/boost/boostsOnNextUse.js";
import process from "../../../models/process/processModel.js";
import UserBoost from "../../../models/user/userBoostsModel.js";
import addProcess from "../../process/functions/addProcess.js";

const usePersonalTraining = async (userId, boostId, session) => {
  try {
    const boostsOnNextUse = new BoostsOnNextUse({
      user_id: userId,
      on_process: ProcessTypes.TRAINING,
      boost_id: boostId,
      effects: {
        energy_cost_decrease: 50, // decrease consumption by 50%
        mood_increase: 100,       // increase mood reward twice (+100%)
      },
    });

    await boostsOnNextUse.save({ session });
    return true;
  } catch (e) {
    console.log("Error in usePersonalTraining ", e);
    return false;
  }
};

export default usePersonalTraining;