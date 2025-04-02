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

async function migrateCollection(Model, Items, collectionName, transform = item => item) {
  logger.info(`Starting ${collectionName} migration`);

  const ids = Items.map(item => item.id);
  const validIds = ids.filter(id => id !== null && id !== undefined);
  const duplicates = validIds.filter((id, index) => validIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    logger.error(`Duplicate IDs found in ${collectionName}:`, { duplicates });
    throw new Error(`Duplicate IDs in ${collectionName}: ${duplicates}`);
  }
  const invalidItems = Items.filter(item => item.id === null || item.id === undefined);
  if (invalidItems.length > 0) {
    logger.warn(`Items without IDs found in ${collectionName}:`, { count: invalidItems.length });
    throw new Error(`All ${collectionName} must have valid IDs for migration`);
  }

  await Model.ensureIndexes();
  logger.info(`${collectionName} indexes verified`);

  const operations = Items.map(item => ({
    replaceOne: {
      filter: { id: item.id },
      replacement: transform(item),
      upsert: true
    }
  }));

  const BATCH_SIZE = 1000;
  const batches = [];
  for (let i = 0; i < operations.length; i += BATCH_SIZE) {
    batches.push(operations.slice(i, i + BATCH_SIZE));
  }

  const CONCURRENCY_LIMIT = 5;
  let activePromises = [];
  for (const batch of batches) {
    const batchPromise = Model.bulkWrite(batch);
    activePromises.push(batchPromise);
    if (activePromises.length >= CONCURRENCY_LIMIT) {
      await Promise.all(activePromises);
      activePromises = [];
    }
  }
  if (activePromises.length > 0) {
    await Promise.all(activePromises);
  }

  const itemIds = Items.map(item => item.id);
  await Model.deleteMany({ id: { $nin: itemIds } });
  logger.info(`Removed extra documents from ${collectionName}`);

  logger.info(`${collectionName} migration completed`, { totalProcessed: Items.length });
}

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
  const migrations = [
    deleteUserParameters,
    deleteUserInventories,
    deleteUsers,
    deleteUserProcesses,
    deleteUserInvestments,
    deleteUserTasks,
    deleteUserBoosts,
    deleteAndInsertClothing,
    deleteAndInsertWork,
    deleteAndInsertFood,
    deleteAndInsertSkill,
    deleteAndInsertBoost,
    deleteAndInsertLevels,
    deleteAndInsertTraining,
    deleteShelfItems,
    deleteInvestments,
    deleteTasks,
    deleteConstantEffects,
  ];

  for (const migration of migrations) {
    try {
      logger.info(`Executing ${migration.name}`);
      await migration();
      logger.info(`Completed ${migration.name}`);
    } catch (error) {
      logger.error(`Failed ${migration.name}`, { error });
      throw error; // Re-throw to stop execution and debug
    }
  }
}

async function deleteTasks() {
  await migrateCollection(Tasks, TasksMigration, 'tasks');
}

async function deleteUserTasks() {
  logger.info('Starting user tasks deletion');
  try {
    await UserCompletedTask.collection.drop();
    logger.info('UserCompletedTask collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop UserCompletedTask collection:', { error: err });
      throw err;
    }
    logger.info('UserCompletedTask collection didn’t exist, proceeding');
  }
  await UserCompletedTask.ensureIndexes();
  logger.info('UserCompletedTask indexes recreated');
}

async function deleteInvestments() {
  await migrateCollection(Investments, InvestmentsMigration, 'investments');
}

async function deleteUserInvestments() {
  logger.info('Starting user investments deletion');
  try {
    await UserLaunchedInvestments.collection.drop();
    logger.info('UserLaunchedInvestments collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop UserLaunchedInvestments collection:', { error: err });
      throw err;
    }
    logger.info('UserLaunchedInvestments collection didn’t exist, proceeding');
  }
  await UserLaunchedInvestments.ensureIndexes();
  logger.info('UserLaunchedInvestments indexes recreated');
}

