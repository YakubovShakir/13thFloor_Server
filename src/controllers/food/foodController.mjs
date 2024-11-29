import Food from "../../models/food/foodModel.mjs"


export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({}).sort({ coins_price: 1 })
    if (foods) res.status(200).send({ foods })
  } catch (e) {
    console.log("Error while getFoods ", e)
  }
}
