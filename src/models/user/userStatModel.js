import mongoose from "mongoose"

const schema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  type: { type: String, required: true },
  type_parameters: {
    value: { type: Number },
  },
})

const UserStat = mongoose.model("user_stats", schema)

export default UserStat
