import Clothing from "../../models/clothing/clothingModel.js"
import Referal from "../../models/referral/referralModel.js"
import ShelfItemModel, {
  ShelfItemTypes,
} from "../../models/shelfItem/shelfItemModel.js"
import UserClothing from "../../models/user/userClothingModel.js"
import UserCurrentInventory from "../../models/user/userInventoryModel.js"
import User from "../../models/user/userModel.js"
import Users from "../../models/user/userModel.js"
import UserParameters from "../../models/user/userParametersModel.js"
import { prebuildInitialInventory } from "./userController.js"
import {
  ConstantEffects,
  ConstantEffectTypes,
} from "../../models/effects/constantEffectsLevels.js"
import {
  ActiveEffectsModel,
  ActiveEffectTypes,
} from "../../models/effects/activeEffectsModel.js"
import { UserSpins } from "../../models/user/userSpinsModel.js"
import { logger } from "../../server.js"
import { UserWorks } from "../../models/user/userWorksModel.js"

export const getBoostPercentageFromType = (type) => {
  switch (type) {
    case ActiveEffectTypes.BasicNekoBoost:
      return 5
    case ActiveEffectTypes.NftNekoBoost:
      return 10
    default:
      return 0
  }
}

// Update getNekoBoostMultiplier to accept session
export const getNekoBoostMultiplier = async (userId, session) => {
  const boost = await ActiveEffectsModel.findOne(
    {
      user_id: userId,
      type: {
        $in: [ActiveEffectTypes.BasicNekoBoost, ActiveEffectTypes.NftNekoBoost],
      },
      valid_until: { $gt: new Date() },
    },
    null,
    { session }
  )
  return boost ? 1 + getBoostPercentageFromType(boost.type) / 100 : 1
}

const gamecenterLevelMap = {
  1: 1,
  5: 2,
  10: 3,
  25: 4,
  40: 5,
  60: 6,
  90: 7,
  200: 8,
  300: 9,
  450: 10,
  500: 11,
  750: 12,
  1000: 13,
  1500: 14,
  2250: 15,
  2500: 16,
  3750: 17,
  5500: 18,
  8250: 19,
  10000: 20,
  15000: 21,
  22500: 22,
  33750: 23,
  50000: 24,
  75000: 25,
  112500: 26,
  168750: 27,
  253130: 28,
  379700: 29,
  569550: 30,
  854330: 31,
  1281500: 32,
  1922250: 33,
  2883380: 34,
  4325070: 35,
}

export const calcRespectFromClothes = async (userId) => {
  try {
    // Fetch user's current clothing and shelf items
    const currentClothesDoc = await UserClothing.findOne(
      { user_id: userId }, // Changed 'id' to 'user_id' to match schema
      { hat: 1, top: 1, accessories: 1, pants: 1, shoes: 1 }
    )
    const currentUserDoc = await User.findOne({ id: userId }, { shelf: 1 })

    if (currentClothesDoc) {
      // Extract equipped clothing IDs
      const clothingIds = [
        currentClothesDoc.hat,
        currentClothesDoc.top,
        currentClothesDoc.pants,
        currentClothesDoc.shoes,
        currentClothesDoc.accessories,
      ].filter((id) => id !== null) // Remove null values

      // Extract shelf item IDs
      const shelfIds = [
        currentUserDoc.shelf.flower,
        currentUserDoc.shelf.award,
        currentUserDoc.shelf.event,
        currentUserDoc.shelf.neko,
        currentUserDoc.shelf.flag,
        currentUserDoc.shelf.star,
      ].filter((id) => id !== null)

      // Fetch respect values for clothing items
      const clothingItems = await Clothing.find(
        { clothing_id: { $in: clothingIds } },
        { clothing_id: 1, respect: 1 }
      )
      const respectClothes = clothingItems.reduce(
        (sum, item) => sum + (item.respect || 0),
        0
      )

      // Fetch shelf items and calculate respect
      const shelfItems = await ShelfItemModel.find(
        { id: { $in: shelfIds } },
        { id: 1, respect: 1, type: 1, rarity: 1 }
      )
      const respectShelf = shelfItems.reduce((sum, item) => {
        let itemRespect = item.respect

        // Special case for Neko items: use rarity map if respect is null
        if (
          item.type === ShelfItemTypes.Neko &&
          itemRespect === null &&
          item.rarity
        ) {
          itemRespect = nekoRarityToRespectMap[item.rarity] || 0
        }

        return sum + (itemRespect || 0)
      }, 0)

      // Total respect
      const totalRespect = respectClothes + respectShelf

      return totalRespect
    }
    return 0
  } catch (error) {
    console.error("Error calculating respect:", error)
    throw error
  }
}

