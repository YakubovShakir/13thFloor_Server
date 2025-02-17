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
