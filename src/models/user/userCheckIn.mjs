import mongoose from "mongoose"

const schema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
)

const UserCheckIn = mongoose.model("user_check_in", schema)

export default UserCheckIn
