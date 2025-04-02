import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import usersRouter from "./routes/user/userRoutes.js"
import referralRouter from "./routes/referral/referralRoutes.js"
import foodsRouter from "./routes/food/foodRoutes.js"
import boostRouter from "./routes/boost/boostRoutes.js"
import worksRouter from "./routes/work/workRoutes.js"
import skillsRouter from "./routes/skill/skillRoutes.js"
import processRouter from "./routes/process/processRoutes.js"
import levelsRouter from "./routes/level/levelRoutes.js"
import dotenv from "dotenv"
import IORedis from "ioredis"
import crypto from "crypto"

import winston from "winston"

import ClothingItems from "./models/clothing/migration.js"
import SkillItems from "./models/skill/migration.js"
import FoodItems from "./models/food/migration.js"
import BoostItems from "./models/boost/migration.js"
import WorkItems from "./models/work/migration.js"
import LevelItems from "./models/level/migration.js"
import TrainingItems from "./models/training/migration.js"

import Clothing from "./models/clothing/clothingModel.js"
import Skill from "./models/skill/skillModel.js"
import Food from "./models/food/foodModel.js"
import Boost from "./models/boost/boostModel.js"
import Work from "./models/work/workModel.js"
import LevelsParameters from "./models/level/levelParametersModel.js"
import TrainingParameters from "./models/training/trainingParameters.js"
import UserParameters from "./models/user/userParametersModel.js"
import UserCurrentInventory from "./models/user/userInventoryModel.js"
import UserClothing from "./models/user/userClothingModel.js"
import User from "./models/user/userModel.js"
import ShelfItemModel from "./models/shelfItem/shelfItemModel.js"
import { ShelfItems } from "./models/shelfItem/migration.js"
import UserLaunchedInvestments from "./models/investments/userLaunchedInvestments.js"
import Investments from "./models/investments/investmentModel.js"
import InvestmentsMigration from "./models/investments/migration.js"
import CompletedTasks from "./models/tasks/completedTask.js"
import Tasks from "./models/tasks/taskModel.js"
import TasksMigration from "./models/tasks/migration.js"
import UserSkill from "./models/user/userSkillModel.js"
import UserProcess from "./models/process/processModel.js"
import { ConstantEffects } from "./models/effects/constantEffectsLevels.js"
import constantEffects from "./models/effects/migration.js"
import UserBoost from "./models/user/userBoostsModel.js"
import { UserSpins } from "./models/user/userSpinsModel.js"
import StarsTransactions from "./models/tx/starsTransactionModel.mjs"
import { ElasticsearchTransport as Elasticsearch } from "winston-elasticsearch"
import { Client } from "@elastic/elasticsearch"

dotenv.config()

// Redis connection
const redis = new IORedis({
  host: process.env.REDIS_HOST || "redis-test",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  password: process.env.REDIS_PASSWORD || "redis_password",
})

redis.on("connect", () => console.log("Redis connected for middleware"))
redis.on("error", (err) => console.error("Redis error in middleware:", err))

const app = express()

app.use(cors())
app.use(express.json())

// Global middleware to validate Telegram initData and attach user.id
const validateTelegramInitData = async (req, res, next) => {
  const initData = req.headers.authorization

  if (!initData || !initData.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization header missing or invalid" })
  }

  const token = initData.replace("Bearer ", "")
  const cacheKey = `tg:initData:${crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")}`
  const TTL = 30 * 60 // 30 minutes in seconds

  try {
    const cached = await redis.get(cacheKey)
    if (cached) {
      const [validity, userId] = cached.split(":")
      if (validity === "valid") {
        logger.info("Cached valid initData", { cacheKey })
        req.userId = parseInt(userId, 10)
        return next()
      }
    }

    const params = new URLSearchParams(token)
    const authDate = parseInt(params.get("auth_date"), 10)
    const hash = params.get("hash")
    const userRaw = params.get("user")

    if (!authDate || !hash || !userRaw) {
      return res.status(401).json({ error: "Invalid initData format" })
    }

    let user
    try {
      user = JSON.parse(userRaw)
      if (!user.id) throw new Error("User ID missing")
    } catch (e) {
      return res.status(401).json({ error: "Invalid user data in initData" })
    }
    const userId = user.id

    const now = Math.floor(Date.now() / 1000)
    if (now - authDate > TTL) {
      return res.status(401).json({ error: "initData expired" })
    }

    params.delete("hash")
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    if (!botToken) {
      throw new Error("TELEGRAM_BOT_TOKEN not set in environment")
    }

    const dataCheckString = Array.from(params.entries())
      .sort()
      .map(([key, value]) => `${key}=${value}`)
      .join("\n")
    const secretKey = crypto
      .createHmac("sha256", "WebAppData")
      .update(botToken)
      .digest()
    const computedHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex")

    if (computedHash !== hash) {
      return res.status(401).json({ error: "Invalid initData hash" })
    }

    await redis.set(cacheKey, `valid:${userId}`, "EX", TTL)
    logger.info("Validated and cached initData", { cacheKey, userId })
    req.userId = userId
    next()
  } catch (error) {
    logger.error("Error validating initData", {
      error: error.message,
      stack: error.stack,
    })
    res.status(500).json({ error: "Internal server error" })
  }
}

