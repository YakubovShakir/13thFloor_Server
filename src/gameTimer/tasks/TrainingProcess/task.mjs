import TrainingParameters from "../../../models/training/trainingParameters.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import process from "../../../models/process/processModel.mjs"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import UserBoost from "../../../models/user/userBoostsModel.mjs"
import moment from 'moment-timezone'
import getMinutesAndSeconds from '../../../utils/getMinutesAndSeconds.js'

const durationFunction = async (userId, parameters, tp, process) => {
  const user = await UserParameters.findOne({ id: userId })
  // Apply duration decrease if applicable
  const durationDecreasePercentage = process.effects.duration_decrease || 0
  const baseDurationInSeconds = tp.duration * 60
  const trainingDurationInSeconds = baseDurationInSeconds * (1 - durationDecreasePercentage / 100)
  
  const processDurationInSeconds = moment().diff(moment(process.createdAt), 'seconds');
  const diffSeconds = moment().diff(moment(process.updatedAt), 'seconds');

  // Calculate remaining time
  const remainingSeconds = Math.max(0, trainingDurationInSeconds - processDurationInSeconds);
  const { duration: remainingMinutes, seconds: remainingSecondsAfterMinutes } = getMinutesAndSeconds(remainingSeconds);

  // Update process duration and seconds
  process.duration = remainingMinutes;
  process.seconds = remainingSecondsAfterMinutes;

  // Calculate mood profit using original duration to maintain same total reward
  const moodProfit = tp?.mood_profit / baseDurationInSeconds * diffSeconds
  const energySpend = user.energy_capacity / baseDurationInSeconds * diffSeconds
  const hungrySpend = tp?.hungry_spend / baseDurationInSeconds * diffSeconds

  parameters.mood = Math.min(100, moodProfit + parameters?.mood)
  parameters.energy = Math.max(0, parameters.energy - energySpend)
  parameters.hungrySpend = Math.max(0, parameters.energy - hungrySpend)

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
