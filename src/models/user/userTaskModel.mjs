import mongoose from "mongoose"

const schema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  task_id: { type: Number, required: true },
})

const UserTask = mongoose.model("user_tasks", schema)

export default UserTask
