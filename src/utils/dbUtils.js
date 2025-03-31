import mongoose from "mongoose";
import { log } from "./log.js";
import colors from "ansi-colors";

export const withTransaction = async (operation, maxRetries = 3, retryDelay = 500) => {
  let retryCount = 0;
  let session;

  while (retryCount < maxRetries) {
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      const result = await operation(session);

      await session.commitTransaction();
      return result; // Return whatever the operation returns
    } catch (error) {
      if (session) {
        await session.abortTransaction();
      }

      if (error.name === "MongoServerError" && error.code === 112) {
        retryCount++;
        if (retryCount < maxRetries) {
          await log(
            "warn",
            colors.yellow(`WriteConflict detected, retrying (${retryCount}/${maxRetries})`),
            { error: error.message }
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay * retryCount)); // Exponential delay
          continue;
        } else {
          await log(
            "error",
            colors.red(`Max retries (${maxRetries}) reached for WriteConflict`),
            { error: error.message, stack: error.stack }
          );
          throw new Error(`Failed after ${maxRetries} retries due to WriteConflict: ${error.message}`);
        }
      } else {
        await log(
          "error",
          colors.red(`Transaction failed`),
          { error: error.message, stack: error.stack }
        );
        throw error;
      }
    } finally {
      if (session) {
        session.endSession();
      }
    }
  }
};