import UserProcess from "../../../models/process/processModel.mjs"
import Work from "../../../models/work/workModel.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import { upUserBalance } from "../../../utils/upUserBalance.mjs"

export const WorkProccess = cron.schedule(
  "* * * * *",
  async () => {
    try {
      //get Work processes
      let processes = await UserProcess.find({ type: "work" })
      for (let process of processes) {
        const userParameters = await UserParameters.findOne({ id: process?.id })
        const work = await Work.findOne({ work_id: process?.type_id })
        if (!userParameters || !work)
          return console.log(
            "Work process error work or userParameters not found"
          )

        const moodCosts = work?.mood_cost_in_hour / 60
        const hungryCosts = work?.hungry_cost_in_hour / 60
        const energyCosts = work?.energy_cost_in_hour / 60
        const coinReward = work?.coins_in_hour / 60
        const cond =
          userParameters?.mood >= moodCosts &&
          userParameters?.energy >= energyCosts &&
          userParameters?.hungry >= hungryCosts

        if (cond) {
          userParameters.mood -= moodCosts
          userParameters.energy -= energyCosts
          userParameters.hungry -= hungryCosts
          console.log("UP user BALANCE ")
          await upUserBalance(userParameters?.id, coinReward)

          await userParameters.save()
        } else {
          await process.deleteOne({ _id: process?._id })
        }
      }
    } catch (e) {
      console.log("Error when SkillProcess", e)
    }
  },
  {
    scheduled: false,
  }
)
