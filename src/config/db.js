import mongoose from "mongoose";
import { log } from "../utils/log.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log("info", "MongoDB connected");
  } catch (error) {
    log("error", "MongoDB connection error", { error: error.message });
    throw error;
  }
};

export default connectDB;