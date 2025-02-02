import process from "../../models/process/processModel.mjs"
import LevelsParameters from "../../models/level/levelParametersModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"
import addActiveProcess from "../process/functions/addActiveProcess.mjs"
import { ConstantEffects, ConstantEffectTypes } from "../../models/effects/constantEffectsLevels.mjs"
import getMinutesAndSeconds from '../../utils/getMinutesAndSeconds.js'
import moment from "moment-timezone"

export const startSleep = async (userId) => {
  try {
    const user = await UserParameters.findOne({id: userId})
    const level = await LevelsParameters.findOne({ level: user.level })
    const { sleeping_duration_decrease } = user.constant_effects_levels
    
    const duration_decrease = await ConstantEffects.findOne({
          type: ConstantEffectTypes.SleepingDurationDecrease,
          level: sleeping_duration_decrease,
        })
    
    const baseDuration = (level?.sleep_duration || 1) * 60 // in secs for precision
    const durationInSeconds = duration_decrease
          ? Math.floor(
              baseDuration * ((100 - duration_decrease.value_change) / 100)
            )
          : baseDuration
    
    const { duration, seconds } = getMinutesAndSeconds(durationInSeconds)

    await addActiveProcess(userId, "sleep", user?.level, duration, seconds, {
      duration_decrease: duration_decrease?.value_change
    }, {
      base_duration_in_seconds: baseDuration,
      target_duration_in_seconds: durationInSeconds
    })

    return { status: 200, data: {message: "Succesfully start sleep!"}}
  } catch (e) {
    console.log("Error in startSleep", e)
  }
}

export const checkCanStopSleep = async (userId) => {
  // Получение параметров и работы
  const user = await UserParameters.findOne({ id: userId })
  const sleepProcess = await process.findOne({ id: userId, type: 'sleep' })

  if (!user || !sleepProcess)
    return { status: 403, data: { } }

  const durationInSeconds = sleepProcess.target_duration_in_seconds || sleepProcess.base_duration_in_seconds
  const seconds_left = moment().diff(moment(sleepProcess.createdAt), 'seconds')
  const now = moment()
  const processCreated = moment(sleepProcess.createdAt)

  console.log('@@@@', now.diff(moment(processCreated), 'seconds'), durationInSeconds)
  
  if (now.diff(moment(processCreated), 'seconds') >= durationInSeconds) {
    console.log('Stopping sleep process')
    await process.deleteOne({ id: userId, type: 'sleep' })

    user.energy = Math.min(user.energy_capacity, user.energy_capacity / sleepProcess.base_duration_in_seconds * Math.min(0, sleepProcess.base_duration_in_seconds - seconds_left))
    
    await user.save()

    return { status: 200, data: { status: "ok" } }
  }

  throw { status: 401, data: { seconds_left } }
}