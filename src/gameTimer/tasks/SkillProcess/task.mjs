import UserProcess from "../../../models/process/processModel.mjs"
import UserSkills from "../../../models/user/userSkillModel.mjs"
import cron from "node-cron"

export const SkillProccess = cron.schedule(
  "* * * * *",
  async () => {
    try {
      //get All Food process
      let skillProcesses = await UserProcess.find({ type: "skill" })

      for (let process of skillProcesses) {
        if (process?.duration > 1) {
          process.duration -= 1
          await process.save()
        } else {
          await UserSkills.create({
            id: process?.id,
            skill_id: process?.type_id,
          })
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
