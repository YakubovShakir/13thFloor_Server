import TrainingParameters from "../../../models/training/trainingParameters.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import process from "../../../models/process/processModel.mjs"
export const TrainingProccess = cron.schedule(
  "* * * * *",
  async () => {
    try {
      //get All Training Processes
      let processes = await process.find({ type: "training" })

      for (let process of processes) {
        const parameters = await UserParameters.findOne({ id: process?.id })
        const tp = await TrainingParameters.findOne({ level: process?.type_id })

        if (
          parameters?.hungry < tp?.hungry_spend ||
          parameters?.energy < tp?.energy_spend
        ) {
          parameters.mood = Math.min(100, tp?.mood_profit + parameters?.mood)
          await process.deleteOne({ _id: process?._id })
          return
        }

        parameters.hungry -= tp?.hungry_spend
        parameters.energy -= tp?.energy_spend

        if (process?.duration > 1) {
          process.duration -= 1
          await process.save()
        } else {
          parameters.mood = Math.min(100, tp?.mood_profit + parameters?.mood)

          await process.deleteOne({ _id: process?._id })
        }
        parameters.save()
      }
    } catch (e) {
      console.log("Error when Training process", e)
    }
  },
  {
    scheduled: false,
  }
)
