import UserTask from "../../models/user/userTaskModel.mjs"
import Tasks from "../../models/task/taskModel.js"
import UserParameters from "../../models/user/userParametersModel.mjs"
import levelTaskHandler from "./categoryHandlers/levelTaskHandler.js"

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

export const claimTaskReward = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId) // Получаем айди пользователя и айди задания
    const taskId = req.query.taskId
    if (!userId || !taskId)
      return res.status(400).json({ error: "User id or taskId is required" })

    const task = await Tasks.findOne({ id: taskId }) // Получаем задание и параметры пользователя
    const parameters = await Tasks.findOne({ id: userId })

    if (!parameters || !task)
      return res.status(404).json({ error: "User or task not found" })

    const coinReward = task?.reward || 0

    // Смотрим какое задание нам пришло на проверку
    let completed
    switch (task.category) {
      case "levelTask":
        await levelTaskHandler(
          task.category_parameters.requiredLevel,
          parameters
        )
        completed = true
        break
    }
    if (completed) {
      parameters.coins += coinReward
      await parameters.save()

      await UserTask.create({ user_id: userId, task_id: taskId })
    }
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

    const userTasks = await UserTask.find({ user_id: userId })
    return res.status(200).send({ tasks })
  } catch (e) {
    console.log("Error while getTasks ", e)
  }
}
