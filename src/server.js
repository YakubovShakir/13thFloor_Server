import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import usersRouter from "./routes/user/userRoutes.mjs"
import referralRouter from "./routes/referral/referralRoutes.mjs"
import foodsRouter from "./routes/food/foodRoutes.mjs"
import boostRouter from "./routes/boost/boostRoutes.mjs"
import worksRouter from "./routes/work/workRoutes.mjs"
import skillsRouter from "./routes/skill/skillRoutes.mjs"
import processRouter from "./routes/process/processRoutes.mjs"
import levelsRouter from "./routes/level/levelRoutes.mjs"
import dotenv from "dotenv"

import ClothingItems from "./models/clothing/migration.js"
import SkillItems from "./models/skill/migration.js"
import FoodItems from "./models/food/migration.js"
import BoostItems from "./models/boost/migration.js"
import WorkItems from "./models/work/migration.js"
import LevelItems from "./models/level/migration.js"
import TrainingItems from "./models/training/migration.js"

import Clothing from "./models/clothing/clothingModel.mjs"
import Skill from "./models/skill/skillModel.mjs"
import Food from "./models/food/foodModel.mjs"
import Boost from "./models/boost/boostModel.mjs"
import Work from "./models/work/workModel.mjs"
import LevelsParameters from "./models/level/levelParametersModel.mjs"
import TrainingParameters from "./models/training/trainingParameters.mjs"
import UserParameters from "./models/user/userParametersModel.mjs"
import UserCurrentInventory from "./models/user/userInventoryModel.js"
import UserClothing from "./models/user/userClothingModel.mjs"
import User from "./models/user/userModel.mjs"
import ShelfItemModel from "./models/shelfItem/shelfItemModel.js"
import { ShelfItems } from "./models/shelfItem/migration.js"
import UserLaunchedInvestments from "./models/investments/userLaunchedInvestments.mjs"
import Investments from "./models/investments/investmentModel.mjs"
import InvestmentsMigration from './models/investments/migration.js'
import CompletedTasks from "./models/tasks/completedTask.mjs"
import Tasks from "./models/tasks/taskModel.mjs"
import TasksMigration from './models/tasks/migration.mjs'
import UserSkill from "./models/user/userSkillModel.mjs"
import UserProcess from './models/process/processModel.mjs'

dotenv.config()

const app = express()
// const corsOptions = {
//   origin: process.env.CORS_ORIGIN,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// }

app.use(cors())
app.use(express.json())

connectDB().then(() => {
  if (process.env.NODE_ENV === "test") main()
})

app.use("/api/process/", processRouter)
app.use("/api/users/", usersRouter)
app.use("/api/referrals/", referralRouter)
app.use("/api/food/", foodsRouter)
app.use("/api/boost/", boostRouter)
app.use("/api/work/", worksRouter)
app.use("/api/skill/", skillsRouter)
app.use("/api/levels/", levelsRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

async function main() {
  await Promise.all([
    deleteAndInsertClothing(),
    deleteAndInsertWork(),
    deleteAndInsertFood(),
    deleteAndInsertSkill(),
    deleteAndInsertBoost(),
    deleteAndInsertLevels(),
    deleteAndInsertTraining(),
    // deleteUserParameters(),
    // deleteUserInventories(),
    // deleteUserClothing(),
    // deleteUsers(),
    // deleteUserProcesses(),
    deleteShelfItems(),
    deleteInvestments(),
    deleteTasks()
  ])
}

async function deleteTasks() {
  await CompletedTasks.deleteMany()
  await Tasks.deleteMany()
  await Promise.all(
    TasksMigration.map(async (item) => {
      const task = new Tasks(item)
      await task.save()
    })
  )
}

async function deleteInvestments() {
  await UserLaunchedInvestments.deleteMany()
  await Investments.deleteMany()
  await Promise.all(
    InvestmentsMigration.map(async (item) => {
      const investments = new Investments(item)
      await investments.save()
    })
  )
}

async function deleteUserProcesses() {
  await UserProcess.deleteMany()
}

async function deleteShelfItems() {
  await ShelfItemModel.deleteMany()
  await Promise.all(
    ShelfItems.map(async (item) => {
      const shelfItem = new ShelfItemModel({ ...item })
      await shelfItem.save()
    })
  )
}

async function deleteAndInsertClothing() {
  await Clothing.deleteMany()
  await Promise.all(
    ClothingItems.map(async (item) => {
      const clothes = new Clothing({ ...item, effect: {} })
      await clothes.save()
    })
  )
}

async function deleteAndInsertWork() {
  await Work.deleteMany()
  await Promise.all(
    WorkItems.map(async (item) => {
      const work = new Work({ ...item, effect: {} })
      await work.save()
    })
  )
}

async function deleteAndInsertFood() {
  await Food.deleteMany()
  await Promise.all(
    FoodItems.map(async (item) => {
      const food = new Food({ ...item, effect: {} })
      await food.save()
    })
  )
}

async function deleteAndInsertSkill() {
  await Skill.syncIndexes()
  await Skill.deleteMany({})
  await Promise.all(
    SkillItems.map(async (item) => {
      const skill = new Skill({ ...item, effect: {} })
      await skill.save()
    })
  )
}

async function deleteAndInsertBoost() {
  await Boost.deleteMany()
  await Promise.all(
    BoostItems.map(async (item) => {
      const boost = new Boost({ ...item, effect: {} })
      await boost.save()
    })
  )
}

async function deleteAndInsertLevels() {
  await LevelsParameters.deleteMany()
  await Promise.all(
    LevelItems.map(async (item) => {
      const level = new LevelsParameters({ ...item, effect: {} })
      await level.save()
    })
  )
}

async function deleteAndInsertTraining() {
  await TrainingParameters.deleteMany()
  await Promise.all(
    TrainingItems.map(async (item) => {
      const training = new TrainingParameters({ ...item, effect: {} })
      await training.save()
    })
  )
}

async function deleteUserParameters() {
  await UserParameters.deleteMany()
}

async function deleteUserInventories() {
  await UserCurrentInventory.deleteMany()
}

async function deleteUserClothing() {
  await UserClothing.deleteMany()
}
async function deleteUsers() {
  await User.deleteMany()
  await User.syncIndexes()
  await UserParameters.deleteMany()
  await UserSkill.deleteMany()
}
