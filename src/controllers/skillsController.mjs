import Skill from "../models/skillModel.mjs"
export const getSkills = async (req, res) => {
  try {
    console.log("Отдаю skills")
    const skills = await Skill.find({}).sort({ coins_price: 1 })
    if (skills) res.status(200).send({ skills })
  } catch (e) {
    console.log("Error while getSkills ", e)
  }
}
