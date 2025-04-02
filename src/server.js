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
    deleteUserParameters(),
    deleteUserInventories(),
    deleteUsers(),
    deleteUserProcesses(),
    deleteUserInvestments(),
    deleteUserTasks(),
    deleteUserBoosts(),
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
  logger.info('Starting tasks migration');

  const ids = TasksMigration.map(item => item.id);
  const validIds = ids.filter(id => id !== null && id !== undefined);
  const duplicates = validIds.filter((id, index) => validIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    logger.error('Duplicate IDs found in TasksMigration:', { duplicates });
    throw new Error(`Duplicate IDs in TasksMigration: ${duplicates}`);
  }
  const invalidItems = TasksMigration.filter(item => item.id === null || item.id === undefined);
  if (invalidItems.length > 0) {
    logger.warn('Items without IDs found in TasksMigration:', { count: invalidItems.length, items: invalidItems });
  }

  try {
    await Tasks.collection.drop();
    logger.info('Tasks collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop tasks collection:', { error: err });
      throw err;
    }
    logger.info('Tasks collection didn’t exist, proceeding');
  }

  await Tasks.ensureIndexes();
  logger.info('Tasks indexes recreated');

  for (const item of TasksMigration) {
    try {
      const task = new Tasks(item);
      await task.save();
      logger.info('Inserted task', { id: item.id });
    } catch (error) {
      logger.error('Failed to insert task', { id: item.id, error });
      throw error;
    }
  }

  logger.info('Tasks migration completed');
}

async function deleteUserInvestments() {
  logger.info("Starting user investments deletion")

  try {
    await UserLaunchedInvestments.collection.drop()
    logger.info("UserLaunchedInvestments collection dropped")
  } catch (err) {
    if (err.codeName !== "NamespaceNotFound") {
      logger.error("Failed to drop UserLaunchedInvestments collection:", {
        error: err,
      })
      throw err
    }
    logger.info("UserLaunchedInvestments collection didn’t exist, proceeding")
  }

  await UserLaunchedInvestments.ensureIndexes()
  logger.info("UserLaunchedInvestments indexes recreated")
}

async function deleteAndInsertWork() {
  logger.info('Starting work migration');

  const ids = WorkItems.map(item => item.id);
  const validIds = ids.filter(id => id !== null && id !== undefined);
  const duplicates = validIds.filter((id, index) => validIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    logger.error('Duplicate IDs found in WorkItems:', { duplicates });
    throw new Error(`Duplicate IDs in WorkItems: ${duplicates}`);
  }
  const invalidItems = WorkItems.filter(item => item.id === null || item.id === undefined);
  if (invalidItems.length > 0) {
    logger.warn('Items without IDs found in WorkItems:', { count: invalidItems.length, items: invalidItems });
  }

  try {
    await Work.collection.drop();
    logger.info('Work collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop work collection:', { error: err });
      throw err;
    }
    logger.info('Work collection didn’t exist, proceeding');
  }

  await Work.ensureIndexes();
  logger.info('Work indexes recreated');

  for (const item of WorkItems) {
    try {
      const work = new Work({ ...item, effect: {} });
      await work.save();
      logger.info('Inserted work item', { id: item.id });
    } catch (error) {
      logger.error('Failed to insert work item', { id: item.id, error });
      throw error;
    }
  }

  logger.info('Work migration completed');
}

async function deleteUserProcesses() {
  logger.info("Starting user processes deletion")

  try {
    await UserProcess.collection.drop()
    logger.info("UserProcess collection dropped")
  } catch (err) {
    if (err.codeName !== "NamespaceNotFound") {
      logger.error("Failed to drop UserProcess collection:", { error: err })
      throw err
    }
    logger.info("UserProcess collection didn’t exist, proceeding")
  }

  await UserProcess.ensureIndexes()
  logger.info("UserProcess indexes recreated")
}

