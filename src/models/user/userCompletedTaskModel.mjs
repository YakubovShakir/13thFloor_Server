import mongoose from "mongoose"

const schema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    task_id: {
      type: Number,
      required: true,
    },
    claimed: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const UserCompletedTask = mongoose.model("user_completed_task", schema)

export default UserCompletedTask
