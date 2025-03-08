import express from "express"
import {
  updateUserPrestart,
  getUser,
  createUserPersonage,
  getCurrentClothes,
  getShopItems,
  getInventoryItems,
  handleClothesUnequip,
  handleClothesEquip,
  requestStarsPaymentLink,
  handleShelfEquip,
  buyItemsForCoins,
  getUserInvestments,
  buyInvestmentLevel,
  claimInvestment,
  getUserTasks,
  claimUserTask,
  handleTonWalletConnect,
  handleTonWalletDisconnect,
  getLeaderboard,
  startInvestment,
  saveProfileData,
} from "../../controllers/user/userController.js"
import { getUserParameters } from "../../controllers/user/userParametersController.js"

import { getUserTrainingParameters } from "../../controllers/training/trainingController.js"
import { SpinTypes, UserSpins } from "../../models/user/userSpinsModel.js"
import { log } from "../../utils/log.js"
import Boost from "../../models/boost/boostModel.js"
import Clothing from "../../models/clothing/clothingModel.js"
import User from "../../models/user/userModel.js"
import { upUserBalance } from "../../utils/userParameters/upUserBalance.js"
import UserCurrentInventory from "../../models/user/userInventoryModel.js"
import UserBoost from "../../models/user/userBoostsModel.js"

const router = express.Router()
router.get("/user/:id", getUser)

router.get("/parameters/:id", getUserParameters)
router.get("/training-parameters/:id", getUserTrainingParameters)
router.patch("/updatePrestart/:id", updateUserPrestart)
router.post("/personage/create/:id", createUserPersonage)

router.get("/:id/current-clothes", getCurrentClothes)

router.post("/:userId/wallet/connect", handleTonWalletConnect)
router.post("/:userId/wallet/disconnect", handleTonWalletDisconnect)

router.get("/:userId/inventory/clothes/equip/:id")
router.get("/:userId/inventory/shelf/equip/:id")
router.get("/:id/inventory/get-items", getInventoryItems)
router.get("/:id/shop/get-items", getShopItems)
router.post("/:id/inventory/c-unequip", handleClothesUnequip)
router.post("/:id/inventory/c-equip", handleClothesEquip)
router.post("/:id/shelf/equip", handleShelfEquip)
router.post("/:id/shelf/unequip", handleShelfEquip)
router.post("/request-stars-invoice-link", requestStarsPaymentLink)
router.post("/:id/buy-items-for-coins", buyItemsForCoins)
router.get("/:id/investments", getUserInvestments)
router.post("/:id/investments/buy-level", buyInvestmentLevel)
router.post("/:id/investments/start", startInvestment)
router.post("/:id/investments/claim", claimInvestment)
router.get("/:id/tasks", getUserTasks)
router.post("/:id/tasks/claim", claimUserTask)
router.post("/:id/profile-data", saveProfileData)

//! TODO: move
const itemsPoolRaw = [
  {
    id: 1,
    type: "boost",
    chance_premium: 1,
    chance_daily: 1,
  },
  {
    id: 10,
    type: "clothes",
    chance_premium: 1,
    chance_daily: 1,
  },
  {
    id: 25,
    type: "clothes",
    chance_premium: 1,
    chance_daily: 1,
  },
  {
    id: 48,
    type: "clothes",
    chance_premium: 1,
    chance_daily: 1,
  },
  {
    id: 53,
    type: "clothes",
    chance_premium: 1,
    chance_daily: 1,
  },
  {
    id: 4,
    type: "clothes",
    chance_premium: 1,
    chance_daily: 1,
  },
  {
    id: 5,
    type: "clothes",
    chance_premium: 1,
    chance_daily: 1,
  },
  {
    id: 1,
    type: "coins",
    chance: 1,
    amount: 10,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/icons%2Fshittonsmoney.png",
    name: { ru: "10 Монет", en: "10 Coins" },
    chance_premium: 1,
    chance_daily: 5,
  },
  {
    id: 2,
    type: "coins",
    chance: 1,
    amount: 25,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/icons%2Fshittonsmoney.png",
    name: { ru: "25 Монет", en: "25 Coins" },
    chance_premium: 1,
    chance_daily: 10,
  },
  {
    id: 3,
    type: "coins",
    chance: 1,
    amount: 50,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/icons%2Fshittonsmoney.png",
    name: { ru: "50 Монет", en: "50 Coins" },
    chance_premium: 1,
    chance_daily: 1,
  },
]

