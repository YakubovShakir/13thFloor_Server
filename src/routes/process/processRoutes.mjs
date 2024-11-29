import express from "express"
import processController from "../../controllers/process/processController.mjs"

const processRouter = express.Router()

processRouter.post("/start/", processController.startProcess)
processRouter.post("/stop/", processController.stopActiveProcess)
processRouter.get("/get/", processController.getUserProcesses)
processRouter.get("/getActive/", processController.getUserActiveProcess)
// router.post("/stop")

export default processRouter
