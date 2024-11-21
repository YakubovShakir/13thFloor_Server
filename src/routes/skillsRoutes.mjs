import express from "express"
import { getSkills } from "../controllers/skillsController.mjs"
import {
  buySkill,
  getUserSkills,
} from "../controllers/usersSkillsController.mjs"
const router = express.Router()

router.get("/all", getSkills)
router.post("/buy/", buySkill)
router.get("/user/:id", getUserSkills)
export default router
