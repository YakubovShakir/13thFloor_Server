import express from "express"
import { getLevelsParameters } from "../../controllers/user/userController.mjs"

const levelsRouter = express.Router()

levelsRouter.get("/getAll", getLevelsParameters)
export default levelsRouter
