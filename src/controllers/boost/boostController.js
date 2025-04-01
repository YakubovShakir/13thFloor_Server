import Boost from "../../models/boost/boostModel.js";
import UserBoost from "../../models/user/userBoostsModel.js";
import UserParameters from "../../models/user/userParametersModel.js";
import { withTransaction } from "../../utils/dbUtils.js"
import useEnergyCup from "./functions/useEnergyCup.js";
import useTonicDrink from "./functions/useTonicDrink.js";
import usePersonalTraining from "./functions/usePersonalTraining.js";
import useRelaxMassage from "./functions/useRelaxMassage.js";
import useLearnSpeed from "./functions/useLearnSpeed.js";

export const getBoosts = async (req, res) => {
  try {
    const boosts = await Boost.find({}).sort({ boost_id: 1 });
    return res.status(200).send({ boosts });
  } catch (e) {
    console.log("Error while getBoosts", e);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const getUserBoosts = async (req, res) => {
  try {
    const userBoosts = await UserBoost.find({ id: req.userId });
    console.log(req.userId, userBoosts);
    return res.status(200).json({ userBoosts });
  } catch (e) {
    console.log("Error in getUserBoosts", e);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const useBoost = async (req, res) => {
  const { boostId } = req.query;
  const sub_type = req.query.sub_type || null;

  if (!parseInt(boostId)) {
    return res.status(400).send({ message: "boostId is required" });
  }

  try {
    const result = await withTransaction(async (session) => {
      const userParameters = await UserParameters.findOne({ id: req.userId }).session(session);
      const userBoost = await UserBoost.findOne({ id: req.userId, boost_id: boostId }).session(session);
      if (!userBoost) {
        throw new Error("You dont have this boost");
      }
      const boost = await Boost.findOne({ boost_id: boostId }).session(session);
      let operationResult;
      let skillId;

      switch (boost.type) {
        case "energy-cap":
          operationResult = await useEnergyCup(userParameters, session);
          break;
        case "tonic-drink":
          operationResult = await useTonicDrink(req.userId, session);
          break;
        case "personal-training":
          operationResult = await usePersonalTraining(req.userId, boostId, session);
          break;
        case "relax-massage":
          operationResult = await useRelaxMassage(userParameters, session);
          break;
        case "learn-speed-20":
          skillId = parseInt(req.query.skillId);
          if (!skillId) throw new Error("skillId is incorrect");
          console.log(skillId, sub_type);
          operationResult = await useLearnSpeed(req.userId, skillId, sub_type, 25, session);
          break;
        case "learn-speed-50":
          skillId = parseInt(req.query.skillId);
          if (!skillId) throw new Error("skillId is incorrect");
          console.log(skillId, sub_type);
          operationResult = await useLearnSpeed(req.userId, skillId, sub_type, 50, session);
          break;
        default:
          throw new Error("Unknown boost type");
      }

      if (!operationResult) throw new Error("Cannot use this boost");
      await UserBoost.deleteOne({ id: req.userId, boost_id: boostId }).session(session);
      return { status: "ok" };
    });

    return res.status(200).send(result);
  } catch (e) {
    console.error("Error in useBoost: ", e);
    res.status(e.message === "You dont have this boost" ? 403 : 400).send({ error: e.message });
  }
};