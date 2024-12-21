import UserProcess from "../../../models/process/processModel.mjs"
import UserSkill from "../../../models/user/userSkillModel.mjs"
import cron from "node-cron"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import { addCompletedTask } from "../../../controllers/task/taskController.mjs"
const endFunction = async (userId, skillId) => {
  await UserSkill.create({
    id: userId,
    skill_id: skillId,
  })

  await addCompletedTask(userId, "training_rookie")
}

export const SkillProccess = cron.schedule(
  "* * * * * *",
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
