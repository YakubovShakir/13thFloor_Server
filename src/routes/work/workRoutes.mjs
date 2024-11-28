import express from "express"
import { getWorks, buyWork } from "../../controllers/work/workController.mjs"
const router = express.Router()

router.get("/getAll", getWorks)
router.post("/buy", buyWork)
export default router
