import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import process from "../../../models/process/processModel.mjs"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import User from "../../../models/user/userModel.mjs"

const endFunction = async (parameters) => {
  parameters.energy = parameters?.energy_capacity
  await parameters.save()
}

const durationFunction = async (parameters) => {
  const energyRestore = parameters.energy_capacity / 60
  parameters.energy = Math.min(parameters?.energy_capacity, parameters.energy + energyRestore)
  console.log('Restoring sleep energy', energyRestore.toFixed(2), parameters.id)
  await parameters.save()
}

export const SleepProccess = cron.schedule(
  "* * * * * *",
  async () => {
    try {
      //get All Sleep Processes
      let processes = await process.find({ type: "sleep" })

      for (let process of processes) {
        const parameters = await UserParameters.findOne({ id: process?.id })
        await updateProcessTime(process, () => durationFunction(parameters), () => endFunction(parameters))
      }
    } catch (e) {
      console.log("Error when Sleep process", e)
    }
  },
  {
    scheduled: false,
  }
)
