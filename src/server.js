import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import usersRouter from "./routes/user/userRoutes.mjs"
import referralRouter from "./routes/referral/referralRoutes.mjs"
import foodsRouter from "./routes/food/foodRoutes.mjs"
import boostRouter from "./routes/boost/boostRoutes.mjs"
import worksRouter from "./routes/work/workRoutes.mjs"
import skillsRouter from "./routes/skill/skillRoutes.mjs"
import gameTimer from "./gameTimer/gameTimer.mjs"
import processRouter from "./routes/process/processRoutes.mjs"
import dotenv from "dotenv"
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

gameTimer.FoodProccess.start()
console.log("Запустил процессы еды")
gameTimer.SkillProccess.start()
console.log("Запустил процессы изучения навыков")
gameTimer.TrainingProccess.start()
console.log("Запустил процессы тренировок")
gameTimer.WorkProccess.start()
console.log("Запустил процессы работы")


app.use("/api/process/", processRouter)
app.use("/api/users/", usersRouter)
app.use("/api/referrals/", referralRouter)
app.use("/api/foods/", foodsRouter)
app.use("/api/boosts/", boostRouter)
app.use("/api/works/", worksRouter)
app.use("/api/skills/", skillsRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
