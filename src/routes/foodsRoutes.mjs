import express from "express"
import { getFoods, buyFood } from "../controllers/foodsController.mjs"
const router = express.Router()

router.get("/all", getFoods)
router.post("/buy", buyFood)
export default router
