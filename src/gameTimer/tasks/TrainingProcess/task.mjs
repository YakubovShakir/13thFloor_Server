import TrainingParameters from "../../../models/training/trainingParameters.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import process from "../../../models/process/processModel.mjs"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import UserBoost from "../../../models/user/userBoostsModel.mjs"

const endFunction = async (userId, parameters, tp) => {
  const trainingBoostProcess = await process.findOne({
    id: userId,
    type: "boost",
    type_id: 3,
  })

  const moodProfit = trainingBoostProcess
    ? tp?.mood_profit * 2
    : tp?.mood_profit

  parameters.mood = Math.min(100, moodProfit + parameters?.mood)
  if (trainingBoostProcess)
    await trainingBoostProcess.deleteOne({ _id: trainingBoostProcess?._id })
  await parameters.save()
}

export const TrainingProccess = cron.schedule(
  "* * * * * *",
  async () => {
    try {
      //get All Training Processes
      let processes = await process.find({ type: "training" })

      for (let process of processes) {
        const parameters = await UserParameters.findOne({ id: process?.id })
        const tp = await TrainingParameters.findOne({ level: process?.type_id })
        await updateProcessTime(process, null, () =>
          endFunction(process?.id, parameters, tp)
        )
      }
    } catch (e) {
      console.log("Error when Training process", e)
    }
  },
  {
    scheduled: false,
  }
)
