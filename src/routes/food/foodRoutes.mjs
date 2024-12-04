import express from "express"
import { getFoods } from "../../controllers/food/foodController.mjs"
import buyFoods from "../../controllers/food/functions/buyFood.mjs"
const router = express.Router()

router.get("/getAll", getFoods)

export default router
