import mongoose from "mongoose"

// TODO: create for each user
const userCurrentClothingSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  hat: { type: Number, default: null },
  top: { type: Number, default: null },
  pants: { type: Number, default: null },
  shoes: { type: Number, default: null },
  accessories: [{ type: Number }],
})

const UserClothing = mongoose.model("user_clothing", userCurrentClothingSchema)

export default UserClothing
