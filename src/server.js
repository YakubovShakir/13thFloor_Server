import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import usersRoutes from "./routes/usersRoutes.mjs"
import referralRoutes from "./routes/referralRoutes.mjs"
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

app.use("/api/users/", usersRoutes)
app.use("/api/referrals/", referralRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
