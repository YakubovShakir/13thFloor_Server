import express from "express"
import Referal from "../models/referralModel.mjs"
import { getReferralsCount } from "../controllers/referralController.mjs"
const router = express.Router()
router.get("/id/:id", getReferralsCount)

export default router
