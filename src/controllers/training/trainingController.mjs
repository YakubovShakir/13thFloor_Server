import TrainingParameters from "../../models/training/trainingParameters.mjs"
import User from "../../models/user/userModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"
import addActiveProcess from "../../utils/process/addActiveProcess.mjs"

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

export const startTraining = async (userId) => {
  try {
    //Получаем параметры пользователя, если параметров нет, тогда создаем их (проверка на то что сам юзер в базе должна быть в обработчике ручки)
    const user = await UserParameters.findOne({ id: userId })
    if (!user) user = await UserParameters.create({ id: userId })

    let training = await TrainingParameters.findOne({ level: user?.level })
    const cond =
      user?.energy >= training?.energy_spend &&
      user?.hungry >= training?.hungry_spend
    if (!cond)
      return { status: 400, data: { error: "Not enough energy or hungry" } }

    user.hungry -= training?.hungry_spend
    user.energy -= training?.energy_spend

    await user.save()
    await addActiveProcess(userId, "training", user?.level, training?.duration)

    return res.status(200).json({ status: "ok" })
  } catch (e) {
    console.log("Error while get parameters ", e)
  }
}
