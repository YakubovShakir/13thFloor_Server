import processModel from "../../models/process/processModel.js";
import User from "../../models/user/userModel.js";
import { withTransaction } from "../../utils/dbUtils.js"
import startWork, { checkCanStopWork } from "../work/functions/startWork.js";
import startTraining, { checkCanStopTraining } from "../training/functions/startTraining.js";
import { checkCanStopSleep, startSleep } from "../sleep/sleepController.js";
import { checkCanStopLearning } from '../skill/skillController.js';
import buySkill from "../skill/functions/buySkill.js";
import buyFood from "../food/functions/buyFood.js";
import Work from "../../models/work/workModel.js";
import moment from "moment-timezone";

export const startProcess = async (req, res) => {
  try {
    const processType = req.query.type;
    if (!["food", "work", "skill", "training", "sleep"].includes(processType)) {
      return res.status(400).json({ error: "Not valid type" });
    }

    const result = await withTransaction(async (session) => {
      const user = await User.findOne({ id: req.userId }).session(session);
      if (!user) throw new Error("user not found");

      let operationResult;
      switch (processType) {
        case "work":
          operationResult = await startWork(req.userId, session);
          break;
        case "training":
          operationResult = await startTraining(req.userId, session);
          break;
        case "sleep":
          operationResult = await startSleep(req.userId, session);
          break;
        case "skill":
          const skillId = parseInt(req.query.typeId);
          const sub_type = req.query.sub_type;
          if (!skillId) throw new Error("Incorrect skillId!");
          console.log(sub_type, skillId);
          operationResult = await buySkill(req.userId, skillId, sub_type, session);
          break;
        case "food":
          const foodId = parseInt(req.query.typeId);
          if (!foodId) throw new Error("Incorrect foodId!");
          operationResult = await buyFood(req.userId, foodId, session);
          break;
      }
      return operationResult;
    });

    return res.status(result?.status || 200).json({ ...result?.data });
  } catch (e) {
    console.log("Error in startProcess - ", e);
    res.status(e.message === "user not found" ? 404 : 400).json({ error: e.message });
  }
};

export const stopActiveProcess = async (req, res) => {
  console.log("Stopping process");
  try {
    const result = await withTransaction(async (session) => {
      const user = await User.findOne({ id: req.userId }).session(session);
      if (!user) throw new Error("User not found!");

      const activeProcess = await processModel.findOne({ id: req.userId, active: true }).session(session);
      if (!activeProcess) throw new Error("Active Process not found!");

      await processModel.deleteOne({ id: req.userId, active: true }).session(session);
      return { status: "ok" };
    });

    return res.status(200).json(result);
  } catch (e) {
    console.log("Error in stopActiveProcess - ", e);
    res.status(e.message === "User not found!" ? 404 : 404).json({ error: e.message });
  }
};

export const getUserProcesses = async (req, res) => {
  try {
    const processType = req.query.type;
    if (!["food", "work", "skill", "training", "boost"].includes(processType)) {
      return res.status(400).json({ error: "<type> is wrong!" });
    }

    const user = await User.findOne({ id: req.userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const processes = await processModel.find(
      { id: req.userId, type: processType },
      { _id: false }
    );
    return res.status(200).json({ processes });
  } catch (e) {
    console.log("Error while getUserProcesses - ", e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const checkCanStop = async (req, res) => {
  const { sub_type: subType = null, type: processType, id } = req.body;

  try {
    const activeProcess = id
      ? await processModel.findOne({ id: req.userId, type: processType, type_id: id })
      : await processModel.findOne({ id: req.userId, type: processType });

    if (!activeProcess) {
      return res.status(404).json({});
    }

    let result;
    switch (activeProcess.type) {
      case "work":
        result = await checkCanStopWork(req.userId, activeProcess);
        break;
      case "training":
        result = await checkCanStopTraining(req.userId, activeProcess);
        break;
      case "sleep":
        result = await checkCanStopSleep(req.userId, activeProcess);
        break;
      case "skill":
        const skillProcess = await processModel.findOne({ type: 'skill', sub_type: subType });
        result = await checkCanStopLearning(req.userId, skillProcess);
        break;
      case "food":
        if (moment().diff(moment(activeProcess.createdAt), 'seconds') >= (activeProcess.target_duration_in_seconds || activeProcess.base_duration_in_seconds)) {
          await withTransaction(async (session) => {
            await processModel.deleteOne({ _id: activeProcess._id }).session(session);
          });
        }
        return res.status(200).json({});
      default:
        return res.status(200).json({ status: 'ok' });
    }

    return res.status(result.status).json(result.data);
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json(err.data || { error: "Internal server error" });
  }
};

export const getUserActiveProcess = async (req, res) => {
  try {
    let user = await User.findOne({ id: req.userId });
    if (!user) {
      user = await withTransaction(async (session) => {
        return await new User({
          id: req.userId,
          prestart: true,
          personage: {},
          shelf: [],
        }).save({ session });
      });
    }

    const activeProcess = await processModel.findOne(
      { id: req.userId, active: true },
      { _id: false }
    );

    if (activeProcess) {
      let activeProcessWithCoins;
      if (activeProcess.type === "work") {
        const work = await Work.findOne({ work_id: activeProcess.type_id });
        activeProcessWithCoins = { ...activeProcess._doc };
        activeProcessWithCoins.coins_in_hour = work?.coins_in_hour || null;
      }
      return res.status(200).json({ process: activeProcessWithCoins || activeProcess });
    } else {
      return res.status(200).json({ process: null });
    }
  } catch (e) {
    console.log("Error while getUserActiveProcesses - ", e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  startProcess,
  stopActiveProcess,
  getUserActiveProcess,
  getUserProcesses,
};