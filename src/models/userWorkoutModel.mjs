import mongoose from "mongoose"

const userWorkoutSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  duration: { type: Number, required: true },
  energy_cost: { type: Number, required: true },
  hungry_cost: { type: Number, required: true },
  mood_increase: { type: Number, required: true },
})

const UserWorkout = mongoose.model("users_workout", userWorkoutSchema)

module.exports = UserWorkout
