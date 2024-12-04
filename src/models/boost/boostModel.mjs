import mongoose from "mongoose"

const boostsSchema = new mongoose.Schema({
  boost_id: { type: Number, required: true, unique: true },
  name: { type: String, unique: true, required: true },
  stars_price: { type: Number, required: true },
  description: { type: String },
  link: { type: String },
  duration: { type: Number },
  type: { type: String },
})

const Boost = mongoose.model("boosts", boostsSchema)

export default Boost
