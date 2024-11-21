import express from "express"
import { getWorks } from "../controllers/worksController.mjs"
const router = express.Router()

router.get("/all", getWorks)

export default router
