import UserParameters from "../../models/user/userParametersModel.mjs"
import LevelsParamters from "../../models/level/levelParametersModel.mjs"
import process from "../../models/process/processModel.mjs"

const upUserBalance = async (id, amount) => {
  try {
    const user = await UserParameters.findOne({ id: id })
    const levels = await LevelsParamters.find({})

    user.coins += amount * earnRate
    user.total_earned += amount * earnRate

    if (user?.level != 15) {
      const nextLevel = levels.find((level) => level?.level === user?.level + 1)
      const levelUpCondition = user.total_earned >= nextLevel?.required_earned

      if (levelUpCondition) {
        user.level += 1
        user.energy_capacity = nextLevel.energy_capacity
      }
    }
    await user.save()
  } catch (e) {
    console.log("Error in upUserBalance - ", e)
  }
}

export default upUserBalance
