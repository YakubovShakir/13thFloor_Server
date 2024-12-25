import mongoose from "mongoose"

export const ProcessTypes = {
    Work: 'work',
    Train: 'train',
    Food: 'food',
    Sleep: 'sleep'
}

const schema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    process_type: {
        type: String,
        enum: Object.values(ProcessTypes),
        required: true
    },
    // work_id, skill_id
    action_id: {
        type: Number,
        default: 0,
    },
    finished: {
        type: Boolean,
        default: false
    },
  },
  { timestamps: true }
)

const UserDuration = mongoose.model("user_duration", schema)

export default UserDuration
