import mongoose from "mongoose"

const schema = new mongoose.Schema({
  id: { type: Number, required: true },
  active: { type: Boolean, required: true },
  type: {
    type: String,
    required: true,
  },
  type_id: { type: Number, required: true },
  //! IN SECONDS
  duration: { type: Number, required: true },
  seconds: { type: Number, default: 0 },
  effects: {
    duration_decrease: { type: Number, default: null },
    reward_increase: { type: Number, default: null }
  },
  boosted_created_at: { type: Date, default: null },
  base_duration_in_seconds: { type: Number, default: null },
  target_duration_in_seconds: { type: Number, default: null },
  reward_at_the_end: { type: Number, default: null }
  // user_parameters_updated_at: { type: Date, default: null }
}, { timestamps: true })

const process = mongoose.model("users_process", schema)

export default process
