import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        affiliate_user_id: { type: Number, required: true, index: true },
        ref_user_id: { type: Number, required: true, index: true },
    },
    {
        timestamps: true
    }
)