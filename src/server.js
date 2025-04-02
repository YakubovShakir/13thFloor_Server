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
import mongoose, { syncIndexes } from "mongoose"
import UserCompletedTask from "./models/user/userCompletedTaskModel.js"

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
  node: process.env.ELASTICSEARCH_URL || "http://elasticsearch:9200",
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
  for (const promise of [
    //! PROGRESS
    deleteUserParameters(),
    deleteUserInventories(),
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
  ]) {
    await promise()
  }
}

async function deleteTasks() {
  await Tasks.deleteMany({});
  await mongoose.syncIndexes();

  for (const item of TasksMigration) {
    try {
      const task = new Tasks(item);
      await task.save();
    } catch (error) {
      console.error(`Failed to insert task with id ${item.id}:`, error);
      throw error;
    }
  }
}

async function deleteUserInvestments() {
  await UserLaunchedInvestments.deleteMany({})
  await mongoose.syncIndexes()
}

async function deleteUserProcesses() {
  await UserProcess.deleteMany({})
  await mongoose.syncIndexes()
}

async function deleteInvestments() {
  await Investments.deleteMany({});
  await mongoose.syncIndexes();

  for (const item of InvestmentsMigration) {
    try {
      const investments = new Investments(item);
      await investments.save();
    } catch (error) {
      console.error(`Failed to insert investment with id ${item.id}:`, error);
      throw error;
    }
  }
}

async function deleteUserTasks() {
  await UserCompletedTask.deleteMany({});
  await mongoose.syncIndexes();
}

async function deleteAndInsertWork() {
  await Work.deleteMany({});
  await mongoose.syncIndexes();

  for (const item of WorkItems) {
    try {
      const work = new Work({ ...item, effect: {} });
      await work.save();
    } catch (error) {
      console.error(`Failed to insert work item with id ${item.id}:`, error);
      throw error;
    }
  }
}
async function deleteAndInsertFood() {
  await Food.deleteMany({});
  await mongoose.syncIndexes();

  for (const item of FoodItems) {
    try {
      const food = new Food({ ...item, effect: {} });
      await food.save();
    } catch (error) {
      console.error(`Failed to insert food item with id ${item.id}:`, error);
      throw error;
    }
  }
}

async function deleteAndInsertSkill() 
   
{
  await Skill.deleteMany({});
  await mongoose.syncIndexes();

  for (const item of SkillItems) {
    try {
      const skill = new Skill({ ...item, effect: {} });
      await skill.save();
    } catch (error) {
      console.error(`Failed to insert skill item with id ${item.id}:`, error);
      throw error;
    }
  }
}

async function deleteUserBoosts() {
  await UserBoost.deleteMany({})
  await mongoose.syncIndexes()
}

async function deleteAndInsertBoost() {
  await Boost.deleteMany({});
  await mongoose.syncIndexes();

  for (const item of BoostItems) {
    try {
      const boost = new Boost({ ...item, effect: {} });
      await boost.save();
    } catch (error) {
      console.error(`Failed to insert boost item with id ${item.id}:`, error);
      throw error;
    }
  }
}

async function deleteAndInsertLevels() {
  await LevelsParameters.deleteMany({});
  await mongoose.syncIndexes();

  for (const item of LevelItems) {
    try {
      const level = new LevelsParameters({ ...item, effect: {} });
      await level.save();
    } catch (error) {
      console.error(`Failed to insert level item with id ${item.id}:`, error);
      throw error;
    }
  }
}

async function deleteAndInsertTraining() {
  await TrainingParameters.deleteMany({});
  await mongoose.syncIndexes();

  for (const item of TrainingItems) {
    try {
      const training = new TrainingParameters({ ...item, effect: {} });
      await training.save();
    } catch (error) {
      console.error(`Failed to insert training item with id ${item.id}:`, error);
      throw error;
    }
  }
}

async function deleteUserParameters() {
  await UserParameters.deleteMany({})
  await mongoose.syncIndexes()
}

async function deleteUserInventories() {
  await UserCurrentInventory.deleteMany({})
  await mongoose.syncIndexes()
}

async function deleteAndInsertClothing() {
  await Clothing.deleteMany({});
  await mongoose.syncIndexes();

  for (const item of ClothingItems) {
    try {
      const clothes = new Clothing({ ...item, effect: {} });
      await clothes.save();
    } catch (error) {
      console.error(`Failed to insert clothing item with id ${item.id}:`, error);
      throw error;
    }
  }
}

async function deleteUsers() {
  await User.deleteMany({})
  await mongoose.syncIndexes()
  await UserParameters.deleteMany({})
  await mongoose.syncIndexes()
  await UserSkill.deleteMany({})
  await mongoose.syncIndexes()
}

async function deleteConstantEffects() {
  await ConstantEffects.deleteMany({});
  await mongoose.syncIndexes();

  for (const effect of constantEffects) {
    try {
      const e = new ConstantEffects(effect);
      await e.save();
    } catch (error) {
      console.error(`Failed to insert constant effect with id ${effect.id}:`, error);
      throw error;
    }
  }
}

export { logger }
