import mongoose from "mongoose"

const schema = new mongoose.Schema({
  level: { type: Number, required: true, unquie: true },
  required_earned: { type: Number, required: true },
  energy_capacity: { type: Number, required: true },
  sleep_duraion: { type: Number, required: true },
})

const LevelsParamters = mongoose.model("levels_parameters", schema)

export default LevelsParamters
