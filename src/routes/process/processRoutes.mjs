import express from "express"
import { startProcess } from "../../controllers/process/processController.mjs"
const processRouter = express.Router()

router.post("/start/:type", startProcess)
// router.post("/stop")

export default processRouter