async function deleteInvestments() {
  logger.info('Starting investments migration');

  const ids = InvestmentsMigration.map(item => item.id);
  const validIds = ids.filter(id => id !== null && id !== undefined);
  const duplicates = validIds.filter((id, index) => validIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    logger.error('Duplicate IDs found in InvestmentsMigration:', { duplicates });
    throw new Error(`Duplicate IDs in InvestmentsMigration: ${duplicates}`);
  }
  const invalidItems = InvestmentsMigration.filter(item => item.id === null || item.id === undefined);
  if (invalidItems.length > 0) {
    logger.warn('Items without IDs found in InvestmentsMigration:', { count: invalidItems.length, items: invalidItems });
  }

  try {
    await Investments.collection.drop();
    logger.info('Investments collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop investments collection:', { error: err });
      throw err;
    }
    logger.info('Investments collection didn’t exist, proceeding');
  }

  await Investments.ensureIndexes();
  logger.info('Investments indexes recreated');

  for (const item of InvestmentsMigration) {
    try {
      const investments = new Investments(item);
      await investments.save();
      logger.info('Inserted investment', { id: item.id });
    } catch (error) {
      logger.error('Failed to insert investment', { id: item.id, error });
      throw error;
    }
  }

  logger.info('Investments migration completed');
}

async function deleteUserTasks() {
  logger.info("Starting user tasks deletion")

  try {
    await UserCompletedTask.collection.drop()
    logger.info("UserCompletedTask collection dropped")
  } catch (err) {
    if (err.codeName !== "NamespaceNotFound") {
      logger.error("Failed to drop UserCompletedTask collection:", {
        error: err,
      })
      throw err
    }
    logger.info("UserCompletedTask collection didn’t exist, proceeding")
  }

  await UserCompletedTask.ensureIndexes()
  logger.info("UserCompletedTask indexes recreated")
}
async function deleteAndInsertFood() {
  logger.info('Starting food migration');

  const ids = FoodItems.map(item => item.id);
  const validIds = ids.filter(id => id !== null && id !== undefined);
  const duplicates = validIds.filter((id, index) => validIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    logger.error('Duplicate IDs found in FoodItems:', { duplicates });
    throw new Error(`Duplicate IDs in FoodItems: ${duplicates}`);
  }
  const invalidItems = FoodItems.filter(item => item.id === null || item.id === undefined);
  if (invalidItems.length > 0) {
    logger.warn('Items without IDs found in FoodItems:', { count: invalidItems.length, items: invalidItems });
  }

  try {
    await Food.collection.drop();
    logger.info('Food collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop food collection:', { error: err });
      throw err;
    }
    logger.info('Food collection didn’t exist, proceeding');
  }

  await Food.ensureIndexes();
  logger.info('Food indexes recreated');

  for (const item of FoodItems) {
    try {
      const food = new Food({ ...item, effect: {} });
      await food.save();
      logger.info('Inserted food item', { id: item.id });
    } catch (error) {
      logger.error('Failed to insert food item', { id: item.id, error });
      throw error;
    }
  }

  logger.info('Food migration completed');
}

