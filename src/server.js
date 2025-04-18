import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import usersRouter from "./routes/user/userRoutes.js";
import referralRouter from "./routes/referral/referralRoutes.js";
import foodsRouter from "./routes/food/foodRoutes.js";
import boostRouter from "./routes/boost/boostRoutes.js";
import worksRouter from "./routes/work/workRoutes.js";
import skillsRouter from "./routes/skill/skillRoutes.js";
import processRouter from "./routes/process/processRoutes.js";
import levelsRouter from "./routes/level/levelRoutes.js";
import dotenv from "dotenv";
import { createHash, createHmac } from "crypto";
import IORedis from "ioredis";
import winston from "winston";
import mongoose from "mongoose";

// Migration data imports
import ClothingItems from "./models/clothing/migration.js";
import SkillItems from "./models/skill/migration.js";
import FoodItems from "./models/food/migration.js";
import BoostItems from "./models/boost/migration.js";
import WorkItems from "./models/work/migration.js";
import LevelItems from "./models/level/migration.js";
import TrainingItems from "./models/training/migration.js";
import { ShelfItems } from "./models/shelfItem/migration.js";
import InvestmentsMigration from "./models/investments/migration.js";
import TasksMigration from "./models/tasks/migration.js";
import constantEffects from "./models/effects/migration.js";

// Model imports
import Clothing from "./models/clothing/clothingModel.js";
import Skill from "./models/skill/skillModel.js";
import Food from "./models/food/foodModel.js";
import Boost from "./models/boost/boostModel.js";
import Work from "./models/work/workModel.js";
import LevelsParameters from "./models/level/levelParametersModel.js";
import TrainingParameters from "./models/training/trainingParameters.js";
import UserParameters from "./models/user/userParametersModel.js";
import UserCurrentInventory from "./models/user/userInventoryModel.js";
import UserClothing from "./models/user/userClothingModel.js";
import User from "./models/user/userModel.js";
import ShelfItemModel from "./models/shelfItem/shelfItemModel.js";
import UserLaunchedInvestments from "./models/investments/userLaunchedInvestments.js";
import Investments from "./models/investments/investmentModel.js";
import Tasks from "./models/tasks/taskModel.js";
import UserSkill from "./models/user/userSkillModel.js";
import UserProcess from "./models/process/processModel.js";
import { ConstantEffects } from "./models/effects/constantEffectsLevels.js";
import UserBoost from "./models/user/userBoostsModel.js";
import { UserSpins } from "./models/user/userSpinsModel.js";
import UserCompletedTask from "./models/user/userCompletedTaskModel.js";
import { UserWorks } from "./models/user/userWorksModel.js";

dotenv.config();

// Redis setup
const redis = new IORedis({
  host: process.env.REDIS_HOST || "redis",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  password: process.env.REDIS_PASSWORD || "redis_password",
});
redis.on("connect", () => console.log("Redis connected for middleware"));
redis.on("error", (err) => console.error("Redis error in middleware:", err));

const app = express();
app.use(cors());
app.use(express.json());

