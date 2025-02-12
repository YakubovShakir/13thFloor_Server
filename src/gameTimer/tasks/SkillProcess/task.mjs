import UserProcess from "../../../models/process/processModel.mjs"
import UserSkill from "../../../models/user/userSkillModel.mjs"
import cron from "node-cron"
import updateProcessTime from "../../../utils/updateProcessTime.js"
import moment from "moment-timezone"
import { ConstantEffects, ConstantEffectTypes } from "../../../models/effects/constantEffectsLevels.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import { upUserExperience } from "../../../utils/userParameters/upUserBalance.mjs"

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
      if(process.sub_type === 'constant_effects') {
        console.log('learned constant effect')
        const effect = await ConstantEffects.findOne({ id: skillId })
        const userParams = await UserParameters.findOne({ id: userId })
        userParams.constant_effects_levels[effect.type] = effect.level
        await upUserExperience(userId, effect.experience_reward)
        await userParams.save()
      } else {
        const skill = await ConstantEffects.findOne({ id: skillId })
        await upUserExperience(userId, skill.experience_reward)
        await UserSkill.create({
          id: userId,
          skill_id: skillId,
        })
      }
      await process.deleteOne({ id: userId, type_id: skillId })
      return
    }

    process.save()
}

export const SkillProccess = cron.schedule(
  "*/10 * * * * *",
  async () => {
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
