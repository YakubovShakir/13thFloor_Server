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
  requestStarsPaymentLink,
  handleShelfEquip,
  buyItemsForCoins,
  getUserInvestments,
  buyInvestmentLevel,
  claimInvestment,
  getUserTasks,
  claimUserTask,
  handleTonWalletConnect,
  handleTonWalletDisconnect
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

router.post("/:userId/wallet/connect", handleTonWalletConnect)
router.post("/:userId/wallet/disconnect", handleTonWalletDisconnect)

router.get("/:userId/inventory/clothes/equip/:id")
router.get("/:userId/inventory/shelf/equip/:id")
router.get("/:id/inventory/get-items", getInventoryItems)
router.get("/:id/shop/get-items", getShopItems)
router.post("/:id/inventory/c-unequip", handleClothesUnequip)
router.post("/:id/inventory/c-equip", handleClothesEquip)
router.post("/:id/shelf/equip", handleShelfEquip)
router.post("/:id/shelf/unequip", handleShelfEquip)
router.post('/request-stars-invoice-link', requestStarsPaymentLink)
router.post('/:id/buy-items-for-coins', buyItemsForCoins)
router.get('/:id/investments', getUserInvestments)
router.post('/:id/investments/buy-level', buyInvestmentLevel)
router.post('/:id/investments/claim', claimInvestment)
router.get('/:id/tasks', getUserTasks)
router.post('/:id/tasks/claim', claimUserTask)

export default router
