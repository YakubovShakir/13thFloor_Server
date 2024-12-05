import mongoose from "mongoose"

const ShelfItem = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
  },
  description: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
  },
  cost: {
    coins: { type: Number, default: 0 },
    stars: { type: Number, default: 0 },
  },
  link: { type: String, required: true },
})

const ShelfItemModel = mongoose.model("shelf_item", ShelfItem)

module.exports = ShelfItemModel
