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
      },
      complete: {
        type: Boolean,
        default: false
      }
    }
  },
  { timestamps: true }
)

const User = mongoose.model("User", schema)

export default User
