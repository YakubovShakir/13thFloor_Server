import TrainingParameters from "../../../models/training/trainingParameters.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import process from "../../../models/process/processModel.mjs"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import UserBoost from "../../../models/user/userBoostsModel.mjs"
import moment from 'moment-timezone'

const durationFunction = async (userId, parameters, tp, process) => {
  // const trainingBoostProcess = await process.findOne({
  //   id: userId,
  //   type: "boost",
  //   type_id: 3,
  // })


    const trainingDurationInSeconds = tp.duration * 60 // training duration in seconds
    const processDurationInSeconds = moment().diff(moment(process.createdAt), 'seconds');
    const diffSeconds = moment().diff(moment(process.updatedAt), 'seconds');
  
    // Calculate remaining time
    const remainingSeconds = Math.max(0, trainingDurationInSeconds - processDurationInSeconds);
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const remainingSecondsAfterMinutes = remainingSeconds % 60;
  
    // Update process duration and seconds
    process.duration = remainingMinutes;
    process.seconds = remainingSecondsAfterMinutes;
  
    // const moodProfit = trainingBoostProcess
    //   ? tp?.mood_profit / 60 * diffSeconds * 2 
    //   : tp?.mood_profit / 60 * diffSeconds
    const moodProfit = tp?.mood_profit / trainingDurationInSeconds * diffSeconds
    console.log(moodProfit, remainingMinutes, remainingSeconds)
    parameters.mood = Math.min(100, moodProfit + parameters?.mood)

    if(processDurationInSeconds > trainingDurationInSeconds) {
      await parameters.save()
      await process.deleteOne({ id: process.id, type: 'training' })
      return
    }
  
    await parameters.save()
    await process.save()
}

export const TrainingProccess = cron.schedule(
  "*/10 * * * * *",
  async () => {
    try {
      //get All Training Processes
      let processes = await process.find({ type: "training" })

      for (let process of processes) {
        const parameters = await UserParameters.findOne({ id: process?.id })
        const tp = await TrainingParameters.findOne({ level: process?.type_id })
        durationFunction(parameters.id, parameters, tp, process)
      }
    } catch (e) {
      console.log("Error when Training process", e)
    }
  },
  {
    scheduled: false,
  }
)
