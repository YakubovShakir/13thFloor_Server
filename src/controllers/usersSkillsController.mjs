import UserSkills from "../models/userSkillsModel.mjs"
import UserParameters from "../models/userParametersModel.mjs"
import Skill from "../models/skillModel.mjs"
import UserProcess from "../models/userProcessModel.mjs"
import { addProcess } from "./userProcessesController.mjs"

export const buySkill = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId)
    const skillId = parseInt(req.query.skillId)
    if (!userId || !skillId)
      return res.status(400).json({ error: "Query Not Valid" })
    const userParameters = await UserParameters.findOne({ id: userId })
    const skill = await Skill.findOne({ skill_id: skillId })
    if (!userParameters || !skill)
      return res.status(404).json({ error: "User or skill not found" })

    // Проверка что у пользователя еще нет этого навыка
    const userHaveSkill = await UserSkills.findOne({
      id: userId,
      skill_id: skillId,
    })
    if (userHaveSkill)
      return res.status(400).json({ error: "Skill already exists" })

    // Проверка что у пользователя нет запущенного процесса изучения данного скилла
    const process = await UserProcess.findOne({
      id: userId,
      type: "skill",
      type_id: skillId,
    })
    if (process) return res.status(400).json({ error: "in Learning!" })

    //Проверка на наличие необходимого навыка
    if (skill?.skill_id_required) {
      const userRequierdSkill = await UserSkills.findOne({
        skill_id: skill?.skill_id_required,
      })
      if (!userRequierdSkill)
        return res.status(400).json({ error: "Need Required Skill " })
    }

    // Проверка на достаточность баланса
    if (userParameters?.coins < skill?.coins_price)
      return res.status(400).json({ error: "Balance not enough" })
    else userParameters.coins -= skill?.coins_price

    await userParameters.save()

    // Длительное восстановление
    await addProcess(userId, "skill", skillId)

    return res.status(200).json({ status: "ok" })
  } catch (e) {
    console.log("Error in buySkill - ", e)
  }
}

export const getUserSkills = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)

    if (!userId) return res.status(400).json({ error: "Query Not Valid" })

    const userSkills = await UserSkills.find({ id: userId })
    if (userSkills.length != 0) {
      return res.status(200).json({ skills: userSkills })
    } else return res.status(404).json({ error: "User not have skill" })
  } catch (e) {
    console.log("Error in getUserSkills - ", e)
  }
}
