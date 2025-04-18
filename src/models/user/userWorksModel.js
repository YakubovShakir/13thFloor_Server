import { Schema, model } from 'mongoose'

const userWorksSchema = new Schema(
    {
        id: { type: Number, required: true },
        work_id: { type: Number, required: true }
    },
    {
        timestamps: true
    }
)

export const UserWorks = model('user_work', userWorksSchema)