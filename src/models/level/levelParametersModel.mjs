import mongoose from "mongoose"

const schema = new mongoose.Schema({
  level: { type: Number, required: true, unquie: true },
  experience_required: { type: Number, required: true },
  energy_capacity: { type: Number, required: true },
  sleep_duration: { type: Number, required: true },
})

const LevelsParameters = mongoose.model("levels_parameters", schema)

export default LevelsParameters
