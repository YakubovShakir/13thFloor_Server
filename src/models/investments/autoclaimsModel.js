import mongoose from "mongoose";
import { InvestmentTypes } from "./userLaunchedInvestments.js";
import e from "express";

const autoclaimSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  investmentType: {
    type: String,
    required: true,
    enum: [InvestmentTypes.CoffeeShop, InvestmentTypes.GameCenter, InvestmentTypes.ZooShop]
  },
  durationHours: {
    type: Number,
    required: true,
    enum: [6, 10, 18],
  },
  activatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: "0s" }
  },
});

const Autoclaims = mongoose.model("Autoclaim", autoclaimSchema);

export default Autoclaims