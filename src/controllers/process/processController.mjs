import process from "../../models/process/processModel.mjs"
import User from "../../models/user/userModel.mjs"
import startWork, { checkCanStopWork } from "../work/functions/startWork.mjs"
import startTraining, {
  checkCanStopTraining,
} from "../training/functions/startTraining.mjs"
import { checkCanStopSleep, startSleep } from "../sleep/sleepController.mjs"
import buySkill from "../skill/functions/buySkill.mjs"
import buyFood from "../food/functions/buyFood.mjs"
import Work from "../../models/work/workModel.mjs"
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
        break
      case "training":
        result = await startTraining(userId)
        break
      case "sleep":
        result = await startSleep(userId)
        break
      case "skill":
        const skillId = parseInt(req.query.typeId)
        const sub_type = req.query.sub_type
        console.log(sub_type)
        if (!skillId)
          return res.status(400).json({ error: "Incorrect skillId!" })
        result = await buySkill(userId, skillId, sub_type)
        break
      case "food":
        const foodId = parseInt(req.query.typeId)
        if (!foodId) return res.status(400).json({ error: "Incorrect foodId!" })
        result = await buyFood(userId, foodId)
        break
    }
    return res.status(result?.status).json({ ...result?.data })
  } catch (e) {
    console.log("Error in startProcess - ", e)
  }
}

export const stopActiveProcess = async (req, res) => {
  console.log("Stopping process")
  const userId = parseInt(req.query.id)
  if (!userId) return res.status(400).json({ error: "<id> is required!" })

  const user = await User.findOne({ id: userId })
  if (!user) return res.status(404).json({ error: "User not found!" })

  const activeProcess = await process.findOne({ id: userId, active: true })
  console.log(userId)
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
    if (!["food", "work", "skill", "training", "boost"].includes(processType))
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

export const checkCanStop = async (req, res) => {
  console.log("yes")
  const userId = parseInt(req.params.id)

  const activeProcess = await process.findOne({ id: userId, active: true })
  if(!activeProcess) {
    return res.status(404).json({})
  }
  switch (activeProcess?.type) {
    case "work":
      try {
        const { status, data } = await checkCanStopWork(userId, activeProcess)
        console.log("process stopped")
        return res.status(status).json(data)
      } catch (err) {
        console.log(err)
        return res.status(err.status).json(err.data)
      }
    case "training":
      try {
        const { status, data } = await checkCanStopTraining(
          userId,
          activeProcess
        )
        console.log("process stopped")
        return res.status(status).json(data)
      } catch (err) {
        console.log(err)
        return res.status(err.status).json(err.data)
      }
      case "sleep":
        try {
          const { status, data } = await checkCanStopSleep(
            userId,
            activeProcess
          )
          console.log("process stopped")
          return res.status(status).json(data)
        } catch (err) {
          console.log(err)
          return res.status(err.status).json(err.data)
        }
    default:
      return res.status(200).json({ status: 'ok' })
  }
}

export const getUserActiveProcess = async (req, res) => {
  try {
    const userId = parseInt(req.query.id)
    if (!userId) return res.status(400).json({ error: "<id> is required!" })

    let user = await User.findOne({ id: userId })
    if (!user)
      user = await new User({
        id: userId,
        prestart: true,
        personage: {},
        shelf: [],
      }).save()

    const activeProcess = await process.findOne(
      {
        id: userId,
        active: true,
      },
      { _id: false }
    )

    if (activeProcess) {
      let activeProcessWithCoins

      if (activeProcess.type === "work") {
        const work = await Work.findOne({ work_id: activeProcess.type_id })
        activeProcessWithCoins = { ...activeProcess._doc }
        activeProcessWithCoins.coins_in_hour = work?.coins_in_hour || null
      }
      return res
        .status(200)
        .json({ process: activeProcessWithCoins || activeProcess })
    } else {
      return res.status(200).json({ process: null })
    }
  } catch (e) {
    console.log("Error while getUserActiveProcesses - ", e)
  }
}

export default {
  startProcess,
  stopActiveProcess,
  getUserActiveProcess,
  getUserProcesses,
}