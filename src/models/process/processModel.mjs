import mongoose from "mongoose"

const schema = new mongoose.Schema({
  id: { type: Number, required: true },
  active: { type: Boolean, required: true },
  type: {
    type: String,
    required: true,
  },
  type_id: { type: Number, required: true },
  duration: { type: Number, required: true },
  seconds: { type: String, require: true },
})

const process = mongoose.model("users_process", schema)

export default process
