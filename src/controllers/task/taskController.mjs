import UserTask from "../../models/user/userTaskModel.mjs"
import Tasks from "../../models/task/taskModel.js"
import UserParameters from "../../models/user/userParametersModel.mjs"
import levelTaskHandler from "./categoryHandlers/levelTaskHandler.js"
import User from "../../models/user/userModel.mjs"
import learnSkillTaskHandler from "./categoryHandlers/skillTaskHandler.js"
import doTrainingTaskHandler from "./categoryHandlers/doTrainingTaskHandler.js"
import inviteFriendTaskHandler from "./categoryHandlers/inviteFriendTaskHandler.js"

export const addCompletedTask = async (userId, taskType) => {
  try {
    if (await checkTaskStatus(userId, taskType)) return
    await UserTask.create({ user_id: userId, taskType })
  } catch (e) {
    console.log("Error in addCompletedTask ", e)
  }
}

export const checkTaskStatus = async (userId, taskType) => {
  const userTask = await UserTask.findOne({ user_id: userId, taskType })
  if (userTask) return true
  return false
}

export const checkTaskIsCompleted = async (req, res) => {
  try {
    const taskId = parseInt(req.query.taskId)
    const userId = parseInt(req.query.userId)

    if (!taskId || !userId)
      return res.status(400).json({ error: "Task Id or User id is invalid" })

    const task = await Tasks.findOne({ id: taskId }) // Получаем задание и параметры пользователя
    const parameters = await UserParameters.findOne({ id: userId })

    if (!parameters || !task)
      return res.status(404).json({ error: "User or task not found" })

    const userTask = await UserTask.findOne({
      task_id: taskId,
      user_id: userId,
    })
    if (userTask) return res.status(200).json({ status: true, taskId: taskId })

    // Смотрим какое задание нам пришло на проверку
    let completed
    switch (task.category) {
      case "levelTask":
        completed = await levelTaskHandler(
          task.category_parameters.requiredLevel,
          parameters
        )
        break
      case "learnSkillTask":
        completed = await learnSkillTaskHandler(
          userId,
          task.category_parameters.skillId
        )
        break
      case "doTrainingTask":
        completed = await doTrainingTaskHandler(userId)
        break
      case "inviteFriendTask":
        const refCount = task.category_parameters.refCount
        completed = await inviteFriendTaskHandler(userId, refCount)
        break
    }
    if (completed) {
      await UserTask.create({
        user_id: userId,
        task_id: taskId,
        status: "completed",
      })
      return res.status(200).json({ status: true, taskId: taskId })
    }
    return res.status(200).json({ status: false, taskId: taskId })
  } catch (e) {
    console.log("Error in checkTaskIsCompleted ", e)
  }
}

export const claimTaskReward = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId) // Получаем айди пользователя и айди задания
    const taskId = parseInt(req.query.taskId)
    console.log(userId, taskId)
    if (!userId || !taskId)
      return res.status(400).json({ error: "User id or taskId is required" })

    const task = await Tasks.findOne({ id: taskId }) // Получаем задание и параметры пользователя
    const parameters = await UserParameters.findOne({ id: userId })

    if (!parameters || !task)
      return res.status(404).json({ error: "User or task not found" })

    const userTask = await UserTask.findOne({
      task_id: taskId,
      user_id: userId,
    })
    if (!userTask)
      return res.status(400).json({ error: "Task is not completed" })

    if (userTask?.status === "claimed")
      return res.status(400).json({ error: "Task is alredy claimed!" })

    const coinReward = task?.reward || 0

    userTask.status = "claimed"
    parameters.coins += coinReward

    await userTask.save()
    await parameters.save()
    return res.status(200).json({ status: "ok" })
  } catch (e) {
    console.log("Error in claimTaskReward ", e)
  }
}

export const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({}).sort({ id: 1 })
    if (tasks) return res.status(200).send({ tasks })
  } catch (e) {
    console.log("Error while getTasks ", e)
  }
}

export const getUserTasks = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId)
    if (!userId) return res.status(400).json({ error: "User id is incorrect" })

    const tasks = await UserTask.find({ user_id: userId })
    return res.status(200).send({ tasks })
  } catch (e) {
    console.log("Error while getTasks ", e)
  }
}
