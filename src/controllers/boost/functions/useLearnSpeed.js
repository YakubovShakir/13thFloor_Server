import moment from "moment-timezone"
import { ConstantEffects } from "../../../models/effects/constantEffectsLevels.js"
import process from "../../../models/process/processModel.js"
import Skill from "../../../models/skill/skillModel.js"
import UserParameters from "../../../models/user/userParametersModel.js"
import UserSkill from "../../../models/user/userSkillModel.js"

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

    if (!learningSkillProcess) return false

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
    if(learningSkillProcess.target_duration_in_seconds <= moment().diff(learningSkillProcess.createdAt, 'seconds')) {
      if(sub_type === 'constant_effects') {
        const userParameters = await UserParameters.findOne({ id: userId }, { constant_effects: 1 })
        userParameters.constant_effects_levels[skill.type] = skill.level
      } else {
        await new UserSkill({ id: userId, skill_id: skill.skill_id }).save()
      }

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