router.get("/:id/gacha/items", async (req, res) => {
  const result = []

  const userId = parseInt(req.params.id)
  const user = await User.findOne({ id: userId })

  if (!user) {
    return res.status(404).send()
  }

  const userInventory = await UserCurrentInventory.findOne({ user_id: userId })

  for (const item of itemsPoolRaw) {
    let fullItem
    switch (item.type) {
      case "boost":
        const boost = await Boost.findOne({ boost_id: item.id })
        fullItem = {
          id: item.id,
          type: item.type,
          image: boost.link,
          name: boost.name,
        }
        break
      case "clothes":
        const clothes = await Clothing.findOne({ clothing_id: item.id })
        fullItem = {
          id: item.id,
          type: item.type,
          image:
            user.personage.gender === "male"
              ? clothes.male_icon
              : clothes.female_icon,
          name: clothes.name,
        }
        break
      case "coins":
        fullItem = {
          id: item.id,
          type: item.type,
          image: item.image,
          name: item.name,
        }
        break
      default:
        return res.status(400).send()
    }

    if (
      fullItem.type === "clothes" &&
      userInventory.clothes.find((item) => item.id === fullItem.id)
    ) {
      continue
    }

    result.push(fullItem)
  }

  res.status(200).json({
    items: result,
  })
})

router.get("/:id/gacha/attempts", async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const attempts = await UserSpins.find(
      { user_id: userId, is_used: false },
      { _id: 1 },
      { sort: { createdAt: -1 } }
    )

    return res.status(200).json({
      attempts: attempts?.length || 0,
    })
  } catch (error) {
    await log("error", "error in fetching gacha attempts", error)

    return res.status(500).send()
  }
})

router.get("/:id/gacha/spin", async (req, res) => {
  try {
    const userId = parseInt(req.params.id)

    // Fetch the most recent spin for the user
    const attempts = await UserSpins.find(
      { user_id: userId, is_used: false },
      { _id: 1, type: 1 },
      { sort: { createdAt: -1 }, limit: 1 }
    )

    if (!attempts || attempts.length === 0) {
      return res.status(403).json({ error: "Not enough spins" })
    }

    const attempt = attempts[0]
    const spinType = attempt.type

    // Calculate total weight based on spin type
    const chanceField =
      spinType === SpinTypes.Daily ? "chance_daily" : "chance_premium"
    const totalWeight = itemsPoolRaw.reduce(
      (sum, item) => sum + item[chanceField],
      0
    )

    // Weighted random selection
    const randomValue = Math.random() * totalWeight
    let cumulativeWeight = 0
    let selectedItem

    const userInventory = await UserCurrentInventory.findOne({
      user_id: userId,
    })
    const ownedClothesIds = userInventory.clothes.map((item) => item.id)
    const pool = itemsPoolRaw.filter(
      (item) => {
        if(item.type === 'clothes') {
          return !ownedClothesIds.includes(item.id)
        } else {
          return true
        }
      }
    )

    for (const item of pool) {
      cumulativeWeight += item[chanceField]
      if (randomValue <= cumulativeWeight) {
        selectedItem = item
        break
      }
    }

    if (!selectedItem) {
      // Fallback in case of rounding errors (shouldn't happen)
      selectedItem = itemsPoolRaw[itemsPoolRaw.length - 1]
    }

    // Fetch full item details based on type
    let wonItem
    const user = await User.findOne({ id: userId })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    switch (selectedItem.type) {
      case "boost":
        const boost = await Boost.findOne({ boost_id: selectedItem.id })
        wonItem = {
          id: selectedItem.id,
          type: selectedItem.type,
          image: boost.link,
          name: boost.name,
        }

        await new UserBoost({ id: userId, boost_id: wonItem.id }).save()
        break
      case "clothes":
        const clothes = await Clothing.findOne({ clothing_id: selectedItem.id })
        wonItem = {
          id: selectedItem.id,
          type: selectedItem.type,
          image:
            user.personage.gender === "male"
              ? clothes.male_icon
              : clothes.female_icon,
          name: clothes.name,
        }

        await UserCurrentInventory.updateOne(
          { user_id: userId },
          { $addToSet: { clothes: { id: wonItem.id } } }
        )
        break
      case "coins":
        wonItem = {
          id: selectedItem.id,
          type: selectedItem.type,
          image: selectedItem.image,
          name: selectedItem.name,
          amount: selectedItem.amount,
        }
        await upUserBalance(userId, wonItem.amount)
        break
      default:
        return res.status(400).json({ error: "Invalid item type" })
    }

    // Remove the used spin
    await UserSpins.updateOne({ _id: attempt._id }, { $set: { is_used: true } })

    // Return the won item
    res.status(200).json({ wonItem })
  } catch (error) {
    await log("error", "error in fetching gacha spins", error) // Assuming log is defined
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/time", (req, res) =>
  res.status(200).json({ server_time: new Date() })
)

//!TODO move to different place
router.get("/leaderboard", getLeaderboard)

export default router
