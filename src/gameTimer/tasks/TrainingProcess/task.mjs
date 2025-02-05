import TrainingParameters from "../../../models/training/trainingParameters.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import process from "../../../models/process/processModel.mjs"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import UserBoost from "../../../models/user/userBoostsModel.mjs"
import moment from 'moment-timezone'
import getMinutesAndSeconds from '../../../utils/getMinutesAndSeconds.js'

const durationFunction = async (userId, parameters, tp, trainingProcess) => {
  const now = moment()
  const processStartTime = moment(trainingProcess.createdAt)
  const lastUpdateTime = moment(trainingProcess.user_parameters_updated_at || trainingProcess.updatedAt)
  const elapsedSeconds = now.diff(processStartTime, "seconds")
  const secondsSinceLastUpdate = now.diff(lastUpdateTime, "seconds")

  const durationInSeconds = trainingProcess.target_duration_in_seconds || trainingProcess.base_duration_in_seconds
  const seconds_left = Math.max(0, durationInSeconds - elapsedSeconds)

  // Calculate resource consumption since last update
  const energyCost = (tp.energy_spend / (tp.duration * 60)) * secondsSinceLastUpdate
  const hungryCost = (tp.hungry_spend / (tp.duration * 60)) * secondsSinceLastUpdate
  const moodProfit = (tp.mood_profit / (tp.duration * 60)) * secondsSinceLastUpdate
  
  // Update user parameters
  parameters.energy = Math.max(0, parameters.energy - energyCost)
  parameters.hungry = Math.max(0, parameters.hungry - hungryCost)
  parameters.mood = Math.min(100, parameters.mood + moodProfit)
  
  if (seconds_left === 0 || userId.energy === 0) {
    // Training complete
    await process.deleteOne({ id: userId, type: 'training' })
  } else {
    // Update process duration and seconds
    const remainingMinutes = Math.floor(seconds_left / 60)
    const remainingSeconds = seconds_left % 60
    console.log({ energyCost, hungryCost, moodProfit }, `${remainingMinutes}:${remainingSeconds}`)
    trainingProcess.duration = remainingMinutes
    trainingProcess.seconds = remainingSeconds
    trainingProcess.user_parameters_updated_at = now.toDate()
    await trainingProcess.save()
  }

  await parameters.save()
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
