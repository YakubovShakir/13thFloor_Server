import mongoose from "mongoose"

const userWorksSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  work_id: { type: Number, required: true },
})

const UserWork = mongoose.model("users_works", userWorksSchema)

export default UserWork
