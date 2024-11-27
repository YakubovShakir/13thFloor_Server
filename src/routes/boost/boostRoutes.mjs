import express from "express"
import { getBoosts } from "../../controllers/boost/boostController.mjs"
const router = express.Router()
router.get("/all", getBoosts)

export default router
