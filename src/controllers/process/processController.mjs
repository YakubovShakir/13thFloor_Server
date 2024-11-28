import process from "../../models/process/processModel.mjs"
import User from "../../models/user/userModel.mjs"
import startWork from "../work/functions/startWork.mjs"
import startTraining from "../training/functions/startTraining.mjs"
import buySkill from "../skill/functions/buySkill.mjs"
import buyFood from "../food/functions/buyFood.mjs"

export const startProcess = async (req, res) => {
  try {
    // Проверяем тип процесса
    const processType = req.query.type

    if (!["food", "work", "skill", "training", "sleep"].includes(processType))
      return res.status(400).json({ error: "Not valid type" })
    const userId = parseInt(req.query.id)
    if (!userId) return res.status(400).json({ error: "Incorrect userId" })
    const user = await User.findOne({ id: userId })
    if (!user) return res.status(404).json({ error: "user not found" })

    let result
    switch (processType) {
      case "work":
        result = await startWork(userId)
      case "training":
        result = await startTraining(userId)
      case "sleep":
      // result = await startTraining(userId)
      // return res.status(result.status).json(result.data)
      // break
      case "skill":
        const skillId = parseInt(req.query.skillId)
        if (!skillId)
          return res.status(400).json({ error: "Incorrect skillId!" })
        result = await buySkill(userId, skillId)
      case "food":
        const foodId = parseInt(req.query.foodId)
        if (!foodId) return res.status(400).json({ error: "Incorrect foodId!" })
        result = await buyFood(userId, foodId)
        break
    }

    return res.status(result.status).json(result.data)
  } catch {
    console.log("Error in startProcess - ", e)
  }
}

export const stopActiveProcess = async (req, res) => {
  const userId = parseInt(req.query.id)
  if (!userId) return res.status(400).json({ error: "<id> is required!"})

  const user = await User.findOne({ id: userId })
  if (!user) return res.status(404).json({ error: "User not found!" })

  const activeProcess = await process.findOne({ id: userId, active: true })
  if (!activeProcess)
    return res.status(404).json({ error: "Active Process not found!" })

  await process.deleteOne({ id: userId, active: true })
  return res.status(200).json({ status: "ok" })
}

export const getUserProcesses = async (req, res) => {
  try {
    const userId = parseInt(req.query.id)
    if (!userId) return res.status(400).json({ error: "<id> is required!" })
    const processType = req.query.type
    if (!["food", "work", "skill", "training"].includes(processType))
      return res.status(400).json({ error: "<type> is wrong!" })

    const user = await User.findOne({ id: userId })
    if (!user) return res.status(404).json({ error: "User not found" })

    const processes = await process.find(
      {
        id: userId,
        type: processType,
      },
      { _id: false }
    )

    return res.status(200).json({ processes })
  } catch (e) {
    console.log("Error while getUserProcesses - ", e)
  }
}

export const getUserActiveProcess = async (req, res) => {
  try {
    const userId = parseInt(req.query.id)
    if (!userId) return res.status(400).json({ error: "<id> is required!" })

    const user = await User.findOne({ id: userId })
    if (!user) return res.status(404).json({ error: "User not found!" })

    const activeProcess = await process.findOne(
      {
        id: userId,
        active: true,
      },
      { _id: false }
    )

    return res.status(200).json({ process: activeProcess })
  } catch (e) {
    console.log("Error while getUserActiveProcesses - ", e)
  }
}

export default processController = {
  startProcess,
  stopActiveProcess,
  getUserActiveProcess,
  getUserProcesses,
}
