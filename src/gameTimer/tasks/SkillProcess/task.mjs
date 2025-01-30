import UserProcess from "../../../models/process/processModel.mjs"
import UserSkill from "../../../models/user/userSkillModel.mjs"
import cron from "node-cron"
import updateProcessTime from "../../../utils/updateProcessTime.js"

const endFunction = async (userId, skillId) => {
  await UserSkill.create({
    id: userId,
    skill_id: skillId,
  })
}

export const SkillProccess = cron.schedule(
  "*/10 * * * * *",
  async () => {
    try {
      //get All Food process
      let skillProcesses = await UserProcess.find({ type: "skill" })

      for (let process of skillProcesses) {
        await updateProcessTime(process, null, () =>
          endFunction(process?.id, process?.type_id)
        )
      }
    } catch (e) {
      console.log("Error when SkillProcess", e)
    }
  },
  {
    scheduled: false,
  }
)
