import UserParameters from "../../models/user/userParametersModel.mjs"
import LevelsParamters from "../../models/level/levelParametersModel.mjs"
import process from "../../models/process/processModel.mjs"

export const upUserBalance = async (id, amount) => {
  try {
    const user = await UserParameters.findOne({ id: id })

    user.coins += amount
    user.total_earned += amount

    console.log('Upping balance for user: ', id, '+' + amount)

    await user.save()
  } catch (e) {
    console.log("Error in upUserBalance - ", e)
  }
}

export const upUserExperience = async(id, amount) => {
  try {
    const user = await UserParameters.findOne({ id: id })
    const levels = await LevelsParamters.find({})

    user.experience += amount
    console.log('Upping user experience: ', id, amount)

    if (user?.level != 15) {
      const nextLevel = levels.find((level) => level?.level === user?.level + 1)
      const levelUpCondition = user.experience >= nextLevel?.experience_required

      if (levelUpCondition) {
        console.log('Upping level for user: ', id, user.level + 1)
        user.level += 1
        user.energy_capacity = nextLevel.energy_capacity
      }
    }
    await user.save()
  } catch (e) {
    console.log("Error in upUserExperience - ", e)
  }
}