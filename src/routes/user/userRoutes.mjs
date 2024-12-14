import express from "express"
import {
  updateUserPrestart,
  getUser,
  createUserPersonage,
  getCurrentClothes,
  getShopItems,
  getInventoryItems,
  handleClothesUnequip,
  handleClothesEquip,
  requestStarsPaymentLink
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
router.get("/:id/inventory/get-items", getInventoryItems)
router.get("/:id/shop/get-items", getShopItems)
router.post("/:id/inventory/c-unequip", handleClothesUnequip)
router.post("/:id/inventory/c-equip", handleClothesEquip)
router.post('/request-stars-invoice-link', requestStarsPaymentLink)

export default router
