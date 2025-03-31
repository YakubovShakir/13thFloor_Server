import express from "express"
import {
  getBoosts,
  getUserBoosts,
  useBoost,
} from "../../controllers/boost/boostController.js"
const router = express.Router()
router.get("/getAll", getBoosts)
router.post("/use", useBoost)
router.get("/user/:userId", getUserBoosts)
export default router
