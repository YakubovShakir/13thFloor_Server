import express from "express"
import {
  createClan,
  joinClan,
  getAvailableClans,
} from "../controllers/clanController.mjs"

const router = express.Router()

router.post("/create", createClan)

router.post("/join", joinClan)

router.get("/available", getAvailableClans)

export default router
