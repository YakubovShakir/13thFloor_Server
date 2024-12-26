import mongoose from "mongoose"

const schema = new mongoose.Schema({
    task_id: { type: Number, required: true },
    user_id: { type: Number, required: true }
}, { timestamps: true })

// earnings 

const CompletedTasks = mongoose.model("completed_task", schema)

export default CompletedTasks