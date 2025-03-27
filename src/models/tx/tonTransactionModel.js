import mongoose from "mongoose"

const schema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    currency: {
        type: String,
        required: true,
        enum: ["TON"]
    },
    amount: {
        type: String,
        required: true
    },
    link: {
      type: String
    },
    product_type: {
        type: String,
        enum: ["clothes", "shelf", "boost", "autoclaim", "spin"],
        required: true
    },
    status: {
        type: String,
        enum: ["link_created", "errored", "complete", "refunded"],
        default: "link_created"
    },
    product_id: {
        type: String,
        required: true
    },
    tx_hash: {
      type: String, default: null
    },
  },
  { timestamps: true }
)

const TONTransactions = mongoose.model("ton_transaction", schema)

export default TONTransactions