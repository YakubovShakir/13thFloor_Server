import UserParameters from "../../models/user/userParametersModel.js"
import LevelsParamters from "../../models/level/levelParametersModel.js"

export const upUserBalance = async (id, amount) => {
  try {
    const user = await UserParameters.findOne({ id: id })

    user.coins += amount
    user.total_earned += amount

    console.log(`[upUserBalance] ${id} +${amount} COINS`)

    await user.save()
  } catch (e) {
    console.log(`[upUserBalance] ERROR ${id}:`, e)
  }
}

export const upUserExperience = async(id, amount) => {
  try {
    const user = await UserParameters.findOne({ id: id })
    const levels = await LevelsParamters.find({})

    user.experience += amount
    console.log(`[upUserExperience] ${id} +${amount} EXP`)

    if (user?.level != 15) {
      const nextLevel = levels.find((level) => level?.level === user?.level + 1)
      const levelUpCondition = user.experience >= nextLevel?.experience_required

      if (levelUpCondition) {
        user.level += 1
        user.energy_capacity = nextLevel.energy_capacity
        console.log(`[upUserExperience] ${id} level up ${user.level - 1}->${user.level}`)
      }
    }
    await user.save()
  } catch (e) {
    console.log(`[upUserExperience] ERROR ${id}:`, e)
  }
}