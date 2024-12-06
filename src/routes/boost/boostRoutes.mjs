import express from "express"
import {
  buyBoost,
  getBoosts,
  getUserBoosts,
  useBoost,
} from "../../controllers/boost/boostController.mjs"
const router = express.Router()
router.get("/getAll", getBoosts)
router.post("/buy", buyBoost)
router.post("/use", useBoost)
router.get("/user/:userId", getUserBoosts)
export default router
