import process from "../../../models/process/processModel.mjs"
import Skill from "../../../models/skill/skillModel.mjs"

const useLearnSpeed = async (userId, skillId, speedRate) => {
  try {
    const skill = await Skill.findOne({ skill_id: skillId })
    if (!skill) return false

    const learningSkillProcess = await process.findOne({
      id: userId,
      type: "skill",
      type_id: skillId,
    })

    if (!learningSkillProcess) return false

    learningSkillProcess.duration =
      learningSkillProcess.duration - learningSkillProcess.duration * speedRate
    await learningSkillProcess.save()
    return true
  } catch (e) {
    console.log("Error in useLearnSpeed ", e)
    return false
  }
}

export default useLearnSpeed