export const getUserParameters = async (req, res) => {
  let user, parameters, userClothing, inventory
  try {
    const userId = parseInt(req.params.id)
    if (!userId) {
      return res.status(400).json({ error: "bad request" })
    }

    // First get or create user
    user = await Users.findOne({ id: userId })
    parameters = await UserParameters.findOne({ id: userId })
    const works = (await UserWorks.find({ id: userId }) || []).map(item => item.work_id)
    const refs = await Referal.countDocuments({ refer_id: userId })

    if (!user || !parameters || !userClothing || !inventory) {
      const gameCenterLevel = gamecenterLevelMap[refs.toString()] || 0

      userClothing = await UserClothing.findOne({ user_id: userId })
      if (!userClothing) {
        userClothing = new UserClothing({
          user_id: userId,
          hat: null,
          top: 5,
          pants: 6,
          shoes: 7,
          accessories: null,
        })
        await userClothing.save()
      }

      if (!user) {
        logger.info('Registering new user', { userId: req.userId })
        // Create user document
        const userData = {
          id: userId,
          prestart: true,
          personage: null,
          shelf: {
            flower: null,
            award: null,
            event: null,
            neko: null,
            flag: null,
          },
          investment_levels: {
            game_center: gameCenterLevel,
            coffee_shop: 0,
            zoo_shop: 0,
          },
          has_autoclaim: {
            game_center: false,
            coffee_shop: false,
            zoo_shop: false,
          },
          // username: tgApiResponse.user.username,
        }

        user = await Users.create(userData) // Use create instead of new...save()
        await UserSpins.create({ user_id: userId, type: "daily" })
      }

      inventory = await UserCurrentInventory.findOne({ user_id: userId })
      if (!inventory) {
        await prebuildInitialInventory(userId)
      }

      if (!parameters) {
        parameters = await UserParameters.create({
          id: userId,
          work_id: 1,
        })
      }
    } else {
      parameters = await UserParameters.findOne({ id: userId })
      userClothing = await UserClothing.findOne({ user_id: userId })
      inventory = await UserCurrentInventory.findOne({ user_id: userId })
    }

    const work_duration_decrease_level =
      parameters.constant_effects_levels?.work_duration_decrease
    const work_hourly_income_increase_level =
      parameters.constant_effects_levels?.work_hourly_income_increase
    const training_duration_decrease_level =
      parameters.constant_effects_levels?.training_duration_decrease
    const sleeping_duration_decrease_level =
      parameters.constant_effects_levels?.sleeping_duration_decrease

    const game_work_cooldown_decrease_level = 
      parameters.constant_effects_levels?.game_work_cooldown_decrease

    const game_work_process_duration_decrease_level = 
      parameters.constant_effects_levels?.game_work_process_duration_decrease

    const work_duration_decrease_doc = await ConstantEffects.findOne({
      type: ConstantEffectTypes.WorkDurationDecrease,
      level: work_duration_decrease_level,
    })
    const work_hourly_income_increase_doc = await ConstantEffects.findOne({
      type: ConstantEffectTypes.WorkHourlyIncomeIncrease,
      level: work_hourly_income_increase_level,
    })

    const game_work_cooldown_decrease_doc = await ConstantEffects.findOne({
      type: ConstantEffectTypes.GameWorkCooldownDecrease,
      level: game_work_cooldown_decrease_level,
    })

    const game_work_process_duration_decrease_doc = await ConstantEffects.findOne({
      type: ConstantEffectTypes.GameWorkProcessDurationDecrease,
      level: game_work_process_duration_decrease_level,
    })

    const training_duration_decrease_doc = await ConstantEffects.findOne({
      type: ConstantEffectTypes.TrainingDurationDecrease,
      level: training_duration_decrease_level,
    })
    const sleeping_duration_decrease_doc = await ConstantEffects.findOne({
      type: ConstantEffectTypes.SleepingDurationDecrease,
      level: sleeping_duration_decrease_level,
    })

    const work_duration_decrease =
      work_duration_decrease_doc?.value_change || null
    const work_hourly_income_increase =
      work_hourly_income_increase_doc?.value_change || null
    const training_duration_decrease =
      training_duration_decrease_doc?.value_change || null
    const sleeping_duration_decrease =
      sleeping_duration_decrease_doc?.value_change || null

    const game_work_cooldown_decrease = game_work_cooldown_decrease_doc?.value_change || 0
    const game_work_process_duration_decrease = game_work_process_duration_decrease_doc?.value_change || 0

    const neko_boost_percentage = await getNekoBoostMultiplier(userId)

    // Fetch clothing items in parallel
    const [hat, top, pants, shoes, accessories] = await Promise.all([
      Clothing.findOne({ clothing_id: userClothing?.hat }),
      Clothing.findOne({ clothing_id: userClothing?.top }),
      Clothing.findOne({ clothing_id: userClothing?.pants }),
      Clothing.findOne({ clothing_id: userClothing?.shoes }),
      Clothing.findOne({ clothing_id: userClothing?.accessories }),
    ])

    // Process shelf items
    const processShelf = async (userShelf) => {
      const entries = await Promise.all(
        Object.entries(userShelf).map(async ([key, value]) => {
          if (!value) return [key, null]
          const item = await ShelfItemModel.findOne({ id: value })
          return [key, item]
        })
      )
      return Object.fromEntries(entries)
    }

    const shelf = await processShelf(user.shelf)
    const personage =
      Object.keys(user.personage).length > 0 ? user.personage : null

    parameters.first_name = user.first_name
    parameters.last_name = user.last_name
    parameters.photo_url = user.photo_url

    const params = {
      ...parameters.toJSON(),
      first_name: user.first_name,
      last_name: user.last_name,
      photo_url: user.photo_url,
      is_withdrawing: user.is_withdrawing,
      respect: parameters.respect + (await calcRespectFromClothes(userId)),
    }

    const response = {
      parameters: params,
      personage,
      inventory,
      clothing: userClothing && { hat, top, pants, shoes, accessories },
      shelf,
      work_duration_decrease,
      work_hourly_income_increase,
      training_duration_decrease,
      sleeping_duration_decrease,
      neko_boost_percentage,
      game_work_cooldown_decrease,
      game_work_process_duration_decrease,
      works
    }

    logger.info('User requested params', params.id)

    return res.status(200).json(response)
  } catch (error) {
    console.error("Error in getUserParameters:", error)
    return res.status(500).json({
      error: true,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    })
  }
}
