import UserParameters from "../../../models/user/userParametersModel.mjs"
import Skill from "../../../models/skill/skillModel.mjs"
import UserSkill from "../../../models/user/userSkillModel.mjs"
import process from "../../../models/process/processModel.mjs"
import addProcess from "../../process/functions/addProcess.mjs"
import useRelaxMassage from "../../boost/functions/useRelaxMassage.mjs"
import getMinutesAndSeconds from "../../../utils/getMinutesAndSeconds.js"
import addActiveProcess from "../../process/functions/addActiveProcess.mjs"

const buySkill = async (userId, skillId) => {
  try {
    const user = await UserParameters.findOne({ id: userId })
    const skill = await Skill.findOne({ skill_id: skillId })
    if (!user || !skill)
      return {
        status: 404,
        data: { error: "User or skill not found by given id!" },
      }

    // Проверка что у пользователя еще нет этого навыка
    const userHaveSkill = await UserSkill.findOne({
      id: userId,
      skill_id: skillId,
    })
    if (userHaveSkill)
      return { status: 400, data: { error: "Skill already exists" } }

    // Проверка что у пользователя нет запущенного процесса изучения данного скилла
    const processExist = await process.findOne({
      id: userId,
      type: "skill",
      skill_id: skillId,
    })
    if (processExist) return { status: 400, data: { error: "in Learning!" } }

    //Проверка на наличие необходимого навыка
    if (skill?.skill_id_required) {
      const userRequierdSkill = await UserSkill.findOne({
        skill_id: skill?.skill_id_required,
      })
      if (!userRequierdSkill)
        return { status: 400, data: { error: "Need Required Skill!" } }
    }

    // Проверка на достаточность баланса
    if (user?.coins < skill?.coins_price && user?.level >= skill.requiredLevel)
      return { status: 400, data: { error: "Balance not enough!" } }

    user.coins -= skill?.coins_price
    const durationInSeconds = skill.duration * 60
    const baseDuration = (skill?.duration || 1) * 60 // in secs for precision
    const { duration, seconds } = getMinutesAndSeconds(durationInSeconds)
    console.log(duration, seconds)
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
        target_duration_in_seconds: null
      }
    )

    await user.save()
    await addProcess(userId, "skill", skillId, skill?.duration)

    return { status: 200, data: { status: "ok" } }
  } catch (e) {
    console.log("Error in buySkill - ", e)
  }
}

export default buySkill
