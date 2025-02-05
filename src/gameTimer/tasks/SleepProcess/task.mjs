import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import process from "../../../models/process/processModel.mjs"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import User from "../../../models/user/userModel.mjs"
import LevelsParameters from "../../../models/level/levelParametersModel.mjs"
import moment from 'moment-timezone'

const durationFunction = async (sleepProcess, parameters) => {
  const now = moment()
  const processStartTime = moment(sleepProcess.createdAt)
  const lastUpdateTime = moment(sleepProcess.user_parameters_updated_at || sleepProcess.updatedAt)
  const elapsedSeconds = now.diff(processStartTime, "seconds")
  const secondsSinceLastUpdate = now.diff(lastUpdateTime, "seconds")

  const durationInSeconds = sleepProcess.target_duration_in_seconds || sleepProcess.base_duration_in_seconds
  const seconds_left = Math.max(0, durationInSeconds - elapsedSeconds)

  // Calculate energy restoration since last update
  const energyRestorePerSecond = parameters.energy_capacity / sleepProcess.base_duration_in_seconds
  const energyRestored = energyRestorePerSecond * secondsSinceLastUpdate

  // Update user parameters
  parameters.energy = Math.min(parameters.energy_capacity, parameters.energy + energyRestored)
  
  if (seconds_left === 0) {
    // Sleep completed
    await process.deleteOne({ id: parameters.id, type: 'sleep' })
  } else {
    // Update process duration and seconds
    const remainingMinutes = Math.floor(seconds_left / 60)
    const remainingSeconds = seconds_left % 60
    console.log({ energyRestored }, `${remainingMinutes}:${remainingSeconds}`)
    sleepProcess.duration = remainingMinutes
    sleepProcess.seconds = remainingSeconds
    sleepProcess.user_parameters_updated_at = now.toDate()
    await sleepProcess.save()
  }

  if(parameters.energy === parameters.energy_capacity) {
    await process.deleteOne({ id: parameters.id, type: 'sleep' })
  }

  await parameters.save()
}

export const SleepProccess = cron.schedule(
  "*/10 * * * * *",
  async () => {
    try {
      //get All Sleep Processes
      let processes = await process.find({ type: "sleep" })

      for (let process of processes) {
        const parameters = await UserParameters.findOne({ id: process?.id })
        await durationFunction(process, parameters)
      }
    } catch (e) {
      console.log("Error when Sleep process", e)
    }
  },
  {
    scheduled: false,
  }
)