async function deleteAndInsertSkill() {
  logger.info('Starting skill migration');

  const ids = SkillItems.map(item => item.id);
  const validIds = ids.filter(id => id !== null && id !== undefined);
  const duplicates = validIds.filter((id, index) => validIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    logger.error('Duplicate IDs found in SkillItems:', { duplicates });
    throw new Error(`Duplicate IDs in SkillItems: ${duplicates}`);
  }
  const invalidItems = SkillItems.filter(item => item.id === null || item.id === undefined);
  if (invalidItems.length > 0) {
    logger.warn('Items without IDs found in SkillItems:', { count: invalidItems.length, items: invalidItems });
  }

  try {
    await Skill.collection.drop();
    logger.info('Skill collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop skill collection:', { error: err });
      throw err;
    }
    logger.info('Skill collection didn’t exist, proceeding');
  }

  await Skill.ensureIndexes();
  logger.info('Skill indexes recreated');

  for (const item of SkillItems) {
    try {
      const skill = new Skill({ ...item, effect: {} });
      await skill.save();
      logger.info('Inserted skill item', { id: item.id });
    } catch (error) {
      logger.error('Failed to insert skill item', { id: item.id, error });
      throw error;
    }
  }

  logger.info('Skill migration completed');
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
  logger.info('Starting boost migration');

  const ids = BoostItems.map(item => item.id);
  const validIds = ids.filter(id => id !== null && id !== undefined);
  const duplicates = validIds.filter((id, index) => validIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    logger.error('Duplicate IDs found in BoostItems:', { duplicates });
    throw new Error(`Duplicate IDs in BoostItems: ${duplicates}`);
  }
  const invalidItems = BoostItems.filter(item => item.id === null || item.id === undefined);
  if (invalidItems.length > 0) {
    logger.warn('Items without IDs found in BoostItems:', { count: invalidItems.length, items: invalidItems });
  }

  try {
    await Boost.collection.drop();
    logger.info('Boost collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop boost collection:', { error: err });
      throw err;
    }
    logger.info('Boost collection didn’t exist, proceeding');
  }

  await Boost.ensureIndexes();
  logger.info('Boost indexes recreated');

  for (const item of BoostItems) {
    try {
      const boost = new Boost({ ...item, effect: {} });
      await boost.save();
      logger.info('Inserted boost item', { id: item.id });
    } catch (error) {
      logger.error('Failed to insert boost item', { id: item.id, error });
      throw error;
    }
  }

  logger.info('Boost migration completed');
}

async function deleteAndInsertLevels() {
  logger.info('Starting levels migration');

  const ids = LevelItems.map(item => item.id);
  const validIds = ids.filter(id => id !== null && id !== undefined);
  const duplicates = validIds.filter((id, index) => validIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    logger.error('Duplicate IDs found in LevelItems:', { duplicates });
    throw new Error(`Duplicate IDs in LevelItems: ${duplicates}`);
  }
  const invalidItems = LevelItems.filter(item => item.id === null || item.id === undefined);
  if (invalidItems.length > 0) {
    logger.warn('Items without IDs found in LevelItems:', { count: invalidItems.length, items: invalidItems });
  }

  try {
    await LevelsParameters.collection.drop();
    logger.info('LevelsParameters collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop LevelsParameters collection:', { error: err });
      throw err;
    }
    logger.info('LevelsParameters collection didn’t exist, proceeding');
  }

  await LevelsParameters.ensureIndexes();
  logger.info('LevelsParameters indexes recreated');

  for (const item of LevelItems) {
    try {
      const level = new LevelsParameters({ ...item, effect: {} });
      await level.save();
      logger.info('Inserted level item', { id: item.id });
    } catch (error) {
      logger.error('Failed to insert level item', { id: item.id, error });
      throw error;
    }
  }

  logger.info('Levels migration completed');
}

async function deleteAndInsertTraining() {
  logger.info('Starting training migration');

  const ids = TrainingItems.map(item => item.id);
  const validIds = ids.filter(id => id !== null && id !== undefined);
  const duplicates = validIds.filter((id, index) => validIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    logger.error('Duplicate IDs found in TrainingItems:', { duplicates });
    throw new Error(`Duplicate IDs in TrainingItems: ${duplicates}`);
  }
  const invalidItems = TrainingItems.filter(item => item.id === null || item.id === undefined);
  if (invalidItems.length > 0) {
    logger.warn('Items without IDs found in TrainingItems:', { count: invalidItems.length, items: invalidItems });
  }

  try {
    await TrainingParameters.collection.drop();
    logger.info('TrainingParameters collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop TrainingParameters collection:', { error: err });
      throw err;
    }
    logger.info('TrainingParameters collection didn’t exist, proceeding');
  }

  await TrainingParameters.ensureIndexes();
  logger.info('TrainingParameters indexes recreated');

  for (const item of TrainingItems) {
    try {
      const training = new TrainingParameters({ ...item, effect: {} });
      await training.save();
      logger.info('Inserted training item', { id: item.id });
    } catch (error) {
      logger.error('Failed to insert training item', { id: item.id, error });
      throw error;
    }
  }

  logger.info('Training migration completed');
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

