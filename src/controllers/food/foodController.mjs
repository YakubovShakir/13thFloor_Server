import Food from "../../models/food/foodModel.mjs"
import User from "../../models/user/userModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"
import UserProcess from "../../models/process/processModel.mjs"
import { getUserProcesses } from "../../controllers/process/processController.mjs"
import addProcess from "../../utils/process/addProcess.mjs"


export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({}).sort({ coins_price: 1 })
    if (foods) res.status(200).send({ foods })
  } catch (e) {
    console.log("Error while getFoods ", e)
  }
}
