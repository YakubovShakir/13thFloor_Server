import mongoose from "mongoose"

const skillSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  coins_price: { type: Number, required: true },
  description: { type: String },
  link: { type: String, unique: true },
  duration: { type: Number },
  skill_id_required: { type: Number },
  type: { type: String, unique: true },
  skill_id: { type: Number, unique: true },
})

const Skill = mongoose.model("skills", skillSchema)

export default Skill
