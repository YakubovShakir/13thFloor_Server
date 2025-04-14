import express from "express"
import { getWorks, buyWork, switchWork } from "../../controllers/work/workController.js"
const router = express.Router()

router.get("/getAll", getWorks)
router.post("/buy", buyWork)
router.post("/switch", switchWork)
export default router
