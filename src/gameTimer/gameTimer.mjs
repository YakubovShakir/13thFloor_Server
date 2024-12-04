import { FoodProccess } from "./tasks/FoodProcess/task.mjs"
import { SkillProccess } from "./tasks/SkillProcess/task.mjs"
import { WorkProccess } from "./tasks/WorkProcess/task.mjs"
import { TrainingProccess } from "./tasks/TrainingProcess/task.mjs"
import { SleepProccess } from "./tasks/SleepProcess/task.mjs"

import dotenv from "dotenv"
dotenv.config()

import connectDB from "../config/db.js"

const gameTimer = {
  FoodProccess,
  SkillProccess,
  TrainingProccess,
  WorkProccess,
  SleepProccess
}


connectDB()
gameTimer.FoodProccess.start()
console.log("Запустил процессы еды")
gameTimer.SkillProccess.start()
console.log("Запустил процессы изучения навыков")
gameTimer.TrainingProccess.start()
console.log("Запустил процессы тренировок")
gameTimer.WorkProccess.start()
console.log("Запустил процессы работы")
gameTimer.SleepProccess.start()
console.log("Запустил процессы сна")
export default gameTimer
