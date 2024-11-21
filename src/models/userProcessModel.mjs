import mongoose from "mongoose"

const userProcessSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  active: { type: Boolean, required: true },
  type: {
    type: String,
    required: true,
  },
  type_id: { type: Number, required: true },
  duration: { type: Number, required: true },
})

const UserProcess = mongoose.model("users_process", userProcessSchema)

export default UserProcess
