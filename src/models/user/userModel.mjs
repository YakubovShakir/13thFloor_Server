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
    },
    investment_levels: {
      game_center: { type: Number, default: 0 },
      coffee_shop: { type: Number, default: 0 },
      zoo_shop: { type: Number, default: 0 }
    },
    has_autoclaim: { 
      game_center: { type: Boolean, default: false },
      coffee_shop: { type: Boolean, default: false },
      zoo_shop: { type: Boolean, default: false },
    }
  },
  { timestamps: true }
)

const User = mongoose.model("User", schema)

export default User
