import mongoose from "mongoose"

export const SpinTypes = {
  Daily: "daily",
  Premium: "premium",
}

const schema = new mongoose.Schema(
  {
    user_id: { type: Number, required: true },
    type: { type: String, enum: Object.values(SpinTypes), required: true },
    is_used: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const UserSpins = mongoose.model("user_spin", schema)
