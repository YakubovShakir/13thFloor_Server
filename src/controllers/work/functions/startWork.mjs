import {
  ConstantEffects,
  ConstantEffectTypes,
} from "../../../models/effects/constantEffectsLevels.mjs"
import process from "../../../models/process/processModel.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import Work from "../../../models/work/workModel.mjs"
import getMinutesAndSeconds from "../../../utils/getMinutesAndSeconds.js"
import { canStartWorking, recalcValuesByParameters } from "../../../utils/parametersDepMath.js"
import { upUserExperience, upUserBalance } from "../../../utils/userParameters/upUserBalance.mjs"
import addActiveProcess from "../../process/functions/addActiveProcess.mjs"
import moment from "moment-timezone"

const startWork = async (userId) => {
  try {
    // Получение параметров и работы
    const user = await UserParameters.findOne({ id: userId })
    const work = await Work.findOne({ work_id: user?.work_id })
    if (!user || !work)
      return res.status(404).json({ error: "User or work not found" })

    if (!canStartWorking(user)) {
      return {
        status: 401,
        data: { error: "Not enough Mood or Energy, or Hungry" },
      }
    }

    const { work_duration_decrease, work_hourly_income_increase } =
      user.constant_effects_levels

    const duration_decrease = await ConstantEffects.findOne({
      type: ConstantEffectTypes.WorkDurationDecrease,
      level: work_duration_decrease,
    })
    const reward_increase = await ConstantEffects.findOne({
      type: ConstantEffectTypes.WorkHourlyIncomeIncrease,
      level: work_hourly_income_increase,
    })

    const baseDuration = (work?.duration || 1) * 60 // in secs for precision
    const durationInSeconds = duration_decrease
    ? Math.floor(
        baseDuration * ((100 - (duration_decrease?.value_change || 0)) / 100)
      )
    : baseDuration

    const { duration, seconds } = getMinutesAndSeconds(durationInSeconds)

    const reward_at_the_end = Math.floor((work.coins_in_hour + (reward_increase?.value_change || 0)) / 3600 * baseDuration)

    await addActiveProcess(userId, "work", user?.work_id, duration, seconds, {
      duration_decrease: duration_decrease?.value_change,
      reward_increase: reward_increase?.value_change,
    }, {
      base_duration_in_seconds: baseDuration,
      reward_at_the_end: reward_at_the_end,
      target_duration_in_seconds: durationInSeconds < baseDuration ? durationInSeconds : null
    })

    return { status: 200, data: { status: "ok" } }
  } catch (e) {
    console.log("Error in startWork", e)
  }
}

export const checkCanStopWork = async (userId) => {
  // Получение параметров и работы
  const user = await UserParameters.findOne({ id: userId })
  const work = await Work.findOne({ work_id: user?.work_id })
  const workProcess = await process.findOne({ id: userId, type_id: work.work_id })

  if (!user || !work || !workProcess)
    return { status: 403, data: { } }

  const durationInSeconds = workProcess.target_duration_in_seconds || workProcess.base_duration_in_seconds

  const now = moment()
  const processStartTime = moment(workProcess.createdAt)
  const lastUpdateTime = moment(workProcess.user_parameters_updated_at || processStartTime)
  const elapsedSeconds = now.diff(processStartTime, "seconds")
  const secondsSinceLastUpdate = now.diff(lastUpdateTime, "seconds")
  const seconds_left = Math.max(0, durationInSeconds - elapsedSeconds)

  // Calculate the actual worked duration since last update
  const actualWorkedDuration = Math.min(secondsSinceLastUpdate, seconds_left)

  // Calculate resource consumption since last update
  const moodCost = (work.mood_cost_in_hour / 3600) * actualWorkedDuration
  const hungryCost = (work.hungry_cost_in_hour / 3600) * actualWorkedDuration
  const energyCost = (work.energy_cost_in_hour / 3600) * actualWorkedDuration

  if (seconds_left === 0) {
    await process.deleteOne({ id: userId, type_id: work.work_id })
    
    const rewardIncreaseHourly = workProcess.effects.reward_increase || 0
    const workReward = (work.coins_in_hour + rewardIncreaseHourly) / 3600 * workProcess.base_duration_in_seconds
    
    // user.experience += 
    user.mood = Math.max(0, user.mood - moodCost)
    user.hungry = Math.max(0, user.hungry - hungryCost)
    user.energy = Math.max(0, user.energy - energyCost)

    await recalcValuesByParameters(user, { coinsReward: workReward })
    await upUserExperience(userId, work.experience_reward)
    await user.save()

    return { status: 200, data: { status: "ok" } }
  }

  throw { status: 401, data: { seconds_left } }
}

export default startWork
