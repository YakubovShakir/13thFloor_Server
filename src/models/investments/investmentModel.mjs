import mongoose from "mongoose"
import { InvestmentTypes } from "./userLaunchedInvestments.mjs"

const schema = new mongoose.Schema({
  id: { type: Number, required: true, unquie: true },
  level: { type: Number, required: true },
  type: { type: String, enum: Object.values(InvestmentTypes) }, 
  title: { type: String, required: true },
  coins_per_hour: { type: Number, required: true },
  respect: { type: Number, required: true },
  price: { type: Number, required: true }
})

const Investments = mongoose.model("investments", schema)

export default Investments
