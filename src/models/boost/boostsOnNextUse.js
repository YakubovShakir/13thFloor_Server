import { model, Schema } from 'mongoose'

export const ProcessTypes = {
    WORK: 'work',
    SLEEP: 'sleep',
    TRAINING: 'training'
}

const BoostsOnNextUseSchema = Schema({
    user_id: { type: Number, required: true },
    on_process: { type: String, enum: Object.values(ProcessTypes), required: true },
    boost_id: { type: Number, required: true},
    effects: {
        duration_decrease: { type: Number, default: null },
        mood_increase: { type: Number, default: null},
        reward_increase: { type: Number, default: null},
        energy_cost_decrease: { type: Number, default: null },
        hunger_cost_decrease: { type: Number, default: null },
    },
    activated: { type: Boolean, default: false }
}, { timestamps: true })

export const BoostsOnNextUse = model('next_use_boost', BoostsOnNextUseSchema)