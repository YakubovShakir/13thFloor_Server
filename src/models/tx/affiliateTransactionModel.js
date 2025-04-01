// src/models/affiliate/affiliateTransactionModel.js
import mongoose from 'mongoose';

const AffiliateTransactionSchema = new mongoose.Schema({
  affiliateId: { type: Number, required: true, index: true },
  starsTxIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'stars_transaction' }], // Linked Stars transactions
  tonTxIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ton_transaction' }], // Linked TON transactions
  starsAmount: { type: Number, default: 0, min: 0 }, // Stars withdrawn (in Stars)
  tonAmount: { type: Number, default: 0, min: 0 }, // TON withdrawn (in TON, not nanotons)
  totalTonWithdrawn: { type: Number, required: true, min: 0 }, // Total TON withdrawn (Stars converted to TON + TON)
  status: { type: String, enum: ['pending', 'transferring', 'complete', 'failed'], default: 'pending' },
  tonTxHash: { type: String, default: null }, // Withdrawal transaction hash
}, { timestamps: true });

export default mongoose.model('affiliate_tx', AffiliateTransactionSchema);