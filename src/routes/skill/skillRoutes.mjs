import express from "express"
import { getConstantEffects, getSkills } from "../../controllers/skill/skillController.mjs"
import { getUserSkills } from "../../controllers/skill/skillController.mjs"
const router = express.Router()

router.get("/getAll", getSkills)
router.get("/user/:id", getUserSkills)
router.get("/user/:id/constant-effects", getConstantEffects)

export default router
