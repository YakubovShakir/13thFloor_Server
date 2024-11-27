import mongoose from "mongoose"

const userSkillSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  skill_id: { type: Number, required: true },
})

const UserSkill = mongoose.model("users_skills", userSkillSchema)

export default UserSkill
