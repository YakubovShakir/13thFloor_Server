import mongoose from 'mongoose';

const AffiliateTONTransactionSchema = new mongoose.Schema({
  affiliateId: { type: Number, required: true, index: true }, // Matches TONTransactions
  tonTxIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ton_transaction' }], // Linked TON transactions
  amount: { type: Number, required: true, min: 0 }, // TON withdrawn (in TON, not nanotons)
  status: { type: String, enum: ['pending', 'complete', 'failed'], default: 'pending' },
  tonTxHash: { type: String, default: null }, // Withdrawal transaction hash
}, { timestamps: true });

export default mongoose.model('affiliate_ton_tx', AffiliateTONTransactionSchema);