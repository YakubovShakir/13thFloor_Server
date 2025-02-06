import { BoostsOnNextUse, ProcessTypes } from "../../../models/boost/boostsOnNextUse.js"
import process from "../../../models/process/processModel.mjs"
import UserBoost from "../../../models/user/userBoostsModel.mjs"
import addProcess from "../../process/functions/addProcess.mjs"

const usePersonalTraining = async (userId, boostId) => {
  try {
    const boostsOnNextUse = new BoostsOnNextUse({
      user_id: userId,
      on_process: ProcessTypes.TRAINING,
      boost_id: boostId,
      effects: {
        // decrease consumption by 50%
        energy_cost_decrease: 50,
        // increase mood reward twice (+100%)
        mood_increase: 100
      }
    })

    await boostsOnNextUse.save()

    return true
  } catch (e) {
    console.log("Error in usePersonalTraining ", e)
    return false
  }
}

export default usePersonalTraining
