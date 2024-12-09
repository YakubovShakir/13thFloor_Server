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
    // Current personage (optional)
    personage: {
      race: {
        type: String,
        enum: ["asian", "white", "black"],
      },
      gender: {
        type: String,
        enum: ["male", "female"],
      },
      name: {
        type: String,
      },
    },
    // Current shelf state
    shelf: [
      {
        id: { type: Number, required: true },
        cellIndex: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
)

const User = mongoose.model("User", schema)

export default User