async function deleteShelfItems() {
  logger.info('Starting shelf items migration');

  const ids = ShelfItems.map(item => item.id);
  const validIds = ids.filter(id => id !== null && id !== undefined);
  const duplicates = validIds.filter((id, index) => validIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    logger.error('Duplicate IDs found in ShelfItems:', { duplicates });
    throw new Error(`Duplicate IDs in ShelfItems: ${duplicates}`);
  }
  const invalidItems = ShelfItems.filter(item => item.id === null || item.id === undefined);
  if (invalidItems.length > 0) {
    logger.warn('Items without IDs found in ShelfItems:', { count: invalidItems.length, items: invalidItems });
  }

  try {
    await ShelfItemModel.collection.drop();
    logger.info('Shelf items collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop shelf_items collection:', { error: err });
      throw err;
    }
    logger.info('Shelf items collection didn’t exist, proceeding');
  }

  await ShelfItemModel.ensureIndexes();
  logger.info('Shelf items indexes recreated');

  for (const item of ShelfItems) {
    try {
      const shelfItem = new ShelfItemModel({ ...item });
      await shelfItem.save();
      logger.info('Inserted shelf item', { id: item.id });
    } catch (error) {
      logger.error('Failed to insert shelf item', { id: item.id, error });
      throw error;
    }
  }

  logger.info('Shelf items migration completed');
}

async function deleteAndInsertClothing() {
  logger.info('Starting clothing migration');

  const ids = ClothingItems.map(item => item.id);
  const validIds = ids.filter(id => id !== null && id !== undefined);
  const duplicates = validIds.filter((id, index) => validIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    logger.error('Duplicate IDs found in ClothingItems:', { duplicates });
    throw new Error(`Duplicate IDs in ClothingItems: ${duplicates}`);
  }
  const invalidItems = ClothingItems.filter(item => item.id === null || item.id === undefined);
  if (invalidItems.length > 0) {
    logger.warn('Items without IDs found in ClothingItems:', { count: invalidItems.length, items: invalidItems });
  }

  try {
    await Clothing.collection.drop();
    logger.info('Clothing collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop clothing collection:', { error: err });
      throw err;
    }
    logger.info('Clothing collection didn’t exist, proceeding');
  }

  await Clothing.ensureIndexes();
  logger.info('Clothing indexes recreated');

  for (const item of ClothingItems) {
    try {
      const clothes = new Clothing({ ...item, effect: {} });
      await clothes.save();
      logger.info('Inserted clothing item', { id: item.id });
    } catch (error) {
      logger.error('Failed to insert clothing item', { id: item.id, error });
      throw error;
    }
  }

  logger.info('Clothing migration completed');
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
  logger.info('Starting constant effects migration');

  const ids = constantEffects.map(effect => effect.id);
  const validIds = ids.filter(id => id !== null && id !== undefined);
  const duplicates = validIds.filter((id, index) => validIds.indexOf(id) !== index);
  if (duplicates.length > 0) {
    logger.error('Duplicate IDs found in constantEffects:', { duplicates });
    throw new Error(`Duplicate IDs in constantEffects: ${duplicates}`);
  }
  const invalidItems = constantEffects.filter(effect => effect.id === null || effect.id === undefined);
  if (invalidItems.length > 0) {
    logger.warn('Items without IDs found in constantEffects:', { count: invalidItems.length, items: invalidItems });
  }

  try {
    await ConstantEffects.collection.drop();
    logger.info('ConstantEffects collection dropped');
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error('Failed to drop ConstantEffects collection:', { error: err });
      throw err;
    }
    logger.info('ConstantEffects collection didn’t exist, proceeding');
  }

  await ConstantEffects.ensureIndexes();
  logger.info('ConstantEffects indexes recreated');

  for (const effect of constantEffects) {
    try {
      const e = new ConstantEffects(effect);
      await e.save();
      logger.info('Inserted constant effect', { id: effect.id });
    } catch (error) {
      logger.error('Failed to insert constant effect', { id: effect.id, error });
      throw error;
    }
  }

  logger.info('Constant effects migration completed');
}

export { logger }
