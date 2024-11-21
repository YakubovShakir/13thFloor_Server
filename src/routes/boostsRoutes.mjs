import express from "express"
import { getBoosts } from "../controllers/boostsController.mjs"
const router = express.Router()
router.get("/all", getBoosts)

export default router
