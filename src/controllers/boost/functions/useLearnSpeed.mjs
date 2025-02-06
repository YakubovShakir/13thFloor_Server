import moment from "moment-timezone"
import { ConstantEffects } from "../../../models/effects/constantEffectsLevels.mjs"
import process from "../../../models/process/processModel.mjs"
import Skill from "../../../models/skill/skillModel.mjs"

const useLearnSpeed = async (userId, skillId, sub_type, speedRate) => {
  try {
    const skill = sub_type === 'constant_effects' ?  await ConstantEffects.findOne({ id: skillId }) : await Skill.findOne({ skill_id: skillId })
    if (!skill) return false

    const learningSkillProcess = await process.findOne({
      id: userId,
      type: "skill",
      type_id: skillId,
      sub_type,
    })

    console.log('@', learningSkillProcess, userId, skillId, sub_type)
    if (!learningSkillProcess) return false
    console.log(learningSkillProcess.base_duration_in_seconds, learningSkillProcess.target_duration_in_seconds)
    learningSkillProcess.target_duration_in_seconds =
      learningSkillProcess.target_duration_in_seconds
        ? Math.ceil(
            learningSkillProcess.target_duration_in_seconds *
              (1 - speedRate / 100)
          )
        : Math.ceil(
            learningSkillProcess.base_duration_in_seconds *
              (1 - speedRate / 100)
          )
          console.log(learningSkillProcess.base_duration_in_seconds, learningSkillProcess.target_duration_in_seconds)
    if(learningSkillProcess.target_duration_in_seconds <= moment().diff(learningSkillProcess.createdAt, 'seconds')) {
      await process.deleteOne({ id: userId,
        type: "skill",
        type_id: skillId,
        sub_type })
    } else {
      await learningSkillProcess.save()
    }
    return true
  } catch (e) {
    console.log("Error in useLearnSpeed ", e)
    return false
  }
}

export default useLearnSpeed
