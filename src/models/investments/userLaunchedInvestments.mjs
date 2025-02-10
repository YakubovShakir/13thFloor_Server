import mongoose from "mongoose"

export const InvestmentTypes = {
    GameCenter: 'game_center',
    CoffeeShop: 'coffee_shop',
    ZooShop: 'zoo_shop'
}

const schema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  investment_id: { type: Number, required: true },
  to_claim: { type: Number, required: true },
  claimed: { type: Boolean, default: false },
  investment_type: { type: String, required: true, enum: Object.values(InvestmentTypes) },
}, { timestamps: true })

const UserLaunchedInvestments = mongoose.model("user_investments", schema)

export default UserLaunchedInvestments