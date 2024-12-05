import express from "express"
import {
  updateUserPrestart,
  getUser,
  createUserPersonage,
  getCurrentClothes
} from "../../controllers/user/userController.mjs"
import { getUserParameters } from "../../controllers/user/userParametersController.mjs"

import { getUserTrainingParameters } from "../../controllers/training/trainingController.mjs"

const router = express.Router()
router.get("/user/:id", getUser)

router.get("/parameters/:id", getUserParameters)
router.get("/training-parameters/:id", getUserTrainingParameters)
router.patch("/updatePrestart/:id", updateUserPrestart)
router.post("/personage/create/:id", createUserPersonage)

router.get("/:id/current-clothes", getCurrentClothes)

router.get("/:userId/inventory/clothes/equip/:id")
router.get("/:userId/inventory/shelf/equip/:id")

router.get("/:userId/shop/inventory/buy/:id")
router.get("/:userId/shop/shelf/buy/:id")

export default router
