import mongoose from "mongoose"

const schema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name_ru: { type: String, required: true },
  name_en: { type: String, required: true },
  descr_ru: { type: String },
  descr_en: { type: String },
  reward: { type: Number },
  link: { type: String },
  level: { type: Number },
  category: {
    type: String,
    enum: ["levelTask", "learnSkillTask", "doTrainingTask"],
  },
  category_parameters: {
    requiredLevel: { type: Number },
    skillId: { type: Number },
  },
})

const Tasks = mongoose.model("tasks", schema)

export default Tasks
