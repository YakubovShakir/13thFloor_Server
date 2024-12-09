import Clothing from "../../models/clothing/clothingModel.mjs"
import UserClothing from "../../models/user/userClothingModel.mjs"
import UserCurrentInventory from "../../models/user/userInventoryModel.js"
import User from "../../models/user/userModel.mjs"
import Users from "../../models/user/userModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"
import { prebuildInitialInventory } from "./userController.mjs"

export const getUserParameters = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    if (!userId) return res.status(400).json({ error: "bad request" })

    let user = await Users.findOne({ id: userId })

    if (!user) {
      console.log("Registering user with ID", userId)
      user = await new User({
        id: userId,
        prestart: true,
        personage: {},
        shelf: [],
      }).save()
    }

    let parameters = await UserParameters.findOne({ id: userId }, { _id: 0 })

    if (!parameters) {
      parameters = await UserParameters.create({ id: userId })
    }

    let inventory = await UserCurrentInventory.findOne({ user_id: userId })
    let userClothing = await UserClothing.findOne({ user_id: userId })

    if (!inventory) {
      await prebuildInitialInventory(userId)
    }

    if (!userClothing) {
      await UserClothing.create({
        user_id: userId,
        hat: 4,
        top: 5,
        pants: 6,
        shoes: 7,
        accessories: [],
      })
    }

    const hat = await Clothing.findOne({ clothing_id: userClothing?.hat })
    const top = await Clothing.findOne({ clothing_id: userClothing?.top })
    const pants = await Clothing.findOne({ clothing_id: userClothing?.pants })
    const shoes = await Clothing.findOne({ clothing_id: userClothing?.shoes })
    const accessories = await Clothing.find({
      clothing_id: { $in: userClothing?.accessories },
    })
    const shelf = user.shelf

    const personage =
      Object.keys(user.personage).length > 0 ? user.personage : null

    return res
      .status(200)
      .json({
        parameters,
        personage,
        inventory,
        clothing: userClothing && { hat, top, pants, shoes, accessories },
        shelf,
      })
  } catch (e) {
    console.log("Error while get parameters ", e)
  }
}
