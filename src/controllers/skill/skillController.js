import { request } from "express"
import Skill from "../../models/skill/skillModel.js"
import UserSkill from "../../models/user/userSkillModel.js"
import { ConstantEffects, ConstantEffectTypes } from "../../models/effects/constantEffectsLevels.js"
import UserParameters from "../../models/user/userParametersModel.js"
import gameProcess from '../../models/process/processModel.js'
import moment from 'moment-timezone'

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({}).sort({ coins_price: 1 })
    if (skills) res.status(200).send({ skills })
  } catch (e) {
    console.log("Error while getSkills ", e)
  }
}

export const getUserSkills = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    if (!userId) return res.status(400).json({ error: "Query Not Valid" })

    const userSkills = await UserSkill.find({ id: userId })
    return res.status(200).json({ skills: userSkills })
  } catch (e) {
    console.log("Error in getUserSkills - ", e)
  }
}

export const getConstantEffects = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    if (!userId) return res.status(400).json({ error: "Query Not Valid" })
    
    const userParams = await UserParameters.findOne({ id: userId })
    if(!userParams) return res.status(400).json({ error: "User params not valid" })

    const response = {
      work_duration_decrease: {
        current: await ConstantEffects.findOne({ type: ConstantEffectTypes.WorkDurationDecrease, level: userParams.constant_effects_levels.work_duration_decrease }),
        next: await ConstantEffects.findOne({ type: ConstantEffectTypes.WorkDurationDecrease, level: (userParams.constant_effects_levels.work_duration_decrease || 0) + 1 }),
      },
      training_duration_decrease: {
        current: await ConstantEffects.findOne({ type: ConstantEffectTypes.TrainingDurationDecrease, level: userParams.constant_effects_levels.training_duration_decrease }),
        next: await ConstantEffects.findOne({ type: ConstantEffectTypes.TrainingDurationDecrease, level: (userParams.constant_effects_levels.training_duration_decrease || 0) + 1 }),
      },
      sleeping_duration_decrease: {
        current: await ConstantEffects.findOne({ type: ConstantEffectTypes.SleepingDurationDecrease, level: userParams.constant_effects_levels.sleeping_duration_decrease }),
        next: await ConstantEffects.findOne({ type: ConstantEffectTypes.SleepingDurationDecrease, level: (userParams.constant_effects_levels.sleeping_duration_decrease || 0) + 1 }),
      },
      work_hourly_income_increase: {
        current: await ConstantEffects.findOne({ type: ConstantEffectTypes.WorkHourlyIncomeIncrease, level: userParams.constant_effects_levels.work_hourly_income_increase }),
        next: await ConstantEffects.findOne({ type: ConstantEffectTypes.WorkHourlyIncomeIncrease, level: (userParams.constant_effects_levels.work_hourly_income_increase || 0) + 1 }),
      },
    }

    return res.status(200).json({ constant_effects: response })
  } catch (e) {
    console.log("Error in getUserSkills - ", e)
  }
}

export const checkCanStopLearning = async (userId, skillProcess) => {
  // Получение параметров и тренировки
  const user = await UserParameters.findOne({ id: userId })

  if (!user || !skillProcess)
    return { status: 403, data: { } }

  const durationInSeconds = skillProcess.target_duration_in_seconds || skillProcess.base_duration_in_seconds

  const now = moment()
  const processStartTime = moment(skillProcess.createdAt)
  const elapsedSeconds = now.diff(processStartTime, "seconds")
  const seconds_left = Math.max(0, durationInSeconds - elapsedSeconds)

  if (seconds_left === 0) {
    if(skillProcess.sub_type === 'constant_effects') {
      const doc = await ConstantEffects.findOne({ id: skillProcess.type_id })
      
      if(doc) {
        user.constant_effects_levels[doc.type] = doc.level
        await user.save()
      }
    } else {
      await new UserSkill({ skill_id: skillProcess.type_id, id: userId }).save()
    }

    await gameProcess.deleteOne({ _id: skillProcess._id })
    return { status: 200, data: { status: "ok" } }
  }

  throw { status: 401, data: { seconds_left } }
}