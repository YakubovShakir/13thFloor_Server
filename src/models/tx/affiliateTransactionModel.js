import mongoose, { Schema } from 'mongoose';

const AffiliateTransactionSchema = new mongoose.Schema({
  affiliateId: { type: Number, required: true },
  starsTxIds: [{ type: Schema.Types.ObjectId, ref: "StarsTransactions" }],
  tonTxIds: [{ type: Schema.Types.ObjectId, ref: "TONTransactions" }],
  starsAmount: { type: Number },
  tonAmount: { type: Number },
  totalTonWithdrawn: { type: Number },
  status: {
    type: String,
    enum: ["pending", "transferring", "complete", "failed"],
    default: "pending",
  },
  error_message: { type: String },
  tonTxHash: { type: String },
  transferInitiatedAt: { type: Date },
  transferConfirmedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('affiliate_tx', AffiliateTransactionSchema);