const validateTelegramInitData = async (req, res, next) => {
  const initData = req.headers.authorization;

  if (!initData || !initData.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header missing or invalid" });
  }

  const token = initData.replace("Bearer ", "");
  const cacheKey = `tg:initData:${createHash("sha256").update(token).digest("hex")}`;
  const TTL = 30 * 60; // 30 minutes in seconds

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      const [validity, userId] = cached.split(":");
      if (validity === "valid") {
        logger.info("Cached valid initData", { cacheKey });
        req.userId = parseInt(userId, 10);
        return next();
      }
    }

    const params = new URLSearchParams(token);
    const authDate = parseInt(params.get("auth_date"), 10);
    const hash = params.get("hash");
    const userRaw = params.get("user");

    if (!authDate || !hash || !userRaw) {
      return res.status(401).json({ error: "Invalid initData format" });
    }

    let user;
    try {
      user = JSON.parse(userRaw);
      if (!user.id) throw new Error("User ID missing");
    } catch (e) {
      return res.status(401).json({ error: "Invalid user data in initData" });
    }
    const userId = user.id;

    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > TTL) {
      return res.status(401).json({ error: "initData expired" });
    }

    params.delete("hash");
    const botToken = process.env.BOT_TOKEN;
    if (!botToken) {
      throw new Error("TELEGRAM_BOT_TOKEN not set in environment");
    }

    const dataCheckString = Array.from(params.entries())
      .sort()
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");
    const secretKey = createHmac("sha256", "WebAppData")
      .update(botToken)
      .digest();
    const computedHash = createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");

    if (computedHash !== hash) {
      return res.status(401).json({ error: "Invalid initData hash" });
    }

    await redis.set(cacheKey, `valid:${userId}`, "EX", TTL);
    logger.info("Validated and cached initData", { cacheKey, userId });
    req.userId = userId;
    next();
  } catch (error) {
    logger.error("Error validating initData", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Internal server error" });
  }
};

if (process.env.USE_AUTH !== "false") {
  app.use(validateTelegramInitData)
} else {
  app.use((req, res, next) => {
    req.userId = process.env.DEV_ID || "6390374875"
    next()
  })
}

// Logger setup
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection:', { promise, reason: reason instanceof Error ? reason.stack : reason });
  process.exit(1);
});
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', { error: error.message, stack: error.stack });
  process.exit(1);
});

// Migration function: Drop and insert raw documents
async function deleteAndReplaceCollection(Model, Items, collectionName) {
  logger.info(`Starting ${collectionName} migration`);
  try {
    await Model.collection.drop();
    logger.info(`${collectionName} collection dropped`);
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error(`Failed to drop ${collectionName} collection:`, { error: err.message, stack: err.stack });
      throw err;
    }
    logger.info(`${collectionName} collection didn’t exist, proceeding`);
  }

  try {
    await Model.ensureIndexes();
    logger.info(`${collectionName} indexes recreated`);
  } catch (err) {
    logger.error(`Failed to recreate ${collectionName} indexes:`, { error: err.message, stack: err.stack });
    throw err;
  }

  if (Items && Items.length > 0) {
    try {
      await Model.insertMany(Items, { ordered: false }); // Insert raw documents as-is
      logger.info(`${collectionName} data inserted`, { count: Items.length });
    } catch (err) {
      logger.error(`Failed to insert ${collectionName} data:`, { error: err.message, stack: err.stack });
      throw err;
    }
  }
  logger.info(`${collectionName} migration completed`);
}

// Simple delete function for collections without migration data
async function deleteCollection(Model, collectionName) {
  logger.info(`Starting ${collectionName} deletion`);
  try {
    await Model.collection.drop();
    logger.info(`${collectionName} collection dropped`);
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      logger.error(`Failed to drop ${collectionName} collection:`, { error: err.message, stack: err.stack });
      throw err;
    }
    logger.info(`${collectionName} collection didn’t exist, proceeding`);
  }

  try {
    await Model.ensureIndexes();
    logger.info(`${collectionName} indexes recreated`);
  } catch (err) {
    logger.error(`Failed to recreate ${collectionName} indexes:`, { error: err.message, stack: err.stack });
    throw err;
  }
  logger.info(`${collectionName} deletion completed`);
}

// Migration functions
async function deleteUserParameters() {
  await deleteCollection(UserParameters, 'UserParameters');
}

async function deleteUserInventories() {
  await deleteCollection(UserCurrentInventory, 'UserCurrentInventory');
}

async function deleteUsers() {
  logger.info('Starting users deletion');
  await deleteCollection(User, 'User');
  await deleteCollection(UserSkill, 'UserSkill');
  await deleteCollection(UserClothing, 'UserClothing');
  await deleteCollection(UserSpins, 'UserSpins');
  logger.info('deleteUsers completed successfully');
}

async function deleteUserProcesses() {
  await deleteCollection(UserProcess, 'UserProcess');
}

