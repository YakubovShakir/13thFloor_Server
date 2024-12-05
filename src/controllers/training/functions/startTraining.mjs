import UserParameters from "../../../models/user/userParametersModel.mjs"
import TrainingParameters from "../../../models/training/trainingParameters.mjs"
import addActiveProcess from "../../process/functions/addActiveProcess.mjs"

const startTraining = async (userId) => {
  try {
    //Получаем параметры пользователя, если параметров нет, тогда создаем их (проверка на то что сам юзер в базе должна быть в обработчике ручки)
    const user = await UserParameters.findOne({ id: userId })
    if (!user) user = await UserParameters.create({ id: userId })

    let training = await TrainingParameters.findOne({ level: user?.level })
    const cond =
      user?.energy >= training?.energy_spend * training?.duration &&
      user?.hungry >= training?.hungry_spend * training?.duration
    if (!cond)
      return { status: 400, data: { error: "Not enough energy or hungry" } }

    user.hungry -= training?.hungry_spend * training?.duration
    user.energy -= training?.energy_spend * training?.duration

    await user.save()
    await addActiveProcess(userId, "training", user?.level, training?.duration)

    return { status: 200, data: { status: "ok" } }
  } catch (e) {
    console.log("Error while get parameters ", e)
  }
}

export default startTraining
