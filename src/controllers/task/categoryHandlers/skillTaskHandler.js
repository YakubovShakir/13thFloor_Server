import UserSkill from "../../../models/user/userSkillModel.mjs"

const learnSkillTaskHandler = async (userId, skillId) => {
  try {
    const cond = await UserSkill.findOne({ id: userId, skill_id: skillId })
    if (cond) return true
    return false
  } catch (e) {
    console.log("Error in learnSkillTaskHandler - ", e)
  }
}

export default learnSkillTaskHandler
