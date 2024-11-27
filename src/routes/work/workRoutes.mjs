import express from "express"
import {
  getWorks,
  buyWork,
  startWork,
} from "../../controllers/work/worksController.mjs"
const router = express.Router()

router.get("/all", getWorks)
router.post("/buy", buyWork)
router.post("/start", startWork)
export default router
