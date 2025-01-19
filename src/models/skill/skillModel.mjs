import mongoose from "mongoose"

const skillSchema = new mongoose.Schema({
  name: {
    ru: { type: String, required: true },
    en: { type: String, required: true }
  },
  coins_price: { type: Number, required: true },
  description: {
    ru: { type: String, required: false },
    en: { type: String, required: false }
  },
  link: { type: String, unique: true },
  duration: { type: Number },
  skill_id_required: { type: Number },
  type: { type: String },
  skill_id: { type: Number, unique: true },
})

const Skill = mongoose.model("skills", skillSchema)

export default Skill
