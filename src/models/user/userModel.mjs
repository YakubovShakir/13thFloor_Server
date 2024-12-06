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
    // Current personage
    personage: {
      race: {
        type: String,
        required: true,
        enum: ['asian', 'white', 'black']
      },
      gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
      },
      name: {
        type: String,
        required: true
      }
    },
    // Current shelf state
    shelf: [
      {
        id: { type: Number, required: true, unique: true },
        // 0 - 5 | 0,1,2 - top 3, 
        cellIndex: { type: Number, required: true, unique: true }
      }
    ]
  },
  { timestamps: true }
)

const User = mongoose.model("User", schema)

export default User
