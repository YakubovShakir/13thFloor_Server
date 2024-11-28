import express from "express"
import { getWorks, buyWork } from "../../controllers/work/workController.mjs"
const router = express.Router()

router.get("/all", getWorks)
router.post("/buy", buyWork)
// router.post("/start", startWork)
export default router
