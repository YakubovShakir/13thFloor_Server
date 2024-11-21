import mongoose from "mongoose"

const userSkillsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  skill_id: { type: Number, required: true },
})

const UserSkills = mongoose.model("users_skills", userSkillsSchema)

export default UserSkills
