import { config } from "dotenv";
config();

import mongoose from "mongoose";
import cron from "node-cron";
import { log } from "../utils/log.js";
import connectDB from "../config/db.js";
import {
  RefsRecalsProcess,
  SkillProccess,
  WorkProcess,
  TrainingProccess,
  SleepProccess,
  AutoclaimProccess,
  BoostProccess,
  FoodProccess,
  NftScanProcess,
} from "./universal.js";

// Utility to format memory usage in MB
const formatMemoryUsage = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const gameTimer = {
  FoodProccess,
  SkillProccess,
  TrainingProccess,
  WorkProcess,
  SleepProccess,
  BoostProccess,
  AutoclaimProccess,
  RefsRecalsProcess,
  NftScanProcess,
  stopAll() {
    Object.values(this).forEach((scheduler) => {
      if (scheduler && typeof scheduler.stop === "function") {
        scheduler.stop();
        log("info", `Stopped ${scheduler.name || "unknown"} process`);
      }
    });
  },
};

// Function to log memory usage
const logMemoryUsage = () => {
  const memoryUsage = process.memoryUsage();
  log("info", "Memory Usage Report", {
    rss: formatMemoryUsage(memoryUsage.rss),
    heapTotal: formatMemoryUsage(memoryUsage.heapTotal),
    heapUsed: formatMemoryUsage(memoryUsage.heapUsed),
    external: formatMemoryUsage(memoryUsage.external),
    arrayBuffers: formatMemoryUsage(memoryUsage.arrayBuffers),
  });
};

// Start Schedulers and Memory Logging
connectDB()
  .then(() => {
    // Start game process schedulers
    Object.entries(gameTimer).forEach(([name, scheduler]) => {
      if (typeof scheduler.start === "function") {
        scheduler.start();
        log("info", `Started ${name} process`);
      }
    });

    // Log initial memory usage
    logMemoryUsage();

    // Start memory usage logging every 5 minutes
    const memoryLogScheduler = cron.schedule(
      "*/5 * * * * *",
      () => {
        logMemoryUsage();
      },
      { scheduled: true }
    );

    // Ensure memory log scheduler stops on shutdown
    const originalStopAll = gameTimer.stopAll;
    gameTimer.stopAll = function () {
      originalStopAll.call(this);
      memoryLogScheduler.stop();
      log("info", "Stopped memory usage logging");
    };

    log("info", "Memory logging scheduler started");
  })
  .catch((err) => {
    log("error", "Failed to connect to DB", { error: err.message });
    process.exit(1);
  });

// Graceful Shutdown with Promise-based mongoose.connection.close()
const shutdown = async (signal) => {
  log("info", `Received ${signal}, shutting down...`);
  gameTimer.stopAll();
  try {
    await mongoose.connection.close();
    log("info", "MongoDB connection closed");
    process.exit(0);
  } catch (err) {
    log("error", "Error closing MongoDB connection", { error: err.message });
    process.exit(1);
  }
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

export default gameTimer;