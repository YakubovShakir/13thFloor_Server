import mongoose from "mongoose"

const schema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    active: { type: Boolean, required: true },
    type: {
      type: String,
      required: true,
    },
    sub_type: { type: String, default: null },
    type_id: { type: Number, required: true },
    //! IN SECONDS
    duration: { type: Number, required: true },
    seconds: { type: Number, default: 0 },
    effects: {
      duration_decrease: { type: Number, default: null },
      mood_increase: { type: Number, default: null },
      reward_increase: { type: Number, default: null },
      energy_cost_decrease: { type: Number, default: null },
      hunger_cost_decrease: { type: Number, default: null },
    },
    boosted_created_at: { type: Date, default: null },
    base_duration_in_seconds: { type: Number, required: true },
    target_duration_in_seconds: { type: Number, default: null },
    reward_at_the_end: { type: Number, default: null },
    user_parameters_updated_at: { type: Date, default: null },
    sleep_game: {
      coins: [{
        id: { type: String, required: true },
        spawnTime: { type: Date, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        collected: { type: Boolean, default: false },
        collectionToken: { type: String, required: true },
      }],
      playerJumps: [{
        time: { type: Date, required: true },
        y: { type: Number, required: true },
      }],
      lastSpawnTime: { type: Date, default: Date.now }, // Track last coin spawn
    },
  },
  { timestamps: true }
)

const process = mongoose.model("users_process", schema)

export default process
