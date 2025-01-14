import Clothing from "../../models/clothing/clothingModel.mjs"
import Investments from "../../models/investments/investmentModel.mjs"
import Referal from "../../models/referral/referralModel.mjs"
import { ShelfItems } from "../../models/shelfItem/migration.js"
import ShelfItemModel from "../../models/shelfItem/shelfItemModel.js"
import UserClothing from "../../models/user/userClothingModel.mjs"
import UserCurrentInventory from "../../models/user/userInventoryModel.js"
import User from "../../models/user/userModel.mjs"
import Users from "../../models/user/userModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"
import { prebuildInitialInventory } from "./userController.mjs"
import UserLaunchedInvestments from '../../models/investments/userLaunchedInvestments.mjs'

const gamecenterLevelMap = {
  "1": 1,
  "5": 2,
  "10": 3,
  "25": 4,
  "40": 5,
  "60": 6,
  "90": 7,
  "200": 8,
  "300": 9,
  "450": 10,
  "500": 11,
  "750": 12,
  "1000": 13,
  "1500": 14,
  "2250": 15,
  "2500": 16,
  "3750": 17,
  "5500": 18,
  "8250": 19,
  "10000": 20,
  "15000": 21,
  "22500": 22,
  "33750": 23,
  "50000": 24,
  "75000": 25,
  "112500": 26,
  "168750": 27,
  "253130": 28,
  "379700": 29,
  "569550": 30,
  "854330": 31,
  "1281500": 32,
  "1922250": 33,
  "2883380": 34,
  "4325070": 35
}

export const getUserParameters = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    if (!userId) return res.status(400).json({ error: "bad request" })

    let user = await Users.findOne({ id: userId })

    const refs = await Referal.countDocuments({ refer_id: userId })
    
    if (!user) {
      console.log("Registering user with ID", userId)
      user = await new User({
        id: userId,
        prestart: true,
        personage: {},
        shelf: process.env.NODE_ENV === 'test' ? {
          flower: 1,
          award: 2,
          event: 5,
          neko: 8,
          flag: 0,
        } : {
          flower: null,
          award: null,
          event: null,
          neko: null,
          flag: null,
        },
        investment_levels: {
          game_center: gamecenterLevelMap[refs.toString()] || 0,
          coffee_shop: 0,
          zoo_shop: 0
        },
        has_autoclaim: {
          game_center: false,
          coffee_shop: false,
          zoo_shop: false
        }
      }).save()

      const gameCenterLevel = gamecenterLevelMap[refs.toString()] || 0
      if(gameCenterLevel > 0) {
        const investment = await Investments.findOne({ type: 'game_center', level: gameCenterLevel })
        await new UserLaunchedInvestments({
          user_id: userId,
          investment_id: investment.id,
          to_claim: investment.coins_per_hour,
        }).save()
      }
    }

    let parameters = await UserParameters.findOne({ id: userId }, { _id: 0 })

    if (!parameters) {
      parameters = await UserParameters.create({ id: userId })
    }

    let inventory = await UserCurrentInventory.findOne({ user_id: userId })
    let userClothing = await UserClothing.findOne({ user_id: userId })
    parameters.work_id = 1
    await parameters.save()

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
        accessories: null,
      })
    }

    const hat = await Clothing.findOne({ clothing_id: userClothing?.hat })
    const top = await Clothing.findOne({ clothing_id: userClothing?.top })
    const pants = await Clothing.findOne({ clothing_id: userClothing?.pants })
    const shoes = await Clothing.findOne({ clothing_id: userClothing?.shoes })
    const accessories = await Clothing.findOne({
      clothing_id: userClothing?.accessories,
    })
    
    const processShelf = async (userShelf) => {
      const entries = await Promise.all(
        Object.entries(userShelf).map(async ([key, value]) => {
          const item = await ShelfItemModel.findOne({ id: value })
          return [key, item]
        })
      )
      return Object.fromEntries(entries)
    }

    const shelf = await processShelf(user.shelf)

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
