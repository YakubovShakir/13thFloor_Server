import mongoose from "mongoose"

// TODO: create for each user
const userCurrentInventorySchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  boosts: [
    {
      quantity: { type: Number, required: true },
      id: { type: Number, required: true },
    },
  ],
  shelf: [{ id: { type: Number, required: true } }],
  clothes: [{ id: { type: Number, required: true } }],
})

const UserCurrentInventory = mongoose.model(
  "user_inventory",
  userCurrentInventorySchema
)

export default UserCurrentInventory
