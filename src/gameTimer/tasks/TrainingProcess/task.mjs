import TrainingParameters from "../../../models/training/trainingParameters.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import process from "../../../models/process/processModel.mjs"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import UserBoost from "../../../models/user/userBoostsModel.mjs"
import moment from 'moment-timezone'
import getMinutesAndSeconds from '../../../utils/getMinutesAndSeconds.js'
import User from "../../../models/user/userModel.mjs"

const durationFunction = async (userId, parameters, tp, trainingProcess) => {
  const now = moment()
  const processStartTime = moment(trainingProcess.createdAt)
  const lastUpdateTime = moment(trainingProcess.user_parameters_updated_at || trainingProcess.updatedAt)
  const elapsedSeconds = now.diff(processStartTime, "seconds")
  const secondsSinceLastUpdate = now.diff(lastUpdateTime, "seconds")

  // Calculate final duration with decrease percentage
  const baseDurationInSeconds = trainingProcess.target_duration_in_seconds || trainingProcess.base_duration_in_seconds
  const finalDurationInSeconds = baseDurationInSeconds
  
  // Calculate remaining time based on final duration
  const seconds_left = Math.max(0, finalDurationInSeconds - elapsedSeconds)

  // Calculate resource consumption since last update
  const energyCostBase = (tp.energy_spend / (tp.duration * 60)) * secondsSinceLastUpdate
  const energyCost = energyCostBase * ((100 - (trainingProcess.effects?.energy_cost_decrease !== null ? trainingProcess.effects?.energy_cost_decrease : 0)) / 100)
  console.log(energyCost, trainingProcess.effects?.energy_cost_decrease)
  const hungryBaseCost = (tp.hungry_spend / (tp.duration * 60)) * secondsSinceLastUpdate
  const hungryCost = hungryBaseCost * ((100 - (trainingProcess.effects?.hunger_cost_decrease !== null ? trainingProcess.effects?.hunger_cost_decrease : 0)) / 100)
  
  //! TRAINING BOOST SECTOR

  // Calculate mood change with increase percentage
  const baseMoodProfit = (tp.mood_profit / (tp.duration * 60)) * secondsSinceLastUpdate
  const moodProfit = baseMoodProfit * ((100 + (trainingProcess.effects?.mood_increase !== null ? trainingProcess.effects?.mood_increase : 0)) / 100)
  
  // Update user parameters
  parameters.energy = Math.max(0, parameters.energy - energyCost)
  parameters.hungry = Math.max(0, parameters.hungry - hungryCost)
  parameters.mood = Math.min(100, parameters.mood + moodProfit)
  
  const user = await UserParameters.findOne({ user: userId })

  if (seconds_left === 0 || user.energy === 0 || user.hungry === 0) {
    // Training complete
    await process.deleteOne({ id: userId, type: 'training' })
  } else {
    // Update process duration and seconds based on remaining time
    const remainingMinutes = Math.floor(seconds_left / 60)
    const remainingSeconds = seconds_left % 60
    console.log({ 
      energyCost, 
      hungryCost, 
      baseMoodProfit,
      moodProfit,
      baseDurationInSeconds,
      finalDurationInSeconds,
      elapsedSeconds,
      seconds_left
    }, `${remainingMinutes}:${remainingSeconds}`)
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
