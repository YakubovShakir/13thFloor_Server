import mongoose from "mongoose"

const schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    username: {
      type: String,
    },
    prestart: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", schema)

export default User
