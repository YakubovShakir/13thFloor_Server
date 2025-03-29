import mongoose from "mongoose";
import { log } from "../utils/log.js";
import { config } from "dotenv";
config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://databaseTest:27017/Floor?replicaSet=rs0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoose.syncIndexes()
    log("info", "MongoDB connected");
  } catch (error) {
    log("error", "MongoDB connection error", { error: error.message });
    throw error;
  }
};

export default connectDB;