if (process.env.USE_AUTH !== "false") {
  app.use(validateTelegramInitData)
} else {
  app.use((req, res, next) => {
    req.userId = process.env.DEV_ID || "790629329"
    next()
  })
}

// Elasticsearch client setup
const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
  // Optional: Add authentication if needed
  // auth: {
  //   username: "elastic",
  //   password: "your_password",
  // },
})

// Custom transport to write directly to Elasticsearch
class ElasticsearchTransport extends winston.Transport {
  constructor(opts) {
    super(opts)
    this.esClient = esClient
    this.indexPrefix = opts.indexPrefix || "app-logs"
  }

  async log(info, callback) {
    setImmediate(() => this.emit("logged", info))

    const { timestamp, level, message, ...meta } = info
    const logEntry = {
      "@timestamp": timestamp || new Date().toISOString(),
      "log.level": level,
      message,
      ...meta,
      ecs: { version: "1.8.0" }, // ECS version for compatibility
    }

    try {
      await this.esClient.index({
        index: `${this.indexPrefix}-${new Date().toISOString().slice(0, 10)}`, // e.g., app-logs-2025.04.01
        body: logEntry,
      })
    } catch (error) {
      console.error("Failed to write to Elasticsearch:", error) // Fallback to console
    }

    callback()
  }
}

// Create the logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
          }`
        })
      ),
    }),
    new ElasticsearchTransport({
      level: "info",
      indexPrefix: "app-logs",
    }),
  ],
})

// Global request logging middleware
const requestLogger = (req, res, next) => {
  const startTime = Date.now()

  // Capture request details
  const requestData = {
    method: req.method,
    url: req.url,
    // headers: req.headers,
    body: req.body, // Note: Ensure body-parser is used if logging POST/PUT bodies
    ip: req.ip,
    "http.version": req.httpVersion,
  }

  // Log the request
  logger.info("HTTP Request", {
    "http.request": requestData,
    "http.response": responseData,
  })

  next()
}

app.use(requestLogger)

connectDB().then(() => {
  if (process.env.NODE_ENV === "test") main()
  new StarsTransactions({
    user_id: 790629329,
    amount: 5000,
    currency: "XTR",
    status: "complete",
    affiliate_id: 790629329,
    product_type: "autoclaim",
    product_id: "game_center",
  }).save()
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
    //! PROGRESS
    deleteUserParameters(),
    deleteUserInventories(),
    deleteUserClothing(),
    deleteUsers(),
    deleteUserProcesses(),
    deleteUserInvestments(),
    deleteUserTasks(),
    deleteUserBoosts(),
    //! SAFE MIGRATIONS
    deleteAndInsertClothing(),
    deleteAndInsertWork(),
    deleteAndInsertFood(),
    deleteAndInsertSkill(),
    deleteAndInsertBoost(),
    deleteAndInsertLevels(),
    deleteAndInsertTraining(),
    deleteShelfItems(),
    deleteInvestments(),
    deleteTasks(),
    deleteConstantEffects(),
    // addSpins(),
  ])
}

async function deleteTasks() {
  await Tasks.deleteMany()
  await Promise.all(
    TasksMigration.map(async (item) => {
      const task = new Tasks(item)
      await task.save()
    })
  )
}

async function addSpins() {
  const users = await User.find({})
  for (const user of users) {
    await Promise.all(
      Array.from(
        new UserSpins({
          is_used: false,
          user_id: user.id,
          type: "daily",
        }).save()
      ).fill(5)
    )
  }
}

async function deleteUserTasks() {
  await CompletedTasks.deleteMany()
}

async function deleteInvestments() {
  await Investments.deleteMany()
  await Promise.all(
    InvestmentsMigration.map(async (item) => {
      const investments = new Investments(item)
      await investments.save()
    })
  )
}

async function deleteUserInvestments() {
  await UserLaunchedInvestments.deleteMany()
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

async function deleteUserBoosts() {
  await UserBoost.deleteMany()
}

async function deleteAndInsertBoost() {
  await Boost.syncIndexes()
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

async function deleteConstantEffects() {
  await ConstantEffects.deleteMany()
  await Promise.all(
    constantEffects.map(async (effect) => {
      const e = new ConstantEffects(effect)
      await e.save()
    })
  )
}

export { logger }
