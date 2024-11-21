import mongoose from "mongoose"

const userWorksSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  work_id: { type: Number, required: true },
})

const UserWorks = mongoose.model("users_works", userWorksSchema)

module.exports = UserWorks
