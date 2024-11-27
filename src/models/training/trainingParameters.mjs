import mongoose from "mongoose"

const schema = new mongoose.Schema({
  level: { type: Number, required: true, unquie: true },
  duration: { type: Number, required: true },
  energy_spend: { type: Number, required: true },
  hungry_spend: { type: Number, required: true },
  mood_profit: { type: Number, required: true },
})

const TrainingParameters = mongoose.model("training_parameters", schema)

export default TrainingParameters
