import UserParameters from "../../../models/user/userParametersModel.mjs"
import TrainingParameters from "../../../models/training/trainingParameters.mjs"
import addActiveProcess from "../../process/functions/addActiveProcess.mjs"
import UserBoost from "../../../models/user/userBoostsModel.mjs"
import process from "../../../models/process/processModel.mjs"
const startTraining = async (userId) => {
  try {
    //Получаем параметры пользователя, если параметров нет, тогда создаем их (проверка на то что сам юзер в базе должна быть в обработчике ручки)
    const user = await UserParameters.findOne({ id: userId })
    if (!user) user = await UserParameters.create({ id: userId })

    const trainingBoost = await process.findOne({
      id: userId,
      type: "boost",
      type_id: 3,
    })

    let training = await TrainingParameters.findOne({ level: user?.level })
    const trainingEnergySpend = trainingBoost
      ? training?.energy_spend / 2
      : training?.energy_spend
    const trainingHungrySpend = trainingBoost
      ? training?.hungry_spend / 2
      : training?.hungry_spend
    const cond =
      user?.energy >= trainingEnergySpend * training?.duration &&
      user?.hungry >= trainingHungrySpend * training?.duration
    console.log(trainingEnergySpend, trainingHungrySpend)
    if (!cond)
      return { status: 400, data: { error: "Not enough energy or hungry" } }

    user.hungry -= trainingHungrySpend * training?.duration
    user.energy -= trainingEnergySpend * training?.duration

    await user.save()
    await addActiveProcess(userId, "training", user?.level, training?.duration)

    return { status: 200, data: { status: "ok" } }
  } catch (e) {
    console.log("Error while get parameters ", e)
  }
}

export default startTraining
