import mongoose from "mongoose"

export const ActiveEffectTypes = {
    BasicNekoBoost: 'basic_neko_boost',
    NftNekoBoost: 'nft_neko_boost',
}

const ActiveEffectsSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  type: { type: String, required: true, enum: Object.values(ActiveEffectTypes) },
  valid_until: { type: Date, required: true },
  triggered_by: { type: Number, required: true }, // User who clicked
}, { timestamps: true });

export const ActiveEffectsModel = mongoose.model('active_effect', ActiveEffectsSchema)