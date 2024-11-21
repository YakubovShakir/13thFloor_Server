import express from "express"
import { updateUserPrestart, getUser } from "../controllers/userController.mjs"
import { getUserParameters } from "../controllers/userParametersController.mjs"
import { getUserProcesses } from "../controllers/userProcessesController.mjs"
import {
  getUserTrainingParameters,
  startUserTraining,
} from "../controllers/trainingsParametersController.mjs"
const router = express.Router()
router.get("/user/:id", getUser)
router.get("/user/:id/processes/:type", getUserProcesses)
router.post("/user/:id/startTraining", startUserTraining)
router.get("/parameters/:id", getUserParameters)
router.get("/training-parameters/:id", getUserTrainingParameters)
router.patch("/updatePrestart/:id", updateUserPrestart)

export default router
