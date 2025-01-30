import UserParameters from "../../../models/user/userParametersModel.mjs"
import TrainingParameters from "../../../models/training/trainingParameters.mjs"
import addActiveProcess from "../../process/functions/addActiveProcess.mjs"
import UserBoost from "../../../models/user/userBoostsModel.mjs"
import process from "../../../models/process/processModel.mjs"
import { ConstantEffects, ConstantEffectTypes } from "../../../models/effects/constantEffectsLevels.mjs"
import getMinutesAndSeconds from "../../../utils/getMinutesAndSeconds.js"
const startTraining = async (userId) => {
  try {
    //Получаем параметры пользователя, если параметров нет, тогда создаем их (проверка на то что сам юзер в базе должна быть в обработчике ручки)
    const user = await UserParameters.findOne({ id: userId })
    if (!user) user = await UserParameters.create({ id: userId })
    const level = await TrainingParameters.findOne({ level: user.level })
    const cond = user?.energy >= 0 && user?.hungry >= 0

    if (!cond)
      return { status: 400, data: { error: "Not enough energy or hungry" } }

    const { training_duration_decrease } = user.constant_effects_levels

    const duration_decrease = await ConstantEffects.findOne({
      type: ConstantEffectTypes.TrainingDurationDecrease,
      level: training_duration_decrease,
    })

    const baseDuration = level?.duration * 60 // in secs for precision
    const durationInSeconds = duration_decrease
      ? Math.floor(
          baseDuration * ((100 - duration_decrease.value_change) / 100)
        )
      : baseDuration
    console.log('base', baseDuration)
    console.log('duration', durationInSeconds)
    const { duration, seconds } = getMinutesAndSeconds(durationInSeconds)

    await user.save()

    await addActiveProcess(userId, "training", user?.level, duration, seconds, {
      duration_decrease: duration_decrease?.value_change
    })

    return { status: 200, data: { status: "ok" } }
  } catch (e) {
    console.log("From start training")
    console.log("Error while get parameters ", e)
  }
}

export default startTraining
