import {
  ConstantEffects,
  ConstantEffectTypes,
} from "../../../models/effects/constantEffectsLevels.mjs"
import process from "../../../models/process/processModel.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import Work from "../../../models/work/workModel.mjs"
import getMinutesAndSeconds from "../../../utils/getMinutesAndSeconds.js"
import addActiveProcess from "../../process/functions/addActiveProcess.mjs"
import moment from "moment-timezone"

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

    console.log(reward_increase)

    const baseDuration = (work?.duration || 1) * 60 // in secs for precision
    const durationInSeconds = duration_decrease
    ? Math.floor(
        baseDuration * ((100 - (duration_decrease?.value_change || 0)) / 100)
      )
    : baseDuration

    const { duration, seconds } = getMinutesAndSeconds(durationInSeconds)

    const reward_at_the_end = Math.floor((work.coins_in_hour + (reward_increase?.value_change || 0)) / 3600 * baseDuration)
    console.log(reward_at_the_end, work.coins_in_hour, reward_increase?.value_change)
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
    console.log("ERR in buy work controller - ", e)
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

    const reward_at_the_end = Number(workProcess.reward_at_the_end)
    const seconds_left = moment().diff(moment(workProcess.createdAt), 'seconds')
    const now = moment()
    const processCreated = moment(workProcess.createdAt)

    console.log('@@@@', now.diff(moment(processCreated), 'seconds'), durationInSeconds)
    
    if (now.diff(moment(processCreated), 'seconds') >= durationInSeconds) {
      console.log('Stopping work process')
      await process.deleteOne({ id: userId, type_id: work.work_id })
      console.log('Stopped work process', reward_at_the_end)
      
      user.coins += reward_at_the_end
      user.energy = Math.min(0, user.energy - Math.floor(work.energy_cost_in_hour / 3600 * Math.min(0, workProcess.base_duration_in_seconds - seconds_left)))
      user.total_earned += reward_at_the_end
      
      await user.save()

      return { status: 200, data: { status: "ok" } }
    }

    throw { status: 401, data: { seconds_left } }
}

export default startWork
