import mongoose from "mongoose"

const schema = new mongoose.Schema({
  id: { type: Number, required: true },
  boost_id: { type: Number, required: true },
})

const UserBoost = mongoose.model("users_boosts", schema)

export default UserBoost
