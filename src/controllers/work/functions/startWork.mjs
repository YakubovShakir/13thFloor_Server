import {
  ConstantEffects,
  ConstantEffectTypes,
} from "../../../models/effects/constantEffectsLevels.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import Work from "../../../models/work/workModel.mjs"
import getMinutesAndSeconds from "../../../utils/getMinutesAndSeconds.js"
import addActiveProcess from "../../process/functions/addActiveProcess.mjs"

const startWork = async (userId) => {
  try {
    // Получение параметров и работы
    const user = await UserParameters.findOne({ id: userId })
    const work = await Work.findOne({ work_id: user?.work_id })
    if (!user || !work)
      return res.status(404).json({ error: "User or work not found" })

    // Проверка на наличие необходимых параметров
    const moodCosts = work?.mood_cost_in_hour / 60
    const hungryCosts = work?.hungry_cost_in_hour / 60
    const energyCosts = work?.energy_cost_in_hour / 60
    const cond =
      user?.mood >= moodCosts &&
      user?.energy >= energyCosts &&
      user?.hungry >= hungryCosts
    if (!cond)
      return {
        status: 400,
        data: { error: "Not enough Mood or Energy or Hungry" },
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
        baseDuration * ((100 - duration_decrease.value_change) / 100)
      )
    : baseDuration

    const { duration, seconds } = getMinutesAndSeconds(durationInSeconds)

    await addActiveProcess(userId, "work", user?.work_id, duration, seconds, {
      duration_decrease: duration_decrease?.value_change,
      reward_increase: reward_increase?.value_change,
    }, {
      base_duration_in_seconds: baseDuration,
      target_duration_in_seconds: durationInSeconds < baseDuration ? durationInSeconds : null
    })

    return { status: 200, data: { status: "ok" } }
  } catch (e) {
    console.log("ERR in buy work controller - ", e)
  }
}

export default startWork
