import express from "express"
import { updateUserPrestart, getUser } from "../controllers/userController.mjs"

const router = express.Router()
router.get("/user/:id", getUser)
router.patch("/updatePrestart/:id", updateUserPrestart)
export default router
