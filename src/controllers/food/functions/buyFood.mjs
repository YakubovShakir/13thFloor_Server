import Food from "../../../models/food/foodModel.mjs"
import process from "../../../models/process/processModel.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import addProcess from "../../process/functions/addProcess.mjs"

const buyFood = async (userId, foodId) => {
  try {
    const food = await Food.findOne({ food_id: foodId })
    const user = await UserParameters.findOne({ id: userId })
    if (!food || !user)
      return {
        status: 404,
        data: { error: "User or Food not found by given id!" },
      }

    // Проверка что у пользователя нет кулдауна на предмете
    const userProcess = await process.findOne({
      id: user?.id,
      type: "food",
      type_id: foodId,
    })
    if (userProcess) return { status: 400, data: { error: "Food in cooldown!" } }

    // Проверка на достаточность баланса
    if (user?.coins < food?.coins_price)
      return { status: 400, data: { error: "Balance not enough!" } }

    user.coins -= food?.coins_price

    // Моментельное восстановление енергии
    const instantEnergyRestore = food?.instant_energy_restore?.value
    if (instantEnergyRestore)
      user.energy = Math.min(
        user?.energy_capacity,
        user?.energy + instantEnergyRestore
      )

    // Моментельное восстановление голода
    const instantHungryRestore = food?.instant_hungry_restore?.value
    if (instantHungryRestore)
      user.hungry = Math.min(100, user?.hungry + instantHungryRestore)

    // Моментельное восстановление настроения
    const instantMoodRestore = food?.instant_mood_restore?.value
    if (instantMoodRestore)
      user.mood = Math.min(100, user?.mood + instantMoodRestore)

    await user.save()
    await addProcess(userId, "food", foodId, food?.duration)

    return { status: 200, data: { status: "ok" } }
  } catch (e) {
    console.log("Error in buyFood - ", e )
  }
}

export default buyFood
