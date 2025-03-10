import mongoose from 'mongoose'

export const ActionTypes = {
    NekoInteract: 'neko_interact',
    UserLogin: 'user_login',
    ItemPurchase: 'item_purchase',
  };

const ActionLogSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, index: true }, // Target user whose neko was clicked
    action_type: { type: String, required: true, enum: Object.values(ActionTypes) },
    action_timestamp: { type: Date, required: true, default: Date.now },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    triggered_by: { type: Number, required: true }, // User who clicked
  }, { timestamps: true });
  

export const ActionLogModel = mongoose.model('ActionLog', ActionLogSchema);