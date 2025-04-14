import mongoose from "mongoose"

export const ShelfItemTypes = {
  Flower: "flower",
  Event: "event",
  Award: "award",
  Flag: "flag",
  Neko: "neko",
}

export const NEKO_RARITIES = {
  //! BASE - FOR REGULAR NEKO
  BASE: 'Base',
  //!
  COMMON: 'Common',
  UNCOMMON: 'Uncommon',
  RARE: 'Rare',
  LEGENDARY: 'Legendary',
  SPECIAL: 'Special',
}

export const nekoRarityToRespectMap = {
  [NEKO_RARITIES.BASE]: 5,
  [NEKO_RARITIES.COMMON]: 10,
  [NEKO_RARITIES.UNCOMMON]: 20,
  [NEKO_RARITIES.RARE]: 30,
  [NEKO_RARITIES.LEGENDARY]: 40,
  [NEKO_RARITIES.SPECIAL]: 50,
}

export const levelToNekoCoinsClaimAmountMap = {
  '1': 150,
  '2': 300,
  '3': 600,
  '4': 800,
  '5': 1000,
  '6': 1400,
  '7': 1800,
  '8': 2200,
  '9': 2800,
  '10': 3000,
  '11': 3500,
  '12': 4000,
  '13': 5200,
  '14': 5700,
  '15': 6300,
  '16': 7400,
  '17': 8600,
  '18': 10800,
  '19': 12000,
  '20': 15000
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
  rarity: { type: String, enum: Object.values(NEKO_RARITIES) },
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
  tonPrice: { type: Number, default: null }
})

const ShelfItemModel = mongoose.model("shelf_item", ShelfItem)

export default ShelfItemModel
