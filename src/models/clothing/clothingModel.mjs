import mongoose from "mongoose"

const clothingSchema = new mongoose.Schema({
  clothing_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  category: {
    type: String,
    enum: ["Casual", "Sport", "Office", "Seasonal"],
    required: true,
  },
  type: {
    type: String,
    enum: ["Hat", "Top", "Pants", "Shoes", "Accessory"],
    required: true,
  },
  effect: { type: String },
  link: { type: String, required: true, unique: true },
})

const Clothing = mongoose.model("clothing", clothingSchema)

export default Clothing
