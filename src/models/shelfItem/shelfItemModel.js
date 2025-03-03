import mongoose from "mongoose"

export const ShelfItemTypes = {
  Flower: "flower",
  Event: "event",
  Award: "award",
  Flag: "flag",
  Neko: "neko",
}

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
  type: {
    type: String,
    enum: Object.values(ShelfItemTypes),
    required: true,
  },
  shelf_link: { type: String, required: true },
  //! Using mixed type, since structure is TBD.
  effects: {
    //? Duration affecting
    training_duration_decrease: { type: Number, default: null },
    work_duration_decrease: { type: Number, default: null },
    sleep_duration_decrease: { type: Number, default: null },
    //? Award increases
    mood_increase: { type: Number, default: null },
    reward_increase: { type: Number, default: null },
    //? Cost decreases
    energy_cost_decrease: { type: Number, default: null },
    hunger_cost_decrease: { type: Number, default: null },
    mood_cost_decrease: { type: Number, default: null },
    //? Cost increases
    energy_cost_increase: { type: Number, default: null },
    hunger_cost_increase: { type: Number, default: null },
    mood_cost_increase: { type: Number, default: null },
  },
})

const ShelfItemModel = mongoose.model("shelf_item", ShelfItem)

export default ShelfItemModel