async function deleteUserInvestments() {
  await deleteCollection(UserLaunchedInvestments, 'UserLaunchedInvestments');
}

async function deleteUserTasks() {
  await deleteCollection(UserCompletedTask, 'UserCompletedTask');
}

async function deleteUserBoosts() {
  await deleteCollection(UserBoost, 'UserBoost');
}

async function deleteAndInsertClothing() {
  await deleteAndReplaceCollection(Clothing, ClothingItems, 'Clothing');
}

async function deleteAndInsertWork() {
  await deleteAndReplaceCollection(Work, WorkItems, 'Work');
}

async function deleteAndInsertFood() {
  await deleteAndReplaceCollection(Food, FoodItems, 'Food');
}

async function deleteAndInsertSkill() {
  await deleteAndReplaceCollection(Skill, SkillItems, 'Skill');
}

async function deleteAndInsertBoost() {
  await deleteAndReplaceCollection(Boost, BoostItems, 'Boost');
}

async function deleteAndInsertLevels() {
  await deleteAndReplaceCollection(LevelsParameters, LevelItems, 'Levels');
}

async function deleteAndInsertTraining() {
  await deleteAndReplaceCollection(TrainingParameters, TrainingItems, 'Training');
}

async function deleteShelfItems() {
  await deleteAndReplaceCollection(ShelfItemModel, ShelfItems, 'ShelfItems');
}

async function deleteInvestments() {
  await deleteAndReplaceCollection(Investments, InvestmentsMigration, 'Investments');
}

async function deleteTasks() {
  await deleteAndReplaceCollection(Tasks, TasksMigration, 'Tasks');
}

async function deleteConstantEffects() {
  await deleteAndReplaceCollection(ConstantEffects, constantEffects, 'ConstantEffects');
}

async function migrateNfts(params) {
  
}

// Main migration runner
async function main() {
  const migrations = [
    // deleteUserParameters,
    // deleteUserInventories,
    // deleteUsers,
    // deleteUserProcesses,
    // deleteUserInvestments,
    // deleteUserTasks,
    // deleteUserBoosts,
    deleteAndInsertClothing,
    deleteAndInsertWork,
    deleteAndInsertFood,
    deleteAndInsertSkill,
    deleteAndInsertBoost,
    deleteAndInsertLevels,
    deleteAndInsertTraining,
    deleteShelfItems,
    deleteInvestments,
    // deleteTasks,
    deleteConstantEffects,
    // populateDB
  ];

  for (const migration of migrations) {
    try {
      logger.info(`Executing ${migration.name}`);
      await migration();
      logger.info(`Completed ${migration.name}`);
    } catch (error) {
      logger.error(`Failed ${migration.name}`, { error: error.message, stack: error.stack });
      throw error;
    }
  }
  const users = await UserParameters.find({})
  for (const user of users) {
    for (let work_id = 0; work_id <= user.work_id; work_id++) {      
      // Check if entry already exists to avoid duplicates
      const existingEntry = await UserWorks.findOne({
        id: user.id,
        work_id,
      });
      if (!existingEntry) {
        await new UserWorks({ id: user.id, work_id }).save();
        console.log(`✅ Created UserWorks for user ${user.id}, work_id ${work_id}`);
      }
    }
  }

  // const users = await User.find({})
  // const boosts = await Boost.find({})
  // for(const user of users) {
  //   for (const boost of boosts) {
  //     await (new UserBoost({ id: user.id, boost_id: boost.boost_id })).save()
  //   }
  // }
  logger.info('All migrations completed successfully');
}

// App setup
connectDB().then(() => {
  main();
});

app.use("/api/process/", processRouter);
app.use("/api/users/", usersRouter);
app.use("/api/referrals/", referralRouter);
app.use("/api/food/", foodsRouter);
app.use("/api/boost/", boostRouter);
app.use("/api/work/", worksRouter);
app.use("/api/skill/", skillsRouter);
app.use("/api/levels/", levelsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { logger };