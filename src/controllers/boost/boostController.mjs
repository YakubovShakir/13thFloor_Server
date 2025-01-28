import Boost from "../../models/boost/boostModel.mjs"
import addProcess from "../process/functions/addProcess.mjs"
import UserBoost from "../../models/user/userBoostsModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"

import useEnergyCup from "./functions/useEnergyCup.mjs"
import useTonicDrink from "./functions/useTonicDrink.mjs"
import usePersonalTraining from "./functions/usePersonalTraining.mjs"
import useRelaxMassage from "./functions/useRelaxMassage.mjs"
import useRobotHelper from "./functions/useRobotHelper.mjs"
import useLearnSpeed from "./functions/useLearnSpeed.mjs"

export const getBoosts = async (req, res) => {
  try {
    const boosts = await Boost.find({}).sort({ boost_id: 1 })
    if (boosts) return res.status(200).send({ boosts })
  } catch (e) {
    console.log("Error while getBoosts", e)
  }
}

export const getUserBoosts = async (req, res) => {
  const { userId } = req.params
  if (!parseInt(userId))
    return res.status(400).send({ message: "userId are required" })

  try {
    const userBoosts = await UserBoost.find({ id: userId })

    return res.status(200).json({ userBoosts })
  } catch (e) {
    console.log("Error in getUserBoosts", e)
    return res.status(500).send({ error: "Internal server error" })
  }
}
export const buyBoost = async (req, res) => {
  const { userId, boostId } = req.query

  if (!parseInt(userId) || !parseInt(boostId)) {
    return res.status(400).send({ message: "userId and boostId are required" })
  }

  try {
    const boost = await Boost.findOne({ boost_id: boostId })
    if (!boost) {
      return res.status(404).send({ message: "Boost not found" })
    }

    const user = await UserParameters.findOne({ id: userId })
    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }

    if (user.coins < boost.stars_price) {
      return res.status(400).send({ message: "Not enough stars to buy boost" })
    }

    user.coins -= boost.stars_price
    await UserBoost.create({ id: userId, boost_id: boostId })

    await user.save()

    return res.status(200).send({
      message: "Boost purchased and applied successfully",
    })
  } catch (e) {
    console.error("Error buying boost: ", e)
    return res.status(500).send({ error: "Internal server error" })
  }
}

export const useBoost = async (req, res) => {
  const { userId, boostId } = req.query

  if (!parseInt(userId) || !parseInt(boostId)) {
    return res.status(400).send({ message: "userId and boostId are required" })
  }

  try {
    const userParameters = await UserParameters.findOne({ id: userId })
    const userBoost = await UserBoost.findOne({ id: userId, boost_id: boostId })
    // if (!userBoost) {
    //   return res.status(403).send({ message: "You dont have this boost" })
    // }
    const boost = await Boost.findOne({ boost_id: boostId })
    let result
    let skillId
    switch (boost.type) {
      case "energy-cap":
        result = await useEnergyCup(userParameters)
        break
      case "tonic-drink":
        result = await useTonicDrink(userId)
        break
      case "personal-training":
        result = await usePersonalTraining(userId)
        break
      case "relax-massage":
        result = await useRelaxMassage(userParameters)
        break
      case "robot-helper-12":
        result = await useRobotHelper(userId, 5)
        break
      case "robot-helper-24":
        result = await useRobotHelper(userId, 6)
        break
      case "learn-speed-20":
        skillId = parseInt(req.query.skillId)
        if (!skillId)
          return res.status(400).send({ error: "skillId is incorrect" })

        result = await useLearnSpeed(userId, skillId, 0.2)
        break
      case "learn-speed-50":
        skillId = parseInt(req.query.skillId)
        if (!skillId)
          return res.status(400).send({ error: "skillId is incorrect" })

        result = await useLearnSpeed(userId, skillId, 0.5)
        break
      default:
        return res.status(500).send({ error: "Internal server error" })
    }
    if (!result) return res.status(400).send({ error: "Cannot use this boost" })

    await UserBoost.deleteOne({ id: userId, boost_id: boostId })

    return res.status(200).send({ status: "ok" })
  } catch (e) {
    console.error("Error in useBoost: ", e)
    res.status(500).send({ error: "Internal server error" })
  }
}
