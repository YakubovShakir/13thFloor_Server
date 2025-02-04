import UserParameters from "../../../models/user/userParametersModel.mjs"
import UserProcess from "../../../models/process/processModel.mjs"
import cron from "node-cron"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import Boost from "../../../models/boost/boostModel.mjs"
import moment from 'moment-timezone'

const processDurationFunction = async (boostDuration, process, user) => {
    const boostDurationInSeconds = boostDuration * 60
    const processDurationInSeconds = moment().diff(moment(process.createdAt), 'seconds');
    const diffSeconds = moment().diff(moment(process.updatedAt), 'seconds');
  
    // Calculate remaining time
    const remainingSeconds = Math.max(0, boostDurationInSeconds - processDurationInSeconds);
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const remainingSecondsAfterMinutes = remainingSeconds % 60;

    if(remainingSeconds === 0) {
      await UserProcess.deleteOne({ _id: process._id })
      user.energy = user.energy_capacity

      await user.save()
      return
    }
    // Update process duration and seconds
    process.duration = remainingMinutes;
    process.seconds = remainingSecondsAfterMinutes;

    user.energy = Math.min(user.energy, user.energy + user?.energy_capacity / boostDurationInSeconds * diffSeconds)

    await user.save()
    await process.save()
}

export const BoostProccess = cron.schedule(
  "*/10 * * * * *",
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
            await processDurationFunction(boost.duration, process, user)
            break
          case "personal-training":
            await updateProcessTime(process, null, null, true)
            break
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
