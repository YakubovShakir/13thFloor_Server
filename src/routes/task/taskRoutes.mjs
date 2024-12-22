import express from "express"
import {
  getUserTasks,
  getTasks,
  checkTaskIsCompleted,
  claimTaskReward,
} from "../../controllers/task/taskController.mjs"

const taskRouter = express.Router()
taskRouter.get("/getAll", getTasks)
taskRouter.get("/getUserTasks", getUserTasks)
taskRouter.get("/checkCompleted", checkTaskIsCompleted)
taskRouter.post("/claimReward", claimTaskReward)
export default taskRouter
