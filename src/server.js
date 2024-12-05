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
import ClothingItems from './models/clothing/migration.js'
import Clothing from "./models/clothing/clothingModel.mjs"
dotenv.config()

const app = express()
// const corsOptions = {
//   origin: process.env.CORS_ORIGIN,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// }

app.use(cors())
app.use(express.json())

connectDB()
  // .then(() => main())


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

// Migration
// async function main() {
//   for(const item of ClothingItems) {
//     const clothes = new Clothing({...item, effect: {}})
//     await clothes.save()
//   }
// }
