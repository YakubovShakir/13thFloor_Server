import mongoose from "mongoose"

const userParameterSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
  coins: { type: Number, default: 20 },
  total_earned: { type: Number, default: 0 },
  energy_capacity: { type: Number, default: 150 },
  energy: { type: Number, default: 150 },
  hungry: { type: Number, default: 100 },
  mood: { type: Number, default: 100 },
  respect: { type: Number, default: 1 },
  recovery_ratios: {
    hungry: { type: Number, default: 1 },
    mood: { type: Number, default: 1 },
    energy: { type: Number, default: 1 },
  },
  expense_ratios: {
    hungry: { type: Number, default: 1 },
    mood: { type: Number, default: 1 },
    energy: { type: Number, default: 1 },
  },
  work_id: { type: Number, default: 0 },
})

const UserParameters = mongoose.model("users_parameters", userParameterSchema)

export default UserParameters
