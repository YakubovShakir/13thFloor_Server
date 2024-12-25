import mongoose from "mongoose"

export const TransactionTypes = {
    Coins: 'coins',
    Stars: 'stars'
}

export const ProductTypes = {
    Clothes: 'clothes',
    Boosts: 'boosts',
    Shelf: 'shelf',
}

const schema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  type: { type: String, required: true, enum: Object.values(TransactionTypes) },
  product_id: { type: Number, required: true },
  product_type: { type: String, required: true, enum: Object.values(ProductTypes) },
  amount: { type: Number, required: true }
}, { timestamps: true })

const UserTransaction = mongoose.model("user_transaction", schema)

export default UserTransaction
