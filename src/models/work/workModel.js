import mongoose from "mongoose"

const workSchema = new mongoose.Schema({
  work_id: { type: Number, required: true, unique: true },
  name: {
    ru:  { type: String, required: true },
    en:  { type: String, required: true }
  },
  coins_price: { type: Number, required: true },
  coins_in_hour: { type: Number, required: true },
  energy_cost_in_hour: { type: Number, required: true },
  mood_cost_in_hour: { type: Number, required: true },
  hungry_cost_in_hour: { type: Number, required: true },
  skill_id_required: { type: Number},
  respect_required: { type: Number },
  link: { type: String, unique: true },
  duration: { type: Number, default: null },
  requiredLevel: { type: Number, required: true },
  respect_reward: { type: Number, default: 0},
  experience_reward: { type: Number, default: 0 },
})

const Work = mongoose.model("works", workSchema)

export default Work
