import mongoose from "mongoose"

export const ClothingTypes = {
  Hat: "Hat",
  Top: "Top",
  Pants: "Pants",
  Shoes: "Shoes",
  Accessory: "Accessory"
};

export const ClothingCategories = {
  Casual: 'Casual',
  Sport: 'Sport',
  Office: 'Office',
  Event: 'Event'
};

const clothingSchema = new mongoose.Schema({
  clothing_id: { type: Number, required: true, unique: true },
  name: { 
      ru: { type: String, required: true },
      en: { type: String, required: true }
   },
  tag: [{
    type: String,
    enum: Object.values(ClothingCategories),
  }],
  type: {
    type: String,
    enum: Object.values(ClothingTypes),
    required: true,
  },
  //! Using mixed type, since structure is TBD.
  effects: {
    cant_fall_below_percent: [{
      param: {
        type: String,
        enum: ['hungry', 'mood', 'energy'], // Restrict to valid stats
        required: true,
      },
      value: {
        type: Number,
        default: null, // Nullable for migration
        min: 0,
        max: 100,
      },
    }],
    profit_hourly_percent: [{
      param: { type: String, enum: ['hungry', 'mood', 'energy'], required: true },
      value: { type: Number, default: null, min: 0 },
    }],
    cost_hourly_percent: [{
      param: { type: String, enum: ['hungry', 'mood', 'energy'], required: true },
      value: { type: Number, default: null, min: 0 },
    }],
    profit_per_tick_fixed: [{
      param: { type: String, enum: ['hungry', 'mood', 'energy'], required: true },
      value: { type: Number, default: null, min: 0 },
    }],
    cost_per_tick_fixed: [{
      param: { type: String, enum: ['hungry', 'mood', 'energy'], required: true },
      value: { type: Number, default: null, min: 0 },
    }],
    autostart: [{
      param: {
        type: String,
        enum: [
          'sleeping_when_energy_below',
        ],
        required: true,
      },
      value: { type: Number, default: null, min: 0, max: 100 },
    }],
  },
  male_link: { type: String, required: true},
  female_link: { type: String, required: true},
  male_icon: { type: String, required: true},
  female_icon: { type: String, required: true},
  respect: { type: Number, required: true },
  price: { type: Number, required: true },
  is_premium: { type: Boolean, default: false },
  tier: { type: Number, required: true },
  requiredLevel: { type: Number, required: true },
})

const Clothing = mongoose.model("clothing", clothingSchema)

export default Clothing
