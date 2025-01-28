import mongoose from "mongoose"

const boostsSchema = new mongoose.Schema({
  boost_id: { type: Number, required: true, unique: true },
  name: {
    ru: { type: String },
    en: { type: String }
  },
  stars_price: { type: Number, required: true },
  description: {
    ru: { type: String},
    en: { type: String}
  },
  link: { type: String },
  duration: { type: Number },
  type: { type: String },
})

const Boost = mongoose.model("boosts", boostsSchema)

export default Boost
