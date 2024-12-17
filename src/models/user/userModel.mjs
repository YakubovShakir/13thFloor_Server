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
    shelf: {
      flower: { type: Number, default: null },
      award: { type: Number, default: null },
      event: { type: Number, default: null },
      neko: { type: Number, default: null },
      flag: { type: Number, default: null }
    }
  },
  { timestamps: true }
)

const User = mongoose.model("User", schema)

export default User
