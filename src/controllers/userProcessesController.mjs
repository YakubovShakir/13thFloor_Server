import UserProcess from "../models/userProcessModel.mjs"
import Food from "../models/foodModel.mjs"
import User from "../models/userModel.mjs"
import Skill from "../models/skillModel.mjs"
import TrainingParameters from "../models/trainingsParameters.mjs"

export const addProcess = async (userId, type, typeId) => {
  try {
    let params = {
      id: userId,
      type: type,
      type_id: typeId,
    }
    switch (type) {
      case "food":
        console.log("добавляю процесс еды")
        const food = await Food.findOne({ food_id: typeId })
        params = { ...params, active: false, duration: food?.duration }
        await UserProcess.create(params)
        break
      case "skill":
        console.log("добавляю процесс изучения навыка")
        const skill = await Skill.findOne({ skill_id: typeId })
        params = { ...params, active: false, duration: skill?.duration }
        await UserProcess.create(params)
        break
      case "training":
        console.log("добавляю процесс тренировки")
        const tp = await TrainingParameters.findOne({ level: typeId })
        params = { ...params, active: true, duration: tp?.duration }
        await UserProcess.create(params)
        break
      default:
        console.log("Unknown process type")
    }
  } catch (e) {
    console.log("Error while add Process", e)
  }
}

export const getUserProcesses = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    if (!userId) return res.status(400).json({ error: "Id is not valid" })

    const user = await User.findOne({ id: userId })
    if (!user) return res.status(404).json({ error: "User not found" })

    const processType = req.params.type
    if (!["food", "work", "skill", "training"].includes(processType))
      return res.status(400).json({ error: "Not valid type" })

    const userProcessses = await UserProcess.find(
      {
        id: userId,
        type: processType,
      },
      { _id: false }
    )

    if (userProcessses.length != 0)
      return res.status(200).json({ processes: userProcessses })
    else return res.status(404).json({ processes: [] })
  } catch (e) {
    console.log("Error while getUserProcesses - ", e)
  }
}
