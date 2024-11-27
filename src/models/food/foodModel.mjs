import mongoose from "mongoose"

const restoreSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  percent: { type: Boolean, required: true },
})

const schema = new mongoose.Schema({
  user_level_require: { type: Number, required: true },
  name: { type: String, required: true, unique: true },
  duration: { type: Number, required: true },
  instant_energy_restore: { type: restoreSchema },
  long_energy_restore: { type: restoreSchema },
  instant_hungry_restore: { type: restoreSchema },
  long_hungry_restore: { type: restoreSchema },
  instant_mood_restore: { type: restoreSchema },
  long_mood_restore: { type: restoreSchema },
  coins_price: { type: Number, required: true },
  link: { type: String, required: true, unique: true },
  food_id: { type: Number, required: true, unique: true },
})

const Food = mongoose.model("foods", schema)

export default Food
