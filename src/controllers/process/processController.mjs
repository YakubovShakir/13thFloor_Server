import process from "../../models/process/processModel.mjs"
import Food from "../../models/food/foodModel.mjs"
import User from "../../models/user/userModel.mjs"
import Skill from "../../models/skill/skillModel.mjs"
import TrainingParameters from "../../models/training/trainingParameters.mjs"

export const addProcess = async (userId, type, typeId) => {
  try {
    let params = {
      id: userId,
      type: type,
      type_id: typeId,
      seconds: new Date().getUTCSeconds(),
    }
    switch (type) {
      case "food":
        const food = await Food.findOne({ food_id: typeId })
        params = { ...params, active: false, duration: food?.duration }
        await process.create(params)
        break
      case "skill":
        const skill = await Skill.findOne({ skill_id: typeId })
        params = { ...params, active: false, duration: skill?.duration }
        await process.create(params)
        break
      case "training":
        const tp = await TrainingParameters.findOne({ level: typeId })
        params = { ...params, active: true, duration: tp?.duration }
        await process.create(params)
        break
      case "work":
        params = { ...params, active: true, duration: 100 }
        await process.create(params)
      default:
        console.log("Unknown process type")
    }
  } catch (e) {
    console.log("Error while add Process", e)
  }
}

export const stopActiveProcess = async (req, res) => {
  const userId = parseInt(req.params.id)
  if (!userId) return res.status(400).json({ error: "Id is not valid" })

  const user = await User.findOne({ id: userId })
  if (!user) return res.status(404).json({ error: "User not found" })

  const activeProcess = await process.findOne({ id: userId, active: true })
  if (!activeProcess)
    return res.status(404).json({ error: "Active Process not found" })

  await process.deleteOne({ id: userId, active: true })
  return res.status(200).json({ status: "ok" })
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

    const userProcessses = await process.find(
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
