import express from "express"
import { getReferralsCount } from "../../controllers/referral/referralController.mjs"

const router = express.Router()
router.get("/id/:id", getReferralsCount)

export default router
