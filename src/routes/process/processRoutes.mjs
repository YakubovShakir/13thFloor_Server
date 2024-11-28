import express from "express"
import processController from "../../controllers/process/processController.mjs"

const processRouter = express.Router()

router.post("/start/:type", processController.startProcess)
router.get("/get/", processController.getUserProcesses)
router.get("/getActive/", processController.getUserActiveProcess)
// router.post("/stop")

export default processRouter
