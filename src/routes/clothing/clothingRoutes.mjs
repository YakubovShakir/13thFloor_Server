import express from "express"
import {
  getClothingCatalog,
  equipClothing,
  unequipClothing,
} from "../controllers/clothingController.mjs"

const router = express.Router()

router.get("/catalog", getClothingCatalog)

router.post("/equip", equipClothing)

router.post("/unequip", unequipClothing)

export default router
