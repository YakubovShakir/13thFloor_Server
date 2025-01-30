import process from "../../models/process/processModel.mjs"
import LevelsParameters from "../../models/level/levelParametersModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"
import addActiveProcess from "../process/functions/addActiveProcess.mjs"
import { ConstantEffects, ConstantEffectTypes } from "../../models/effects/constantEffectsLevels.mjs"
import getMinutesAndSeconds from '../../utils/getMinutesAndSeconds.js'
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
    })

    return { status: 200, data: {message: "Succesfully start sleep!"}}
  } catch (e) {
    console.log("Error in startSleep", e)
  }
}