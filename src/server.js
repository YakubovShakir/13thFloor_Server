import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import usersRouter from "./routes/usersRoutes.mjs"
import referralRouter from "./routes/referralRoutes.mjs"
import foodsRouter from "./routes/foodsRoutes.mjs"
import boostRouter from "./routes/boostsRoutes.mjs"
import worksRouter from "./routes/worksRoutes.mjs"
import skillsRouter from "./routes/skillsRoutes.mjs"
import gameTimer from "./cron/cron.js"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Разрешаем отправку куки
}

app.use(cors())
app.use(express.json())

connectDB()

gameTimer.FoodProccess.start()
console.log("Запустил процессы еды")
gameTimer.SkillProccess.start()
console.log("Запустил процессы изучения навыков")

gameTimer.TrainingProccess.start()
console.log("Запустил процессы тренировок")

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
