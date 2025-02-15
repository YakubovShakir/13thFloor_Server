// import { FoodProccess } from "./tasks/FoodProcess/task.js"
// import { SkillProccess } from "./tasks/SkillProcess/task.js"
// import { WorkProcess } from "./tasks/WorkProcess/task.js"
// import { TrainingProccess } from "./tasks/TrainingProcess/task.js"
// import { SleepProccess } from "./tasks/SleepProcess/task.js"
// import { AutoclaimProccess } from './tasks/autoclaimInvestmentProcess.js'
// import BoostProccess from "./tasks/BoostProcess/task.js"

import { FoodProccess } from "./universal.js"
import { SkillProccess } from "./universal.js"
import { WorkProcess } from "./universal.js"
import { TrainingProccess } from "./universal.js"
import { SleepProccess } from "./universal.js"
import { AutoclaimProccess } from "./universal.js"
import { BoostProccess } from "./universal.js"
import dotenv from "dotenv"
dotenv.config()

import connectDB from "../config/db.js"

const gameTimer = {
  FoodProccess,
  SkillProccess,
  TrainingProccess,
  WorkProcess,
  SleepProccess,
  BoostProccess,
}

connectDB()
gameTimer.FoodProccess.start()
console.log("Запустил процессы еды")
gameTimer.SkillProccess.start()
console.log("Запустил процессы изучения навыков")
gameTimer.TrainingProccess.start()
console.log("Запустил процессы тренировок")
gameTimer.WorkProcess.start()
console.log("Запустил процессы работы")
gameTimer.SleepProccess.start()
console.log("Запустил процессы сна")
gameTimer.BoostProccess.start()
// console.log("Запустил процессы бустов")
// AutoclaimProccess.start()
console.log("Запустил процесс автоклейма")
export default gameTimer
