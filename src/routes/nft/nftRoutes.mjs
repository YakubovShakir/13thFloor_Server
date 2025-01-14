import express from "express"
import { getLevelsParameters } from "../../controllers/user/userController.mjs"

const nftRoutes = express.Router()

nftRoutes.get("/getAll", getLevelsParameters)
export default nftRoutes
