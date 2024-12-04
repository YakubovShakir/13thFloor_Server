import Skill from "../../models/skill/skillModel.mjs"
import UserSkill from "../../models/user/userSkillModel.mjs"

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({}).sort({ coins_price: 1 })
    if (skills) res.status(200).send({ skills })
  } catch (e) {
    console.log("Error while getSkills ", e)
  }
}

export const getUserSkills = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    console.log(userId)
    if (!userId) return res.status(400).json({ error: "Query Not Valid" })

    const userSkills = await UserSkill.find({ id: userId })
    return res.status(200).json({ skills: userSkills })
  } catch (e) {
    console.log("Error in getUserSkills - ", e)
  }
}
