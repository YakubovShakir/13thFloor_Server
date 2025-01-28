import mongoose from "mongoose"
import migration from "../level/migration.js"

export const ConstantEffectTypes = {
    WorkDurationDecrease: 'work_duration_decrease',
    TrainingDurationDecrease: 'training_duration_decrease',
    SleepingDurationDecrease: 'sleeping_duration_decrease',
    WorkHourlyIncomeIncrease: 'work_hourly_income_increase'
}

const constantEffectsLevelsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  level: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true, enum: Object.values(ConstantEffectTypes) },
  // Can be percent or fixed, decided by type in handlers
  value_change: { type: Number, required: true },
  name: { 
    ru: { type: String, required: true },
    en: { type: String, required: true }
  },
  description: {
    ru: { type: String },
    en: { type: String }
  },
  link: { type: String }
})

export const ConstantEffects = mongoose.model("constant_effects_levels", constantEffectsLevelsSchema)
