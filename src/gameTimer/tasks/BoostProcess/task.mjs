import UserParameters from "../../../models/user/userParametersModel.mjs"
import UserProcess from "../../../models/process/processModel.mjs"
import cron from "node-cron"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import Boost from "../../../models/boost/boostModel.mjs"
import tonicDrinkDurationFunction from "./types/tonicDrink.mjs"

export const BoostProccess = cron.schedule(
  "* * * * * *",
  async () => {
    try {
      //get All Boost process
      let processes = await UserProcess.find({ type: "boost" })
      let boost, user

      for (let process of processes) {
        // get User Parameters and Boost
        user = await UserParameters.findOne({ id: process?.id })
        boost = await Boost.findOne({ boost_id: process?.type_id })

        switch (boost?.type) {
          case "tonic-drink":
            await updateProcessTime(
              process,
              () => tonicDrinkDurationFunction(user),
              null
            )
            break
          case "personal-training":
            await updateProcessTime(process, null, null, true)
            break
          default:
            await updateProcessTime(process, null, null, false)
        }
      }
    } catch (e) {
      console.log("Error in BoostProcess", e)
    }
  },
  {
    scheduled: false,
  }
)

export default BoostProccess
