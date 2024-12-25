import mongoose from "mongoose"

const schema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: {
        ru: { type: String, required: true },
        en: { type: String, required: true },
    },
    description: {
        ru: { type: String, required: true },
        en: { type: String, required: true },
    },
    level: { type: Number, required: true },
    icon_url: { type: String, required: false, default: null },
    fixed_reward: { type: Number, default: 0 },
    earnings_mult_coeff: { type: Number, default: 1 },
    is_partner: { type: Number, default: 0 }
})

// earnings 

const Tasks = mongoose.model("task", schema)

export default Tasks