import UserProcess from "../../../models/process/processModel.mjs"
import UserSkill from "../../../models/user/userSkillModel.mjs"
import cron from "node-cron"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import moment from "moment-timezone"

const durationFunction = async (process, userId, skillId) => {
    // Calculate time difference since last update
    const baseLearningDuration = process.target_duration_in_seconds 
      ? process.target_duration_in_seconds 
      : process.base_duration_in_seconds

    const processDurationInSeconds = moment().diff(moment(process.createdAt), 'seconds')
    console.log(baseLearningDuration)
      // Calculate remaining time with the decreased duration
    const remainingSeconds = Math.max(0, baseLearningDuration - processDurationInSeconds);
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const remainingSecondsAfterMinutes = remainingSeconds % 60;

      // Update process duration and seconds
    process.duration = remainingMinutes;
    process.seconds = remainingSecondsAfterMinutes;

    if(processDurationInSeconds >= baseLearningDuration) {
      console.log(processDurationInSeconds >= baseLearningDuration, processDurationInSeconds, baseLearningDuration)
      await UserSkill.create({
        id: userId,
        skill_id: skillId,
      })
      await process.deleteOne({ id: userId, type_id: skillId })
      return
    }

    process.save()
}

export const SkillProccess = cron.schedule(
  "*/10 * * * * *",
  async () => {
    console.log('hello')
    try {
      //get All Food process
      let skillProcesses = await UserProcess.find({ type: "skill" })

      for (let process of skillProcesses) {
        await durationFunction(process, process.id, process.type_id)
      }
    } catch (e) {
      console.log("Error when SkillProcess", e)
    }
  },
  {
    scheduled: false,
  }
)
