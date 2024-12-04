import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import process from "../../../models/process/processModel.mjs"
export const SleepProccess = cron.schedule(
  "* * * * *",
  async () => {
    try {
      //get All Sleep Processes
      let processes = await process.find({ type: "sleep" })

      for (let process of processes) {
        const parameters = await UserParameters.findOne({ id: process?.id })

        if (process?.duration > 1) {
          process.duration -= 1
          await process.save()
        } else {
         parameters.energy = parameters?.energy_capacity
        await process.deleteOne({ _id: process?._id })
        }
        parameters.save()
      }
    } catch (e) {
      console.log("Error when Sleep process", e)
    }
  },
  {
    scheduled: false,
  }
)
