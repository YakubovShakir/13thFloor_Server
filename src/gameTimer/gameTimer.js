import { log } from "../utils/log.js"

import {
  RefsRecalsProcess,
  SkillProccess,
  WorkProcess,
  TrainingProccess,
  SleepProccess,
  AutoclaimProccess,
  BoostProccess,
  FoodProccess,
} from "./universal.js"
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
  AutoclaimProccess,
  RefsRecalsProcess,
}

connectDB()
gameTimer.FoodProccess.start()
log("info", "Started food processes")
gameTimer.SkillProccess.start()
log("info", "Started skill learning processes")
gameTimer.TrainingProccess.start()
log("info", "Started training processes")
gameTimer.WorkProcess.start()
log("info", "Started work processes")
gameTimer.SleepProccess.start()
log("info", "Started sleep processes")
gameTimer.BoostProccess.start()
log("info", "Started boost processes")
AutoclaimProccess.start()
log("info", "Started autoclaim process")
RefsRecalsProcess.start()
log("info", "Started refs calculation process")
export default gameTimer
