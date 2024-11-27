import mongoose from "mongoose"

const userClothingSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  equipped: {
    hat: { type: Number, default: null },
    top: { type: Number, default: null },
    pants: { type: Number, default: null },
    shoes: { type: Number, default: null },
    accessories: [{ type: Number }],
  },
})

const UserClothing = mongoose.model("user_clothing", userClothingSchema)

export default UserClothing