async function deleteUserProcesses() {
  logger.info('Starting user processes deletion');
  try {
    await UserProcess.collection.drop();
    logger.info('UserProcess collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop UserProcess collection:', { error: err });
      throw err;
    }
    logger.info('UserProcess collection didn’t exist, proceeding');
  }
  await UserProcess.ensureIndexes();
  logger.info('UserProcess indexes recreated');
}

async function deleteShelfItems() {
  await migrateCollection(ShelfItemModel, ShelfItems, 'shelf_items');
}

async function deleteAndInsertClothing() {
  await migrateCollection(Clothing, ClothingItems, 'clothing', item => ({ ...item, effect: {} }));
}

async function deleteAndInsertWork() {
  await migrateCollection(Work, WorkItems, 'work', item => ({ ...item, effect: {} }));
}

async function deleteAndInsertFood() {
  await migrateCollection(Food, FoodItems, 'food', item => ({ ...item, effect: {} }));
}

async function deleteAndInsertSkill() {
  await migrateCollection(Skill, SkillItems, 'skill', item => ({ ...item, effect: {} }));
}

async function deleteUserBoosts() {
  logger.info('Starting user boosts deletion');
  try {
    await UserBoost.collection.drop();
    logger.info('UserBoost collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop UserBoost collection:', { error: err });
      throw err;
    }
    logger.info('UserBoost collection didn’t exist, proceeding');
  }
  await UserBoost.ensureIndexes();
  logger.info('UserBoost indexes recreated');
}

async function deleteAndInsertBoost() {
  await migrateCollection(Boost, BoostItems, 'boost', item => ({ ...item, effect: {} }));
}

async function deleteAndInsertLevels() {
  await migrateCollection(LevelsParameters, LevelItems, 'levels', item => ({ ...item, effect: {} }));
}

async function deleteAndInsertTraining() {
  await migrateCollection(TrainingParameters, TrainingItems, 'training', item => ({ ...item, effect: {} }));
}

async function deleteUserParameters() {
  logger.info('Starting user parameters deletion');
  try {
    await UserParameters.collection.drop();
    logger.info('UserParameters collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop UserParameters collection:', { error: err });
      throw err;
    }
    logger.info('UserParameters collection didn’t exist, proceeding');
  }
  await UserParameters.ensureIndexes();
  logger.info('UserParameters indexes recreated');
}

async function deleteUserInventories() {
  logger.info('Starting user inventories deletion');
  try {
    await UserCurrentInventory.collection.drop();
    logger.info('UserCurrentInventory collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop UserCurrentInventory collection:', { error: err });
      throw err;
    }
    logger.info('UserCurrentInventory collection didn’t exist, proceeding');
  }
  await UserCurrentInventory.ensureIndexes();
  logger.info('UserCurrentInventory indexes recreated');
}

async function deleteUsers() {
  logger.info('Starting users deletion');
  try {
    await User.collection.drop();
    logger.info('User collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop User collection:', { error: err });
      throw err;
    }
    logger.info('User collection didn’t exist, proceeding');
  }
  await User.ensureIndexes();
  logger.info('User indexes recreated');

  try {
    await UserParameters.collection.drop();
    logger.info('UserParameters collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop UserParameters collection:', { error: err });
      throw err;
    }
    logger.info('UserParameters collection didn’t exist, proceeding');
  }
  await UserParameters.ensureIndexes();
  logger.info('UserParameters indexes recreated');

  try {
    await UserSkill.collection.drop();
    logger.info('UserSkill collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop UserSkill collection:', { error: err });
      throw err;
    }
    logger.info('UserSkill collection didn’t exist, proceeding');
  }
  await UserSkill.ensureIndexes();
  logger.info('UserSkill indexes recreated');
}

async function deleteConstantEffects() {
  await migrateCollection(ConstantEffects, constantEffects, 'constant_effects');
}

export { logger }