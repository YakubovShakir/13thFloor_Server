import express from "express"
import processController, {checkCanStop} from "../../controllers/process/processController.js"

const processRouter = express.Router()

processRouter.post("/start/", processController.startProcess)
processRouter.post("/stop/", processController.stopActiveProcess)
processRouter.get("/get/", processController.getUserProcesses)
processRouter.get("/getActive/", processController.getUserActiveProcess)
processRouter.get('/check-can-stop/:id', checkCanStop)

export default processRouter
