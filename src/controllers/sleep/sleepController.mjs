import UserParameters from "../../models/user/userParametersModel.mjs"
import UserProcess from "../../models/userProcessModel.mjs"
import LevelsParameters from "../../models/level/levelsParametersModel.mjs"

export const startSleep = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    return res.status(400).send({ message: "userId is required" })
  }

  try {
    const user = await UserParameters.findOne({ id: userId })
    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }

    const levelParameters = await LevelsParameters.findOne({
      level: user.level,
    })
    if (!levelParameters) {
      return res.status(404).send({ message: "Level parameters not found" })
    }

    let sleepDuration = levelParameters.sleep_duraion

    if (user.recovery_ratios.energy > 1) {
      sleepDuration = Math.ceil(sleepDuration / user.recovery_ratios.energy)
    }

    const sleepProcess = new UserProcess({
      id: userId,
      active: true,
      type: "sleep",
      type_id: user.level,
      duration: sleepDuration,
    })

    await sleepProcess.save()

    res.status(200).send({
      message: "Sleep started successfully",
      sleep: {
        duration: sleepDuration,
        progressBar: "decreasing",
        visualization: "sheep_jump",
      },
    })
  } catch (e) {
    console.error("Error starting sleep: ", e)
    res.status(500).send({ error: "Internal server error" })
  }
}

export const updateSleepProgress = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    return res.status(400).send({ message: "userId is required" })
  }

  try {
    const sleepProcess = await UserProcess.findOne({
      id: userId,
      active: true,
      type: "sleep",
    })

    if (!sleepProcess) {
      return res.status(404).send({ message: "No active sleep process found" })
    }

    sleepProcess.duration = Math.max(0, sleepProcess.duration - 30)
    await sleepProcess.save()

    res.status(200).send({
      message: "Sleep progress updated",
      remainingTime: sleepProcess.duration,
    })
  } catch (e) {
    console.error("Error updating sleep progress: ", e)
    res.status(500).send({ error: "Internal server error" })
  }
}

export const completeSleep = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    return res.status(400).send({ message: "userId is required" })
  }

  try {
    const sleepProcess = await UserProcess.findOne({
      id: userId,
      active: true,
      type: "sleep",
    })

    if (!sleepProcess) {
      return res.status(404).send({ message: "No active sleep process found" })
    }

    if (sleepProcess.duration > 0) {
      return res.status(400).send({ message: "Sleep is not yet completed" })
    }

    const user = await UserParameters.findOne({ id: userId })
    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }

    user.energy = Math.min(user.energy_capacity, user.energy_capacity)
    await user.save()

    sleepProcess.active = false
    await sleepProcess.save()

    res.status(200).send({
      message: "Sleep completed successfully",
      updatedStats: {
        energy: user.energy,
      },
    })
  } catch (e) {
    console.error("Error completing sleep: ", e)
    res.status(500).send({ error: "Internal server error" })
  }
}
