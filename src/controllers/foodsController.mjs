import Food from "../models/foodModel.mjs"
import User from "../models/userModel.mjs"
import UserParameters from "../models/userParametersModel.mjs"
import UserProcess from "../models/userProcessModel.mjs"
import { addProcess, getUserProcesses } from "./userProcessesController.mjs"

export const getFoods = async (req, res) => {
  try {
    console.log("Отдаю еду")
    const foods = await Food.find({}).sort({ coins_price: 1 })
    if (foods) res.status(200).send({ foods })
  } catch (e) {
    console.log("Error while getFoods ", e)
  }
}

export const buyFood = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId)
    const foodId = parseInt(req.query.foodId)
    console.log(foodId, userId)
    if (!userId || !foodId) return

    const user = await User.findOne({ id: userId })
    const food = await Food.findOne({ food_id: foodId })

    if (!user) return res.status(404).json({ error: "User not found" })
    if (!food) return res.status(404).json({ error: "Food not found" })

    const userParameters = await UserParameters.findOne({ id: userId })

    // Проверка что у пользователя нет кулдауна на предмете
    const process = await UserProcess.findOne({
      id: userId,
      type: "food",
      type_id: foodId,
    })
    console.log(process)
    if (process) return res.status(400).json({ error: "in Cooldown!" })

    // Проверка на достаточность баланса
    if (userParameters?.coins < food?.coins_price)
      return res.status(400).json({ error: "Balance not enough" })
    else userParameters.coins -= food?.coins_price

    // Мгновенное восстановление параметров если есть
    const instantEnergyRestore = food?.instant_energy_restore?.value
    if (instantEnergyRestore) {
      userParameters.energy =
        userParameters?.energy_capacity - userParameters?.energy <
        instantEnergyRestore
          ? userParameters?.energy_capacity
          : userParameters?.energy + instantEnergyRestore
    }
    const instantHungryRestore = food?.instant_hungry_restore?.value
    if (instantHungryRestore) {
      userParameters.hungry =
        100 - userParameters?.hungry < instantHungryRestore
          ? 100
          : userParameters?.hungry + instantHungryRestore
    }
    const instantMoodRestore = food?.instant_mood_restore?.value
    if (instantMoodRestore) {
      userParameters.mood =
        100 - userParameters?.mood < instantMoodRestore
          ? 100
          : userParameters?.mood + instantMoodRestore
    }

    await userParameters.save()

    // Добавление процесса
    await addProcess(userId, "food", foodId)

    return res.status(200).json({ status: "ok" })
  } catch (e) {
    console.log("Error while buyFood")
  }
}
