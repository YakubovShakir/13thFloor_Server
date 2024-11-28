import Work from "../../models/work/workModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"
import UserWorks from "../../models/user/userWorkModel.mjs"
import UserProcess from "../../models/process/processModel.mjs"
import { addProcess } from "../process/processController.mjs"
import addActiveProcess from "../../utils/process /addActiveProcess.mjs"
export const getWorks = async (req, res) => {
  try {
    const works = await Work.find({}).sort({ coins_price: 1 })
    if (works) res.status(200).send({ works })
  } catch (e) {
    console.log("Error while getWorks ", e)
  }
}

export const buyWork = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId)
    const workId = parseInt(req.query.workId)
    if (!userId || !workId)
      return res.status(400).json({ error: "Query Not Valid" })
    const user = await UserParameters.findOne({ id: userId })
    const work = await Work.findOne({ work_id: workId })
    if (!user || !work)
      return res.status(404).json({ error: "User or work not found" })

    // Проверка что игрок покупает новую работу
    if (workId <= user?.work_id)
      return res.status(400).json({ error: "You can buy only a new work!" })

    //Проверка на наличие необходимого навыка
    if (work?.skill_id_required) {
      const userRequierdSkill = await UserSkills.findOne({
        skill_id: work?.skill_id_required,
      })
      if (!userRequierdSkill)
        return res.status(400).json({ error: "Need Required Skill " })
    }

    // Проверка на достаточность баланса
    if (user?.coins < work?.coins_price)
      return res.status(400).json({ error: "Balance not enough" })
    else {
      user.coins -= work?.coins_price
      user.work_id = workId
    }

    await user.save()

    return res.status(200).json({ status: "ok" })
  } catch (e) {
    console.log("ERR in buy work controllet - ", e)
  }
}
