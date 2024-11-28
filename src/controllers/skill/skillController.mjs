import Skill from "../../models/skill/skillModel.mjs"
import UserSkills from "../../models/user/userSkillModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"
import UserProcess from "../../models/process/processModel.mjs"
import addProcess from "../../utils/process/addProcess.mjs"
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

    if (!userId) return res.status(400).json({ error: "Query Not Valid" })

    const userSkills = await UserSkills.find({ id: userId })
    return res.status(200).json({ skills: userSkills })
  } catch (e) {
    console.log("Error in getUserSkills - ", e)
  }
}
