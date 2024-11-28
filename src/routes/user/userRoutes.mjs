import express from "express"
import {
  updateUserPrestart,
  getUser,
} from "../../controllers/user/userController.mjs"
import { getUserParameters } from "../../controllers/user/userParametersController.mjs"
import {
  getUserProcesses,
  getUserActiveProcess,
} from "../../controllers/process/processController.mjs"
import { getUserTrainingParameters } from "../../controllers/training/trainingController.mjs"

const router = express.Router()
router.get("/user/:id", getUser)
router.get("/user/:id/processes/:type", getUserProcesses)
router.get("/user/:id/process/active/", getUserActiveProcess)
// router.post("/user/:id/startTraining", startUserTraining)
router.get("/parameters/:id", getUserParameters)
router.get("/training-parameters/:id", getUserTrainingParameters)
router.patch("/updatePrestart/:id", updateUserPrestart)

export default router
