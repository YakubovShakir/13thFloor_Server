import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import process from "../../../models/process/processModel.mjs"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import User from "../../../models/user/userModel.mjs"
import LevelsParameters from "../../../models/level/levelParametersModel.mjs"
import moment from 'moment-timezone'

const durationFunction = async (process, parameters) => {
  const level = parameters.level // get user level
  const levelParameters = await LevelsParameters.findOne({ level })
  
  const sleepDurationInSeconds = levelParameters.sleep_duration * 60 // sleep duration in seconds
  const processDurationInSeconds = moment().diff(moment(process.createdAt), 'seconds');
  const diffSeconds = moment().diff(moment(process.updatedAt), 'seconds');

  // Calculate remaining time
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
  
  const energyRestorePerDiff = parameters.energy_capacity / sleepDurationInSeconds * diffSeconds;
  parameters.energy = Math.min(parameters?.energy_capacity, parameters.energy + energyRestorePerDiff)
  console.log('Restoring sleep energy', parameters.energy + energyRestorePerDiff + '/' + parameters.energy_capacity, parameters.id)
  
  await process.save() // Save process updates
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
       durationFunction(process, parameters)
      }
    } catch (e) {
      console.log("Error when Sleep process", e)
    }
  },
  {
    scheduled: false,
  }
)
