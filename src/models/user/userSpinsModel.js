import mongoose from 'mongoose'

const UserSpinsSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  is_used: { type: Boolean, default: false },
  type: { type: String, enum: ["daily", "premium"], required: true },
  won_item_id: { type: Number }, // ID of the won item
  won_item_type: { type: String }, // Type of the won item (clothes, shelf, etc.)
  can_burn: { type: Boolean, default: false }, // Whether it can be burned
  prize_equivalent: { type: { type: String }, amount: { type: Number } }, // What it burns into
  is_burned: { type: Boolean, default: false }, // Whether it was burned
  createdAt: { type: Date, default: Date.now },
});

export const UserSpins = mongoose.model("user_spin", UserSpinsSchema);