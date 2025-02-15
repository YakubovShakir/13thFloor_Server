import express from "express"
import { getFoods } from "../../controllers/food/foodController.js"
import buyFoods from "../../controllers/food/functions/buyFood.js"
const router = express.Router()

router.get("/getAll", getFoods)

export default router
