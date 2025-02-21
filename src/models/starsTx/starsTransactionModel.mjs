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
        enum: ["XTR"]
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
        enum: ["clothes", "shelf", "boost", "autoclaim"],
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
    telegram_payment_charge_id: {
      type: String, default: null
    },
  },
  { timestamps: true }
)

const StarsTransactions = mongoose.model("stars_transaction", schema)

export default StarsTransactions