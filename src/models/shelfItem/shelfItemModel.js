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
    cant_fall_below_percent: [
      {
        param: {
          type: String,
          enum: ["hungry", "mood", "energy"], // Restrict to valid stats
          required: true,
        },
        value: {
          type: Number,
          default: null, // Nullable for migration
          min: 0,
          max: 100,
        },
      },
    ],
    profit_hourly_percent: [
      {
        param: {
          type: String,
          enum: ["hungry", "mood", "energy", "coins"],
          required: true,
        },
        value: { type: Number, default: null, min: 0 },
      },
    ],
    profit_hourly_fixed: [
      {
        param: {
          type: String,
          enum: ["hungry", "mood", "energy", "coins"],
          required: true,
        },
        value: { type: Number, default: null, min: 0 },
      },
    ],
    cost_hourly_percent: [
      {
        param: {
          type: String,
          enum: ["hungry", "mood", "energy"],
          required: true,
        },
        value: { type: Number, default: null, min: 0 },
      },
    ],
    profit_per_tick_fixed: [
      {
        param: {
          type: String,
          enum: ["hungry", "mood", "energy"],
          required: true,
        },
        value: { type: Number, default: null, min: 0 },
      },
    ],
    cost_per_tick_fixed: [
      {
        param: {
          type: String,
          enum: ["hungry", "mood", "energy"],
          required: true,
        },
        value: { type: Number, default: null, min: 0 },
      },
    ],
    autostart: [
      {
        param: {
          type: String,
          enum: ["sleeping_when_energy_below"],
          required: true,
        },
        value: { type: Number, default: null, min: 0, max: 100 },
      },
    ],
  },
  respect: { type: Number, default: null },
})

const ShelfItemModel = mongoose.model("shelf_item", ShelfItem)

export default ShelfItemModel
