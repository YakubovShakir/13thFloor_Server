// src/models/affiliate/affiliateTransactionModel.js
import mongoose from 'mongoose';

const AffiliateTransactionSchema = new mongoose.Schema({
  affiliateId: { type: Number, required: true, index: true }, // Changed to Number
  starsTxIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'stars_transaction' }], // References your model
  amount: { type: Number, required: true, min: 0 }, // TON withdrawn
  starsAmount: { type: Number, required: true, min: 0 }, // Stars withdrawn
  status: { type: String, enum: ['pending', 'complete', 'failed'], default: 'pending' },
  tonTxHash: { type: String, default: null },
}, { timestamps: true });

export default mongoose.model('affiliate_tx', AffiliateTransactionSchema);