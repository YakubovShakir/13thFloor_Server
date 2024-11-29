import express from "express"
import { getFoods } from "../../controllers/food/foodController.mjs"
import buyFoods from "../../controllers/food/functions/buyFood.mjs"
const router = express.Router()

router.get("/all", getFoods)
router.post("/buy", buyFoods)
export default router
