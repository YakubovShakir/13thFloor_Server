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
  Seasonal: 'Seasonal'
};

const clothingSchema = new mongoose.Schema({
  clothing_id: { type: Number, required: true, unique: true },
  name: { 
      ru: { type: String, required: true },
      en: { type: String, required: true }
   },
  tag: {
    type: String,
    enum: Object.values(ClothingCategories),
  },
  type: {
    type: String,
    enum: Object.values(ClothingTypes),
    required: true,
  },
  //! Using mixed type, since structure is TBD.
  effect: {},
  male_link: { type: String, required: true},
  female_link: { type: String, required: true},
  respect: { type: Number, required: true },
  price: { type: Number, required: true },
  tier: { type: Number, required: true }
})

const Clothing = mongoose.model("clothing", clothingSchema)

export default Clothing
