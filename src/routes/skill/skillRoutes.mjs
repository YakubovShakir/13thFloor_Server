import express from "express"
import { getSkills } from "../../controllers/skill/skillController.mjs"
import { getUserSkills } from "../../controllers/skill/skillController.mjs"
const router = express.Router()

router.get("/all", getSkills)
router.get("/user/:id", getUserSkills)
export default router
