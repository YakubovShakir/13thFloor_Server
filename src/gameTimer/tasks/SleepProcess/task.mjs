import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import process from "../../../models/process/processModel.mjs"
import updateProcessTime from "../../../utils/updateProcessTime.js"

const endFunction = async (parameters) => {
  parameters.energy = parameters?.energy_capacity
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
        await updateProcessTime(process, null, () => endFunction(parameters))
      }
    } catch (e) {
      console.log("Error when Sleep process", e)
    }
  },
  {
    scheduled: false,
  }
)
