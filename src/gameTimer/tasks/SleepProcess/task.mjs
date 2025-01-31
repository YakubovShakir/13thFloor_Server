import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import process from "../../../models/process/processModel.mjs"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import User from "../../../models/user/userModel.mjs"
import LevelsParameters from "../../../models/level/levelParametersModel.mjs"
import moment from 'moment-timezone'

const durationFunction = async (process, parameters) => {
  const level = parameters.level
  const levelParameters = await LevelsParameters.findOne({ level })
  
  // Get base duration and apply percentage decrease
  const durationDecreasePercentage = process.effects.duration_decrease || 0
  const baseSleepDurationInSeconds = levelParameters.sleep_duration * 60
  const sleepDurationInSeconds = baseSleepDurationInSeconds * (1 - durationDecreasePercentage / 100)
  
  const processDurationInSeconds = moment().diff(moment(process.createdAt), 'seconds');
  const diffSeconds = moment().diff(moment(process.updatedAt), 'seconds');

  // Calculate remaining time with the decreased duration
  const remainingSeconds = Math.max(0, sleepDurationInSeconds - processDurationInSeconds);
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingSecondsAfterMinutes = remainingSeconds % 60;

  // Update process duration and seconds
  process.duration = remainingMinutes;
  process.seconds = remainingSecondsAfterMinutes;

  if(processDurationInSeconds > sleepDurationInSeconds) {
    parameters.energy = parameters.energy_capacity
    await parameters.save()
    await process.deleteOne({ id: process.id, type: 'sleep' })
    return
  }
  
  // Adjusted energy calculation to maintain the same total energy reward
  // We increase the energy per second to compensate for shorter duration
  const energyMultiplier = baseSleepDurationInSeconds / sleepDurationInSeconds
  const energyRestorePerDiff = (parameters.energy_capacity / sleepDurationInSeconds * diffSeconds) * (1 / energyMultiplier);
  
  parameters.energy = Math.min(parameters?.energy_capacity, parameters.energy + energyRestorePerDiff)
  console.log('Restoring sleep energy', parameters.energy + energyRestorePerDiff + '/' + parameters.energy_capacity, parameters.id)
  
  await process.save()
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
