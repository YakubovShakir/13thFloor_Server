import express from "express"
import {
  updateUserPrestart,
  getUser,
} from "../../controllers/user/userController.mjs"
import { getUserParameters } from "../../controllers/user/userParametersController.mjs"

import { getUserTrainingParameters } from "../../controllers/training/trainingController.mjs"

const router = express.Router()
router.get("/user/:id", getUser)

router.get("/parameters/:id", getUserParameters)
router.get("/training-parameters/:id", getUserTrainingParameters)
router.patch("/updatePrestart/:id", updateUserPrestart)
export default router
