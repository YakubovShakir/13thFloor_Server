import TrainingParameters from "../../models/training/trainingParameters.mjs"
import User from "../../models/user/userModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"
import UserProcess from "../../models/process/processModel.mjs"
import { addProcess, getUserProcesses } from "../process/processController.mjs"

export const getUserTrainingParameters = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    if (!userId) return res.status(400).json({ error: "not valid id" })

    const user = await User.findOne({ id: userId })
    if (!user) return res.status(404).json({ error: "user not found" })

    const parameters = await UserParameters.findOne({ id: userId })
    if (!parameters) {
      parameters = await UserParameters.create({ id: userId })
    }

    let tp = await TrainingParameters.findOne({ level: parameters?.level })
    if (tp) return res.status(200).json({ training_parameters: tp })
    else return res.status(404).json({ error: "tp not found" })
  } catch (e) {
    console.log("Error while get parameters ", e)
  }
}

export const startUserTraining = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    if (!userId) return res.status(400).json({ error: "not valid id" })

    const user = await User.findOne({ id: userId })
    if (!user) return res.status(404).json({ error: "user not found" })

    const parameters = await UserParameters.findOne({ id: userId })
    if (!parameters) {
      parameters = await UserParameters.create({ id: userId })
    }

    let tp = await TrainingParameters.findOne({ level: parameters?.level })
    if (!tp) return res.status(404).json({ error: "tp not found" })

    const activeProcess = await UserProcess.findOne({
      id: userId,
      active: true,
    })
    if (activeProcess)
      return res.status(400).json({ error: "only 1 active process can be" })

    // Cond parameters
    if (
      parameters?.energy < tp?.energy_spend ||
      parameters?.hungry < tp?.hungry_spend
    )
      return res.status(400).json({ error: "Not enough energy or hungry" })

    parameters.hungry -= tp?.hungry_spend
    parameters.energy -= tp?.energy_spend

    await parameters.save()

    // addProcess
    await addProcess(userId, "training", tp?.level)

    return res.status(200).json({ status: "ok" })
  } catch (e) {
    console.log("Error while get parameters ", e)
  }
}
