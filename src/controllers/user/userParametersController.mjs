import Clothing from "../../models/clothing/clothingModel.mjs"
import UserClothing from "../../models/user/userClothingModel.mjs"
import UserCurrentInventory from "../../models/user/userInventoryModel.js"
import Users from "../../models/user/userModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"

export const getUserParameters = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    if (!userId) return res.status(404).json({ error: "user not found" })

    let parameters = await UserParameters.findOne({ id: userId }, { _id: 0 })
    const user = await Users.findOne({ id: userId })

    if (!parameters) {
      parameters = await UserParameters.create({ id: userId })
    }

    const inventory = await UserCurrentInventory.findOne({ user_id: userId })
    const userClothing = await UserClothing.findOne({ user_id: userId });

    const hat = await Clothing.findOne({ clothing_id: userClothing?.hat });
    const top = await Clothing.findOne({ clothing_id: userClothing?.top });
    const pants = await Clothing.findOne({ clothing_id: userClothing?.pants });
    const shoes = await Clothing.findOne({ clothing_id: userClothing?.shoes });
    const accessories = await Clothing.find({ clothing_id: { $in: userClothing?.accessories } });
    const shelf = user.shelf

    const personage = Object.keys(user.personage).length > 0 ? user.personage : null

    return res.status(200).json({ parameters, personage, inventory, clothing: userClothing && { hat, top, pants, shoes, accessories }, shelf })
  } catch (e) {
    console.log("Error while get parameters ", e)
  }
}
