import Work from "../../models/work/workModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"
import UserWorks from "../../models/user/userWorkModel.mjs"
import UserProcess from "../../models/process/processModel.mjs"
import { addProcess } from "../process/processController.mjs"
import { upUserBalance } from "../../utils/upUserBalance.mjs"

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
    const userParameters = await UserParameters.findOne({ id: userId })
    const work = await Work.findOne({ work_id: workId })
    if (!userParameters || !work)
      return res.status(404).json({ error: "User or work not found" })

    // Проверка что у пользователя еще нет этой работы
    const userHaveWork = await UserWorks.findOne({
      id: userId,
      work_id: workId,
    })
    if (userHaveWork)
      return res.status(400).json({ error: "Work already exists" })

    //Проверка на наличие необходимого навыка
    if (work?.skill_id_required) {
      const userRequierdSkill = await UserSkills.findOne({
        skill_id: work?.skill_id_required,
      })
      if (!userRequierdSkill)
        return res.status(400).json({ error: "Need Required Skill " })
    }

    // Проверка на достаточность баланса
    if (userParameters?.coins < work?.coins_price)
      return res.status(400).json({ error: "Balance not enough" })
    else {
      userParameters.coins -= work?.coins_price
      userParameters.work_id = workId
    }

    await userParameters.save()

    // // Добавляем работу в список работ пользователя
    await UserWorks.create({
      id: userId,
      work_id: workId,
    })

    return res.status(200).json({ status: "ok" })
  } catch (e) {
    console.log("ERR in buy work controllet - ", e)
  }
}

export const startWork = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId)
    const workId = parseInt(req.query.workId)
    if (!userId || !workId)
      return res.status(400).json({ error: "work and user are required" })

    const userParameters = await UserParameters.findOne({ id: userId })
    const work = await Work.findOne({ work_id: workId })
    if (!userParameters || !work)
      return res.status(404).json({ error: "User or work not found" })

    // Проверка что у пользователя есть эта работа
    const userHaveWork = await UserWorks.findOne({
      id: userId,
      work_id: workId,
    })
    if (!userHaveWork)
      return res.status(400).json({ error: "Work unavailable" })

    const moodCosts = work?.mood_cost_in_hour / 60
    const hungryCosts = work?.hungry_cost_in_hour / 60
    const energyCosts = work?.energy_cost_in_hour / 60
    const cond =
      userParameters?.mood >= moodCosts &&
      userParameters?.energy >= energyCosts &&
      userParameters?.hungry >= hungryCosts

    if (!cond)
      return res
        .status(400)
        .json({ error: "Not enough Mood or Energy or Hungry" })

    const activeProcess = await UserProcess.findOne({
      id: userId,
      active: true,
    })

    if (activeProcess) {
      activeProcess.type = "work"
      activeProcess.type_id = workId
      await activeProcess.save()
    } else {
      await addProcess(userId, "work", workId)
    }

    return res.status(200).json({ status: "ok" })
  } catch (e) {
    console.log("ERR in buy work controller - ", e)
  }
}
