import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      enum: ["TON"],
    },
    amount: {
      type: String,
      required: true, // Stored as string to handle nanotons precisely (e.g., "1500000000")
    },
    link: {
      type: String,
      default: null, // Optional payment link if applicable
    },
    product_type: {
      type: String,
      enum: ["clothes", "shelf", "boost", "autoclaim", "spin"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",          // Initial state when transaction details are generated
        "awaiting_payment", // Payment details sent to user, awaiting TON transaction
        "payment_received", // TON payment detected on blockchain
        "transferring",     // NFT transfer in progress
        "complete",         // NFT transferred successfully
        "expired",          // Lock expired before payment/transfer
        "failed_payment",   // Payment not received or incorrect amount
        "failed_transfer",  // NFT transfer failed (e.g., blockchain error)
        "refunded"          // Payment refunded (manual or automated)
      ],
      default: "pending",
    },
    product_id: {
      type: String,
      required: true, // Matches itemId from NFTItems
    },
    tx_hash: {
      type: String,
      default: null, // Hash of the payment transaction
    },
    transfer_tx_hash: {
      type: String,
      default: null, // Hash of the NFT transfer transaction
    },
    memo: {
      type: String,
      required: true,
      unique: true, // Ensures memo uniqueness for matching
    },
    error_message: {
      type: String,
      default: null, // Stores error details if status is failed_*
    },
    affiliate_id: {
      type: Number,
      default: null
    }
  },
  { timestamps: true }
);

const TONTransactions = mongoose.model("ton_transaction", schema);

export default TONTransactions;