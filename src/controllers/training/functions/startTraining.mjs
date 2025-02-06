import UserParameters from "../../../models/user/userParametersModel.mjs"
import TrainingParameters from "../../../models/training/trainingParameters.mjs"
import addActiveProcess from "../../process/functions/addActiveProcess.mjs"
import UserBoost from "../../../models/user/userBoostsModel.mjs"
import process from "../../../models/process/processModel.mjs"
import {
  ConstantEffects,
  ConstantEffectTypes,
} from "../../../models/effects/constantEffectsLevels.mjs"
import getMinutesAndSeconds from "../../../utils/getMinutesAndSeconds.js"
import moment from "moment-timezone"
import { BoostsOnNextUse, ProcessTypes } from "../../../models/boost/boostsOnNextUse.js"

const startTraining = async (userId) => {
  try {
    //Получаем параметры пользователя, если параметров нет, тогда создаем их (проверка на то что сам юзер в базе должна быть в обработчике ручки)
    const user = await UserParameters.findOne({ id: userId })
    if (!user) user = await UserParameters.create({ id: userId })
    const level = await TrainingParameters.findOne({ level: user.level })
    const cond = user?.energy >= 0 && user?.hungry >= 0

    if (!cond)
      return { status: 400, data: { error: "Not enough energy or hungry" } }

    // Take oldest in queue
    const boost = await BoostsOnNextUse.findOne({ user_id: userId, on_process: ProcessTypes.TRAINING, activated: false })

    const { training_duration_decrease } = user.constant_effects_levels

    const duration_decrease = await ConstantEffects.findOne({
      type: ConstantEffectTypes.TrainingDurationDecrease,
      level: training_duration_decrease,
    })

    const baseDuration = level?.duration * 60 // in secs for precision
    const durationInSeconds = duration_decrease
      ? Math.floor(
          baseDuration * ((100 - ((duration_decrease?.value_change || 0) + (boost?.duration_decrease ? (boost?.effects?.duration_decrease || 0) : 0))) / 100)
        )
      : baseDuration
    console.log("base", baseDuration)
    console.log("duration", durationInSeconds)
    const { duration, seconds } = getMinutesAndSeconds(durationInSeconds)

    await user.save()

    await addActiveProcess(
      userId,
      "training",
      user?.level,
      duration,
      seconds,
      {
        duration_decrease: (duration_decrease?.value_change || 0) + (boost?.effects?.duration_decrease || 0),
        energy_cost_decrease: boost?.effects?.energy_cost_decrease || null,
        mood_increase: boost?.effects?.mood_increase || null,
      },
      {
        base_duration_in_seconds: baseDuration,
        target_duration_in_seconds: durationInSeconds
      }
    )

    if(boost) {
      boost.activated = true
      await boost.save()
    }

    return { status: 200, data: { status: "ok" } }
  } catch (e) {
    console.log("From start training")
    console.log("Error while get parameters ", e)
  }
}

export const checkCanStopTraining = async (userId) => {
  // Получение параметров и тренировки
  const user = await UserParameters.findOne({ id: userId })
  const trainingProcess = await process.findOne({ id: userId, type: 'training' })
  const trainingParameters = await TrainingParameters.findOne({ level: user.level })

  if (!user || !trainingProcess || !trainingParameters)
    return { status: 403, data: { } }

  const durationInSeconds = trainingProcess.target_duration_in_seconds || trainingProcess.base_duration_in_seconds

  const now = moment()
  const processStartTime = moment(trainingProcess.createdAt)
  const lastUpdateTime = moment(trainingProcess.user_parameters_updated_at || trainingProcess.updatedAt)
  const elapsedSeconds = now.diff(processStartTime, "seconds")
  const secondsSinceLastUpdate = now.diff(lastUpdateTime, "seconds")
  const seconds_left = Math.max(0, durationInSeconds - elapsedSeconds)


  const energyCostBase = (trainingParameters.energy_spend / (trainingParameters.duration * 60)) * secondsSinceLastUpdate
  const energyCost = energyCostBase * ((100 - (trainingProcess.effects?.energy_cost_decrease !== null ? trainingProcess.effects?.energy_cost_decrease : 0)) / 100)
  console.log(energyCost, trainingProcess.effects?.energy_cost_decrease)
  const hungryBaseCost = (trainingParameters.hungry_spend / (trainingParameters.duration * 60)) * secondsSinceLastUpdate
  const hungryCost = hungryBaseCost * ((100 - (trainingProcess.effects?.hunger_cost_decrease !== null ? trainingProcess.effects?.hunger_cost_decrease : 0)) / 100)
  
  //! TRAINING BOOST SECTOR

  // Calculate mood change with increase percentage
  const baseMoodProfit = (tp.mood_profit / (tp.duration * 60)) * secondsSinceLastUpdate
  const moodProfit = baseMoodProfit * ((100 + (trainingProcess.effects?.mood_increase !== null ? trainingProcess.effects?.mood_increase : 0)) / 100)

  console.log(secondsSinceLastUpdate, { energyCost, hungryCost })

  if (seconds_left === 0 || user.energy === 0 || user.hungry === 0) {
    console.log('Stopping training process')
    await process.deleteOne({ id: userId, type: 'training' })

    user.energy = Math.max(0, user.energy - energyCost)
    user.hungry = Math.max(0, user.hungry - hungryCost)
    user.mood = Math.min(100, user.mood + moodProfit)

    await user.save()

    return { status: 200, data: { status: "ok" } }
  }

  throw { status: 401, data: { seconds_left } }
}

export default startTraining
