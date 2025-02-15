import UserParameters from "../../../models/user/userParametersModel.js"
import Skill from "../../../models/skill/skillModel.js"
import UserSkill from "../../../models/user/userSkillModel.js"
import process from "../../../models/process/processModel.js"
import addProcess from "../../process/functions/addProcess.js"
import useRelaxMassage from "../../boost/functions/useRelaxMassage.js"
import getMinutesAndSeconds from "../../../utils/getMinutesAndSeconds.js"
import addActiveProcess from "../../process/functions/addActiveProcess.js"
import { ConstantEffects } from "../../../models/effects/constantEffectsLevels.js"
import { upUserExperience } from "../../../utils/userParameters/upUserBalance.js"

const buySkill = async (userId, skillId, sub_type) => {
  try {
    const user = await UserParameters.findOne({ id: userId })
    const skill = sub_type ? await ConstantEffects.findOne({ id: skillId }) : await Skill.findOne({ skill_id: skillId })
    console.log(skill, sub_type)
    if (!user || !skill)
      return {
        status: 404,
        data: { error: "User or skill not found by given id!" },
      }

    // Проверка что у пользователя еще нет этого навыка
    if(!sub_type) {
      const userHaveSkill = await UserSkill.findOne({
        id: userId,
        skill_id: skillId,
      })
      if (userHaveSkill)
        return { status: 400, data: { error: "Skill already exists" } }
    }

    // Проверка что у пользователя нет запущенного процесса изучения данного скилла
    const processExist = await process.findOne({
      id: userId,
      type: "skill",
      skill_id: skillId,
      sub_type
    })
    if (processExist) return { status: 400, data: { error: "in Learning!" } }

    //Проверка на наличие необходимого навыка
    if (!sub_type && skill?.skill_id_required) {
      const userRequierdSkill = await UserSkill.findOne({
        skill_id: skill?.skill_id_required,
      })
      if (!userRequierdSkill)
        return { status: 400, data: { error: "Need Required Skill!" } }
    }

    const skillPrice = skill?.price || skill.coins_price
    console.log(skillPrice)
    // Проверка на достаточность баланса
    if (user?.coins < skillPrice && user?.level < (sub_type === 'constant_effects' ? skill.rquired_level : skill.requiredLevel))
      return { status: 400, data: { error: "Balance not enough!" } }

    user.coins -= skillPrice

    const durationInSeconds = skill.duration * 60
    const baseDuration = (skill?.duration || 1) * 60 // in secs for precision
    const { duration, seconds } = getMinutesAndSeconds(durationInSeconds)

    await addActiveProcess(
      userId,
      "skill",
      skillId,
      duration,
      seconds,
      null,
      {
        base_duration_in_seconds: baseDuration,
        //! Increased through boost logic
        target_duration_in_seconds: null,
        sub_type
      },
    )

    await user.save()
    // await addProcess(userId, "skill", skillId, skill?.duration)

    return { status: 200, data: { status: "ok" } }
  } catch (e) {
    console.log("Error in buySkill - ", e)
  }
}

export default buySkill
