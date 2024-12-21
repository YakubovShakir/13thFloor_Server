import express from "express"
import {
  getUserTasks,
  getTasks,
} from "../../controllers/task/taskController.mjs"

const taskRouter = express.Router()
taskRouter.get("/getAll", getTasks)
taskRouter.get("/getUserTasks", getUserTasks)
export default taskRouter
