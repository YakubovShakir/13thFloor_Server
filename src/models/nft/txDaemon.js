import express from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TONTransactions from "../tx/tonTransactionModel.js";
import NFTItems from "./nftItemModel.js";
import TON from "@ton/ton";
import { config } from "dotenv";

const { TonClient, WalletContractV4, toNano, Address, NFTItem } = TON;

config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// MongoDB Connection and Replica Set Initialization
async function initializeMongoDB() {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/Floor?replicaSet=rs0"; // Use service name 'database'
  const maxRetries = 10;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      // Connect to MongoDB with a shorter timeout for retries
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      console.log("Connected to MongoDB");

      // Access the raw MongoDB client via Mongoose
      const adminDb = mongoose.connection.db.admin();

      // Check if replica set is already initialized
      const replStatus = await adminDb.command({ replSetGetStatus: 1 }).catch(err => {
        if (err.codeName === "NotYetInitialized") return null; // Replica set not initialized
        throw err;
      });

      if (!replStatus) {
        console.log("Initializing MongoDB replica set...");
        await adminDb.command({
          replSetInitiate: {
            _id: "rs0",
            members: [{ _id: 0, host: "database:27017" }], // Use service name here too
          },
        });

        // Wait for the replica set to become primary (up to 10 seconds)
        let attempts = 0;
        const maxAttempts = 20;
        while (attempts < maxAttempts) {
          const status = await adminDb.command({ replSetGetStatus: 1 }).catch(() => null);
          if (status && status.myState === 1) { // 1 = PRIMARY
            console.log("Replica set initialized successfully");
            return; // Exit function on success
          }
          await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
          attempts++;
        }

        if (attempts >= maxAttempts) {
          throw new Error("Replica set failed to initialize within timeout");
        }
      } else {
        console.log("Replica set already initialized");
      }
      return; // Exit function on successful connection
    } catch (err) {
      console.error(`MongoDB connection attempt ${retries + 1} failed:`, err.message);
      retries++;
      if (retries >= maxRetries) {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
    }
  }
}

// Open Wallet Function


// Server Wallet Initialization and Server Startup
(async () => {
  // Initialize MongoDB with replica set before proceeding
  await initializeMongoDB();




    // Supply Endpoint
    app.get("/api/nft/supply/:itemId", async (req, res) => {
      const { itemId } = req.params;

      try {
        const availableSupply = await NFTItems.countDocuments({ itemId: Number(itemId), status: "available" });
        res.json({ availableSupply });
      } catch (error) {
        console.error("Error fetching supply:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Transaction Details Endpoint
    app.get("/api/nft/transaction-details", async (req, res) => {
      const { userId, productId } = req.query;

      if (!userId || !productId) {
        return res.status(400).json({ error: "userId and productId are required" });
      }

      const session = await mongoose.startSession();
      try {
        session.startTransaction();

        const nft = await NFTItems.findOneAndUpdate(
          { itemId: Number(productId), status: "available" },
          { status: "locked", memo: uuidv4(), lockedAt: new Date() },
          { new: true, session }
        );

        if (!nft) {
          await session.abortTransaction();
          return res.status(404).json({ error: "No available NFTs for this item" });
        }

        if (!nft.price) {
          await session.abortTransaction();
          return res.status(400).json({ error: "Price not defined for this NFT" });
        }

        const amount = (nft.price * 1e9).toString();

        const transaction = new TONTransactions({
          user_id: Number(userId),
          currency: "TON",
          amount,
          product_type: "shelf",
          product_id: productId,
          memo: nft.memo,
          status: "awaiting_payment",
        });
        await transaction.save({ session });

        await session.commitTransaction();

        res.json({
          address: RECEIVING_WALLET_ADDRESS,
          amount,
          memo: nft.memo,
        });
      } catch (error) {
        console.error("Error generating transaction details:", error);
        await session.abortTransaction();
        res.status(500).json({ error: "Internal server error" });
      } finally {
        session.endSession();
      }
    });

    

    // Start Server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      setInterval(verifyAndTransferTransactions, 60000);
      setInterval(unlockExpiredLocks, 60000);
      verifyAndTransferTransactions();
      unlockExpiredLocks();
    });
  } catch (error) {
    console.error("Failed to initialize server wallet:", error);
    process.exit(1);
  }
})();