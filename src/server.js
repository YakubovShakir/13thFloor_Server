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

import Clothing from "./models/clothing/clothingModel.mjs"
import Skill from "./models/skill/skillModel.mjs"
import Food from "./models/food/foodModel.mjs"
import Boost from "./models/boost/boostModel.mjs"
import Work from "./models/work/workModel.mjs"

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
  //Clothing Migration
  await Clothing.deleteMany()
  for (const item of ClothingItems) {
    const clothes = new Clothing({ ...item, effect: {} })
    await clothes.save()
  }

  //Work Migration
  await Work.deleteMany()
  for (const item of WorkItems) {
    const work = new Work({ ...item, effect: {} })
    await work.save()
  }

  //Food Migration
  await Food.deleteMany()
  for (const item of FoodItems) {
    const food = new Food({ ...item, effect: {} })
    await food.save()
  }

  //Skill Migration
  await Skill.deleteMany()
  for (const item of SkillItems) {
    const skill = new Skill({ ...item, effect: {} })
    await skill.save()
  }
}
