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
import gameProcess from "../../models/process/processModel.js"
import { getUserTrainingParameters } from "../../controllers/training/trainingController.js"
import { UserSpins } from "../../models/user/userSpinsModel.js"
import Boost from "../../models/boost/boostModel.js"
import Clothing from "../../models/clothing/clothingModel.js"
import User from "../../models/user/userModel.js"
import { upUserBalance } from "../../utils/userParameters/upUserBalance.js"
import UserCurrentInventory from "../../models/user/userInventoryModel.js"
import UserBoost from "../../models/user/userBoostsModel.js"
import UserCheckInsModel from "../../models/user/userCheckInsModel.js"
import {
  ActiveEffectsModel,
  ActiveEffectTypes,
} from "../../models/effects/activeEffectsModel.js"
import {
  ActionLogModel,
  ActionTypes,
} from "../../models/effects/actionLogModel.js"
import moment from "moment-timezone"
import ShelfItemModel, {
  levelToNekoCoinsClaimAmountMap,
  nekoRarityToRespectMap,
} from "../../models/shelfItem/shelfItemModel.js"
import UserClothing from "../../models/user/userClothingModel.js"
import SkillModel from "../../models/skill/skillModel.js"
import Bottleneck from "bottleneck"
import crypto from "crypto"
import { canApplyConstantEffects } from "../../utils/parametersDepMath.js"
import UserParameters from "../../models/user/userParametersModel.js"
import { Bot, session } from "grammy"
import TONTransactions from "../../models/tx/tonTransactionModel.js"
import NFTItems from "../../models/nft/nftItemModel.js"
import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"
import { mnemonicToPrivateKey } from "ton-crypto"
import { config } from "dotenv"
config()
import TON, { beginCell } from "@ton/ton"
import { InvestmentTypes } from "../../models/investments/userLaunchedInvestments.js"
import Referal from "../../models/referral/referralModel.js"
import ansiColors from "ansi-colors"
import { queueAffiliateWithdrawal } from "../../daemons/utils/affiliateTxsUtils.js"
import Investments from "../../models/investments/investmentModel.js"
const { TonClient, WalletContractV4, toNano, Address, NFTItem } = TON
import { logger } from "../../server.js"
import { openWallet, withTransaction } from "../../services/paymentService.js"
import StarsTransactions from "../../models/tx/starsTransactionModel.mjs"
import AffiliateTransaction from "../../models/tx/affiliateTransactionModel.js"
import Autoclaims from "../../models/investments/autoclaimsModel.js"

export function calculateGamecenterLevel(refsCount) {
  const levels = Object.keys(gamecenterLevelMap)
    .map(Number)
    .sort((a, b) => a - b) // Ensure sorted order
  let low = 0
  let high = levels.length - 1

  if (refsCount < levels[0]) return 0 // Below first threshold

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const threshold = levels[mid]

    if (refsCount < threshold) {
      high = mid - 1
    } else if (
      refsCount >= threshold &&
      (mid === levels.length - 1 || refsCount < levels[mid + 1])
    ) {
      return gamecenterLevelMap[threshold] // Found the correct level
    } else {
      low = mid + 1
    }
  }

  // If we exit the loop, return the highest level (shouldn't happen with proper map)
  return gamecenterLevelMap[levels[levels.length - 1]]
}

export const gamecenterLevelMap = {
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

export const gameCenterLevelRequirements = {
  1: 1,
  2: 5,
  3: 10,
  4: 25,
  5: 40,
  6: 60,
  7: 90,
  8: 200,
  9: 300,
  10: 450,
  11: 500,
  12: 750,
  13: 1000,
  14: 1500,
  15: 2250,
  16: 2500,
  17: 3750,
  18: 5500,
  19: 8250,
  20: 10000,
  21: 15000,
  22: 22500,
  23: 33750,
  24: 50000,
  25: 75000,
  26: 112500,
  27: 168750,
  28: 253130,
  29: 379700,
  30: 569550,
  31: 854330,
  32: 1281500,
  33: 1922250,
  34: 2883380,
  35: 4325070,
}

const STARS_LOCK_PERIOD_MS = 21 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000 // 21 days + 10 minutes
const TON_LOCK_PERIOD_MS = 1 * 24 * 60 * 60 * 1000 // 1 day
const AFFILIATE_PERCENTAGE = 0.1 // 10% commission
const STARS_TO_TON_RATE = 1000 // 1000 Stars = 1 TON
const NANOTONS_TO_TON = 1e9 // 1 TON = 1,000,000,000 nanoton

// Get affiliate earnings data
export const getAffiliateEarningsData = async (affiliateId) => {
  if (!affiliateId) throw new Error("Affiliate ID is required")

  const now = new Date()
  logger.info({ message: "Fetching affiliate earnings data", affiliateId })

  // Stars transactions
  const starsTxs = await StarsTransactions.find({
    affiliate_id: Number(affiliateId),
    currency: "XTR",
    status: "complete",
  }).select("_id createdAt amount")

  const starsWithdrawnTxIds = await AffiliateTransaction.find({
    affiliateId: Number(affiliateId),
    status: "complete",
  }).distinct("starsTxIds")

  const starsAvailableTxs = starsTxs.filter(
    (tx) => !starsWithdrawnTxIds.some((id) => id.equals(tx._id))
  )

  const starsResult = starsAvailableTxs.reduce(
    (acc, tx) => {
      const txAgeMs = now - new Date(tx.createdAt)
      const txAmount = parseFloat(tx.amount) * AFFILIATE_PERCENTAGE
      const roundedAmount = parseFloat(txAmount.toFixed(2))
      if (txAgeMs < STARS_LOCK_PERIOD_MS) {
        acc.lockedStars += roundedAmount
      } else {
        acc.pendingStars += roundedAmount
      }
      return acc
    },
    { lockedStars: 0, pendingStars: 0 }
  )

  const totalStarsLockedInTON = parseFloat(
    (starsResult.lockedStars / STARS_TO_TON_RATE).toFixed(2)
  )
  const totalStarsPendingInTON = parseFloat(
    (starsResult.pendingStars / STARS_TO_TON_RATE).toFixed(2)
  )

  // TON transactions
  const tonTxs = await TONTransactions.find({
    affiliate_id: Number(affiliateId),
    currency: "TON",
    status: "complete",
  }).select("_id createdAt amount")

  const tonWithdrawnTxIds = await AffiliateTransaction.find({
    affiliateId: Number(affiliateId),
    status: "complete",
  }).distinct("tonTxIds")

  const tonAvailableTxs = tonTxs.filter(
    (tx) => !tonWithdrawnTxIds.some((id) => id.equals(tx._id))
  )

  const tonResult = tonAvailableTxs.reduce(
    (acc, tx) => {
      const txAgeMs = now - new Date(tx.createdAt)
      const txAmountTON =
        (parseFloat(tx.amount) / NANOTONS_TO_TON) * AFFILIATE_PERCENTAGE
      const roundedAmount = parseFloat(txAmountTON.toFixed(2))
      if (txAgeMs < TON_LOCK_PERIOD_MS) {
        acc.lockedTON += roundedAmount
      } else {
        acc.pendingTON += roundedAmount
      }
      return acc
    },
    { lockedTON: 0, pendingTON: 0 }
  )

  const user = await User.findOne({ id: affiliateId })
  const refsCount = await Referal.countDocuments({ refer_id: affiliateId })
  const gameCenterLevel = user?.investment_levels?.game_center || 0
  const currentLevelRefsRequired =
    gameCenterLevelRequirements[gameCenterLevel] || 0
  const nextLevelRefsRequired =
    gameCenterLevelRequirements[gameCenterLevel + 1] || currentLevelRefsRequired

  const earningsData = {
    totalStarsLocked: parseFloat(starsResult.lockedStars.toFixed(2)),
    totalStarsPendingWithdrawal: parseFloat(
      starsResult.pendingStars.toFixed(2)
    ),
    totalStarsLockedInTON,
    totalStarsPendingInTON,
    totalTONLocked: parseFloat(tonResult.lockedTON.toFixed(2)),
    totalTONPendingWithdrawal: parseFloat(tonResult.pendingTON.toFixed(2)),
    currentLevelRefsRequired,
    refsCount,
    nextLevelRefsRequired,
    gameCenterLevel,
  }

  logger.info({
    message: "Earnings data retrieved",
    affiliateId,
    data: earningsData,
  })
  return earningsData
}

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

const bot = new Bot(process.env.BOT_TOKEN)

// Ensure the bot does not start polling (to avoid conflicts with getUpdates)
bot.stop() // Explicitly stop any polling (just in case)

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
    id: 4,
    type: "boost",
    chance_premium: 3,
    chance_daily: 4,
  },
  {
    id: 1,
    type: "coins",
    chance: 1,
    amount: 30,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins1.webp",
    name: { ru: "30 Монет", en: "30 Coins" },
    chance_premium: 0,
    chance_daily: 1,
  },
  {
    id: 2,
    type: "coins",
    chance: 1,
    amount: 50,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins1.webp",
    name: { ru: "50 Монет", en: "50 Coins" },
    chance_premium: 1,
    chance_daily: 3,
  },
  {
    id: 48,
    type: "clothes",
    chance_premium: 10,
    chance_daily: 15,
    prize_equivalent: {
      type: "coins",
      amount: 1000,
    },
    // prize_equivalent: {
    //   type: "boost",
    //   amount: 100
    // }
    // prize_equivalent: {
    //   type: "spin",
    //   amount: 100
    // }
  },
  {
    id: 3,
    type: "coins",
    chance: 1,
    amount: 150,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins2.webp",
    name: { ru: "150 Монет", en: "150 Coins" },
    chance_premium: 2,
    chance_daily: 40,
  },
  {
    id: 4,
    type: "coins",
    chance: 1,
    amount: 250,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins2.webp",
    name: { ru: "250 Монет", en: "250 Coins" },
    chance_premium: 8,
    chance_daily: 19,
  },
  {
    id: 5,
    type: "coins",
    chance: 1,
    amount: 500,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins2.webp",
    name: { ru: "500 Монет", en: "500 Coins" },
    chance_premium: 15,
    chance_daily: 15,
  },
  {
    id: 49,
    type: "clothes",
    chance_premium: 15,
    chance_daily: 0,
    prize_equivalent: {
      type: "coins",
      amount: 1000,
    },
  },
  {
    id: 6,
    type: "coins",
    chance: 1,
    amount: 1500,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins3.webp",
    name: { ru: "1500 Монет", en: "1500 Coins" },
    chance_premium: 4,
    chance_daily: 2,
  },
  {
    id: 7,
    type: "coins",
    chance: 1,
    amount: 400,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins2.webp",
    name: { ru: "400 Монет", en: "400 Coins" },
    chance_premium: 2,
    chance_daily: 3,
  },
  {
    id: 10000,
    type: "coins",
    chance: 1,
    amount: 10000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "10000 Монет", en: "10000 Coins" },
    chance_premium: 0,
    chance_daily: 0,
  },
  {
    id: 50,
    type: "clothes",
    chance_premium: 25,
    chance_daily: 20,
    prize_equivalent: {
      type: "coins",
      amount: 2000,
    },
  },
  {
    id: 9,
    type: "coins",
    chance: 1,
    amount: 200,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins2.webp",
    name: { ru: "200 Монет", en: "200 Coins" },
    chance_premium: 1,
    chance_daily: 2,
  },
  {
    id: 10,
    type: "coins",
    chance: 1,
    amount: 900,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins2.webp",
    name: { ru: "900 Монет", en: "900 Coins" },
    chance_premium: 35,
    chance_daily: 0,
  },
  {
    id: 11,
    type: "coins",
    chance: 1,
    amount: 2400,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins3.webp",
    name: { ru: "2400 Монет", en: "2400 Coins" },
    chance_premium: 1,
    chance_daily: 2,
  },
  {
    id: 12,
    type: "coins",
    chance: 1,
    amount: 100,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins1.webp",
    name: { ru: "100 Монет", en: "100 Coins" },
    chance_premium: 8,
    chance_daily: 12,
  },
  {
    id: 51,
    type: "clothes",
    chance_premium: 20,
    chance_daily: 0,
    prize_equivalent: {
      type: "coins",
      amount: 1000,
    },
  },
  {
    id: 13,
    type: "coins",
    chance: 1,
    amount: 5000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins4.webp",
    name: { ru: "5000 Монет", en: "5000 Coins" },
    chance_premium: 2,
    chance_daily: 1,
  },
  {
    id: 14,
    type: "coins",
    chance: 1,
    amount: 10,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins1.webp",
    name: { ru: "10 Монет", en: "10 Coins" },
    chance_premium: 0,
    chance_daily: 0,
  },
  {
    id: 15,
    type: "coins",
    chance: 1,
    amount: 450,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins2.webp",
    name: { ru: "450 Монет", en: "450 Coins" },
    chance_premium: 25,
    chance_daily: 25,
  },
  {
    id: 16,
    type: "coins",
    chance: 1,
    amount: 1000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins3.webp",
    name: { ru: "1000 Монет", en: "1000 Coins" },
    chance_premium: 18,
    chance_daily: 0,
  },
  {
    id: 8,
    type: "shelf",
    chance_premium: 1,
    chance_daily: 0,
    prize_equivalent: {
      type: "coins",
      amount: 10000,
    },
  },
]

router.get("/:id/gacha/items", async (req, res) => {
  const result = []

  const userId = req.userId
  const user = await User.findOne({ id: userId })

  if (!user) {
    return res.status(404).send()
  }

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
      case "shelf":
        const shelfItem = await ShelfItemModel.findOne({ id: item.id })
        fullItem = {
          id: item.id,
          type: item.type,
          image: shelfItem.link,
          name: shelfItem.name,
        }
        break
      default:
        return res.status(400).send()
    }

    result.push(fullItem)
  }

  res.status(200).json({
    items: result,
  })
})

router.get("/:id/gacha/attempts", async (req, res) => {
  try {
    const userId = req.userId
    console.log(userId)
    const attempts = await UserSpins.find(
      { user_id: userId, is_used: false },
      { _id: 1 },
      { sort: { createdAt: -1 } }
    )

    console.log(attempts)

    return res.status(200).json({
      attempts: attempts?.length || 0,
    })
  } catch (error) {
    logger.error("error in fetching gacha attempts", error)

    return res.status(500).send()
  }
})

router.get("/:id/gacha/spin", async (req, res) => {
  try {
    const userId = req.userId
    const attempts = await UserSpins.find(
      { user_id: userId, is_used: false },
      { _id: 1, type: 1 },
      { sort: { createdAt: -1 }, limit: 1 }
    )

    if (!attempts.length) {
      return res.status(403).json({ error: "Not enough spins" })
    }

    const attempt = attempts[0]
    const spinType = attempt.type
    const chanceField = spinType === "daily" ? "chance_daily" : "chance_premium"
    const totalWeight = itemsPoolRaw.reduce(
      (sum, item) => sum + item[chanceField],
      0
    )

    const randomValue = Math.random() * totalWeight
    let cumulativeWeight = 0
    let selectedItem

    for (const item of itemsPoolRaw) {
      cumulativeWeight += item[chanceField]
      if (randomValue <= cumulativeWeight) {
        selectedItem = item
        break
      }
    }

    if (!selectedItem) selectedItem = itemsPoolRaw[itemsPoolRaw.length - 1]

    const user = await User.findOne({ id: userId })
    if (!user) return res.status(404).json({ error: "User not found" })

    let wonItem
    let burnedTo = null // What the item was burned into, if applicable

    switch (selectedItem.type) {
      case "boost":
        const boost = await Boost.findOne({ boost_id: selectedItem.id })
        wonItem = {
          id: selectedItem.id,
          type: "boost",
          image: boost.link,
          name: boost.name,
        }
        await new UserBoost({ id: userId, boost_id: wonItem.id }).save()
        break
      case "clothes":
        const clothes = await Clothing.findOne({ clothing_id: selectedItem.id })
        wonItem = {
          id: selectedItem.id,
          type: "clothes",
          image:
            user.personage.gender === "male"
              ? clothes.male_icon
              : clothes.female_icon,
          name: clothes.name,
        }
        const userInventoryClothes = await UserCurrentInventory.findOne({
          user_id: userId,
        })
        const isDuplicateClothes = userInventoryClothes?.clothes.some(
          (c) => c.id === wonItem.id
        )
        if (isDuplicateClothes && selectedItem.prize_equivalent) {
          burnedTo = selectedItem.prize_equivalent
          if (burnedTo.type === "coins") {
            await upUserBalance(userId, burnedTo.amount)
            burnedTo.image =
              "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins3.webp" // Assuming a static coin image from Assets
          } else if (burnedTo.type === "boost") {
            const burnedBoost = await Boost.findOne({
              boost_id: burnedTo.amount,
            })
            await new UserBoost({
              id: userId,
              boost_id: burnedTo.amount,
            }).save()
            burnedTo.image = burnedBoost.link // Actual boost image
            burnedTo.name = burnedBoost.name // Boost name for display
          }
        } else {
          await UserCurrentInventory.updateOne(
            { user_id: userId },
            { $addToSet: { clothes: { id: wonItem.id } } }
          )
        }
        break
      case "coins":
        wonItem = {
          id: selectedItem.id,
          type: "coins",
          image:
            selectedItem.image ||
            "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins3.webp", // Use item-specific or default coin image
          name: selectedItem.name,
          amount: selectedItem.amount,
        }
        await upUserBalance(userId, wonItem.amount)
        break
      case "shelf":
        const shelfItem = await ShelfItemModel.findOne({ id: selectedItem.id })
        wonItem = {
          id: selectedItem.id,
          type: "shelf",
          image: shelfItem.link,
          name: shelfItem.name,
        }
        const userInventoryShelf = await UserCurrentInventory.findOne({
          user_id: userId,
        })
        const isDuplicateShelf = userInventoryShelf?.shelf.some(
          (s) => s.id === wonItem.id
        )
        if (isDuplicateShelf && selectedItem.prize_equivalent) {
          burnedTo = selectedItem.prize_equivalent
          if (burnedTo.type === "coins") {
            await upUserBalance(userId, burnedTo.amount)
            burnedTo.image =
              "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins3.webp" // Coin image
          } else if (burnedTo.type === "boost") {
            const burnedBoost = await Boost.findOne({
              boost_id: burnedTo.amount,
            })
            await new UserBoost({
              id: userId,
              boost_id: burnedTo.amount,
            }).save()
            burnedTo.image = burnedBoost.link // Actual boost image
            burnedTo.name = burnedBoost.name // Boost name
          }
        } else {
          await UserCurrentInventory.updateOne(
            { user_id: userId },
            { $addToSet: { shelf: { id: wonItem.id } } }
          )
        }
        break
      default:
        return res.status(400).json({ error: "Invalid item type" })
    }

    await UserSpins.updateOne({ _id: attempt._id }, { $set: { is_used: true } })

    res.status(200).json({
      wonItem, // Always return the won item for roulette display
      burnedTo, // Prize if burned, including image
    })
  } catch (error) {
    console.error("Error in gacha spin:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

const dailyRewardsPool = [
  {
    day: 1,
    type: "coins",
    amount: 50,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins1.webp",
    name: { ru: "50 Монет", en: "50 Coins" },
  },
  {
    day: 2,
    type: "coins",
    amount: 100,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins2.webp",
    name: { ru: "100 Монет", en: "100 Coins" },
  },
  { day: 3, type: "boost", id: 1, name: { en: "Boost" } },
  {
    day: 4,
    type: "coins",
    amount: 300,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins3.webp",
    name: { ru: "300 Монет", en: "300 Coins" },
  },
  
  {
    day: 5,
    type: "coins",
    amount: 1500,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins4.webp",
    name: { ru: "1500 Монет", en: "1500 Coins" },
  },
  { day: 6, type: "boost", id: 7, name: { en: "Boost" } },
  {
    day: 7,
    type: "coins",
    amount: 3000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "3000 Монет", en: "3000 Coins" },
  },
  {
    day: 8,
    type: "coins",
    amount: 4000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "4000 Монет", en: "4000 Coins" },
  },
  {
    day: 9,type: "boost", id: 8, name: { en: "Boost" }
  },
  {
    day: 10,
    type: "coins",
    amount: 5000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "5000 Монет", en: "5000 Coins" },
  },
  {
    day: 11,
    type: "coins",
    amount: 8000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "8000 Монет", en: "8000 Coins" },
  },
  {
    day: 12,type: "boost", id: 2, name: { en: "Boost" }
  },
  {
    day: 13,
    type: "coins",
    amount: 12000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "12000 Монет", en: "12000 Coins" },
  },
  {
    day: 14,
    type: "coins",
    amount: 15000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "15000 Монет", en: "15000 Coins" },
  },
  {
    day: 15,
    type: "coins",
    amount: 19000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "19000 Монет", en: "19000 Coins" },
  },
  {
    day: 16,type: "boost", id: 3, name: { en: "Boost" }
  },
  {
    day: 17,
    type: "coins",
    amount: 22000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "22000 Монет", en: "22000 Coins" },
  },
  {
    day: 18,
    type: "coins",
    amount: 25000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "25000 Монет", en: "25000 Coins" },
  },
  {
    day: 19,type: "boost", id: 7, name: { en: "Boost" }
  },
  {
    day: 20,
    type: "coins",
    amount: 31000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "31000 Монет", en: "31000 Coins" },
  },
  {
    day: 21,
    type: "coins",
    amount: 40000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "40000 Монет", en: "40000 Coins" },
  },
  {
    day: 22,type: "boost", id: 1, name: { en: "Boost" }
  },
  {
    day: 23,
    type: "coins",
    amount: 48000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "48000 Монет", en: "48000 Coins" },
  },
  {
    day: 24,
    type: "coins",
    amount: 55000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "55000 Монет", en: "55000 Coins" },
  },
  {
    day: 25,
    type: "coins",
    amount: 69000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "69000 Монет", en: "69000 Coins" },
  },
  {
    day: 26,
    type: "coins",
    amount: 75000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "75000 Монет", en: "75000 Coins" },
  },
  {
    day: 27,type: "boost", id: 4, name: { en: "Boost" }
  },
  {
    day: 28,
    type: "coins",
    amount: 95000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "95000 Монет", en: "95000 Coins" },
  },
  {
    day: 29,
    type: "coins",
    amount: 100000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "100000 Монет", en: "100000 Coins" },
  },
  {
    day: 27,type: "boost", id: 8, name: { en: "Boost" }
  },
  
  
]

// Helper function to get the start of the day in the user's timezone
const getStartOfDay = (userTz) => {
  const tz = userTz || moment.tz.guess() // Fallback to guessed timezone
  return moment.tz(tz).startOf("day") // 00:00:00 in user's timezone
}

// Helper function to create a date that MongoDB will store as YYYY-MM-DD 00:00:00.000+00:00
const createMongoDate = (momentDate) => {
  const year = momentDate.year()
  const month = momentDate.month()
  const day = momentDate.date()
  return new Date(Date.UTC(year, month, day, 0, 0, 0, 0))
}

// Claim Reward Endpoint (Unchanged)
router.get("/:id/daily/claim", async (req, res) => {
  try {
    const userId = req.userId

    const user = await User.findOne(
      { id: userId },
      { id: 1, tz: 1, personage: 1 }
    )
    if (!user) {
      logger.warn(`User not found: ${userId}`)
      return res.status(404).json({ error: "User not found" })
    }

    const todayMoment = getStartOfDay(user.tz)
    const today = todayMoment.toDate()

    const lastClaim = await UserCheckInsModel.findOne(
      { user_id: userId, is_claimed: true },
      { check_in_date: 1, streak: 1 },
      { sort: { check_in_date: -1 } }
    )

    logger.debug(
      `Claim attempt - User: ${userId}, Today: ${todayMoment.format(
        "YYYY-MM-DD"
      )}, Timezone: ${user.tz || "guessed"}, Last claim: ${
        lastClaim ? lastClaim.check_in_date.toISOString() : "None"
      }`
    )

    if (lastClaim) {
      const lastClaimMoment = moment
        .tz(lastClaim.check_in_date, user.tz || moment.tz.guess())
        .startOf("day")
      if (lastClaimMoment.isSame(todayMoment, "day")) {
        logger.info(`User ${userId} already claimed reward today`)
        return res.status(403).json({ error: "Reward already claimed today" })
      }
    }

    let streak = 1
    if (lastClaim) {
      const lastClaimMoment = moment
        .tz(lastClaim.check_in_date, user.tz || moment.tz.guess())
        .startOf("day")
      const daysDiff = todayMoment.diff(lastClaimMoment, "days")
      logger.debug(
        `Days difference: ${daysDiff}, Last streak: ${lastClaim.streak}`
      )

      if (daysDiff === 1) {
        streak = lastClaim.streak >= 7 ? 1 : lastClaim.streak + 1
      } else if (daysDiff > 1) {
        streak = 1
      }
    }

    const selectedItem = dailyRewardsPool.find((item) => item.day === streak)
    if (!selectedItem) {
      logger.error(`No reward defined for streak day ${streak}`)
      return res.status(500).json({ error: "No reward defined for this day" })
    }

    let wonItem
    switch (selectedItem.type) {
      case "coins":
        wonItem = { ...selectedItem }
        await upUserBalance(userId, wonItem.amount)
        break
      case "boost":
        const boost = await Boost.findOne({ boost_id: selectedItem.id })
        wonItem = {
          id: selectedItem.id,
          type: selectedItem.type,
          image: boost?.link || "default.png",
          name: boost?.name || selectedItem.name,
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
              ? clothes?.male_icon
              : clothes?.female_icon || "default.png",
          name: clothes?.name || selectedItem.name,
        }
        await UserCurrentInventory.updateOne(
          { user_id: userId },
          { $addToSet: { clothes: { id: wonItem.id } } }
        )
        break
      case "shelf":
        const item = await ShelfItemModel.findOne({ id: selectedItem.id })
        wonItem = {
          id: selectedItem.id,
          type: selectedItem.type,
          image: item?.link || "default.png",
          name: item?.name || selectedItem.name,
        }
        await UserCurrentInventory.updateOne(
          { user_id: userId },
          { $addToSet: { shelf: { id: wonItem.id } } }
        )
        break
      default:
        logger.error(`Invalid item type: ${selectedItem.type}`)
        return res.status(400).json({ error: "Invalid item type" })
    }

    const mongoDate = createMongoDate(todayMoment)

    const claim = new UserCheckInsModel({
      user_id: userId,
      check_in_date: mongoDate,
      streak,
      is_claimed: true,
      last_check_in: lastClaim ? lastClaim.check_in_date : null,
    })
    await claim.save()

    logger.info(
      `Claim recorded - User: ${userId}, Streak: ${streak}, Item: ${
        selectedItem.type
      }, Timezone: ${user.tz || "guessed"}`
    )
    res.status(200).json({ wonItem, streak })
  } catch (error) {
    logger.error(
      `Error in claiming daily reward for user ${userId}: ${error.message}`,
      { error }
    )
    res.status(500).json({ error: "Internal server error" })
  }
})

// Status Endpoint (Updated)
router.get("/:id/daily/status", async (req, res) => {
  try {
    const userId = req.userId

    const user = await User.findOne(
      { id: userId },
      { id: 1, tz: 1, personage: 1 }
    )
    if (!user) {
      logger.warn(`User not found: ${userId}`)
      return res.status(404).json({ error: "User not found" })
    }

    const todayMoment = getStartOfDay(user.tz)
    const today = todayMoment.toDate()

    // Fetch the last 7 claims to determine the current cycle
    const recentClaims = await UserCheckInsModel.find(
      { user_id: userId, is_claimed: true },
      { check_in_date: 1, streak: 1 },
      { sort: { check_in_date: -1 }, limit: 7 }
    )

    const lastClaim = recentClaims[0] || null

    // Determine the start of the current cycle
    let cycleStartDate = null
    if (recentClaims.length > 0) {
      // Find the most recent streak = 1 after a streak >= 7 or a gap
      for (let i = 0; i < recentClaims.length - 1; i++) {
        const currentClaim = recentClaims[i]
        const prevClaim = recentClaims[i + 1]
        const currentMoment = moment
          .tz(currentClaim.check_in_date, user.tz || moment.tz.guess())
          .startOf("day")
        const prevMoment = moment
          .tz(prevClaim.check_in_date, user.tz || moment.tz.guess())
          .startOf("day")
        const daysDiff = currentMoment.diff(prevMoment, "days")

        if (
          currentClaim.streak === 1 &&
          (prevClaim.streak >= 7 || daysDiff > 1)
        ) {
          cycleStartDate = currentClaim.check_in_date
          break
        }
      }
      // If no reset found, use the earliest claim if streak < 7
      if (!cycleStartDate && lastClaim && lastClaim.streak < 7) {
        cycleStartDate = recentClaims[recentClaims.length - 1].check_in_date
      }
    }

    // Get claims in the current cycle
    const cycleClaims = cycleStartDate
      ? await UserCheckInsModel.find({
          user_id: userId,
          is_claimed: true,
          check_in_date: { $gte: cycleStartDate },
        }).sort({ streak: 1 })
      : []

    const resolvedRewards = await Promise.all(
      dailyRewardsPool.map(async (item) => {
        let reward
        switch (item.type) {
          case "boost":
            const boost = await Boost.findOne({ boost_id: item.id })
            reward = {
              ...item,
              image: boost?.link || "default.png",
              name: boost?.name || item.name,
            }
            break
          case "clothes":
            const clothes = await Clothing.findOne({ clothing_id: item.id })
            reward = {
              ...item,
              image:
                user.personage.gender === "male"
                  ? clothes?.male_icon
                  : clothes?.female_icon || "default.png",
              name: clothes?.name || item.name,
            }
            break
          case "coins":
            reward = { ...item }
            break
          case "shelf":
            const shelf = await ShelfItemModel.findOne({ id: item.id })
            reward = {
              ...item,
              image: shelf?.link || "default.png",
              name: shelf?.name || item.name,
            }
            break
          default:
            return null
        }
        // Mark as collected if claimed in the current cycle
        reward.collected = cycleClaims.some(
          (claim) => claim.streak === item.day
        )
        return reward
      })
    ).then((results) => results.filter(Boolean))

    let streak = 0
    let canClaim = true
    let nextRewardDay = 1
    let isStreakBroken = false

    if (lastClaim) {
      const lastClaimMoment = moment
        .tz(lastClaim.check_in_date, user.tz || moment.tz.guess())
        .startOf("day")
      const daysDiff = todayMoment.diff(lastClaimMoment, "days")
      logger.debug(
        `Status - User: ${userId}, Today: ${todayMoment.format(
          "YYYY-MM-DD"
        )}, Last claim: ${lastClaimMoment.format(
          "YYYY-MM-DD"
        )}, Days diff: ${daysDiff}, Timezone: ${user.tz || "guessed"}`
      )

      if (daysDiff === 0) {
        streak = lastClaim.streak
        canClaim = false
        nextRewardDay = lastClaim.streak >= 7 ? 1 : lastClaim.streak + 1
      } else if (daysDiff === 1) {
        streak = lastClaim.streak
        canClaim = true
        nextRewardDay = lastClaim.streak >= 7 ? 1 : lastClaim.streak + 1
      } else if (daysDiff > 1) {
        streak = 0
        canClaim = true
        nextRewardDay = 1
        isStreakBroken = true
      }
    }

    const nextReward =
      resolvedRewards.find((item) => item.day === nextRewardDay) ||
      resolvedRewards[0]

    logger.info(
      `Status - User: ${userId}, Streak: ${streak}, Can claim: ${canClaim}, Next day: ${nextRewardDay}, Broken: ${isStreakBroken}, Timezone: ${
        user.tz || "guessed"
      }, Cycle claims: ${cycleClaims.length}`
    )
    res.status(200).json({
      streak,
      canClaim,
      nextReward,
      rewards: resolvedRewards,
      isStreakBroken,
    })
  } catch (error) {
    logger.error(
      `Error in fetching daily status for user ${userId}: ${error.message}`,
      { error }
    )
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/:id/effects/current", async (req, res) => {
  try {
    const userId = req.userId
    console.log(`Fetching effects for userId: ${userId}`)

    const userParameters = await UserParameters.findOne({ id: userId })
    if (!userParameters) {
      return res.status(404).json({ error: "User parameters not found" })
    }

    const effectSources = { shelf: [], clothing: [], boosts: [] }
    const allEffects = {
      cant_fall_below_percent: [],
      profit_hourly_percent: [],
      profit_hourly_fixed: [],
      cost_hourly_percent: [],
      profit_per_tick_fixed: [],
      cost_per_tick_fixed: [],
      autostart: [],
      duration_decrease: null,
      mood_increase: null,
      reward_increase: null,
      energy_cost_decrease: null,
      hunger_cost_decrease: null,
    }
    let nekoBoostPercentage = 0

    // Fetch effects only if canApplyConstantEffects is true
    if (canApplyConstantEffects(userParameters)) {
      // Shelf items
      const user = await User.findOne({ id: userId })
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      const shelfItems = Object.values(user.shelf).filter(Boolean)
      if (shelfItems.length > 0) {
        const shelf = await ShelfItemModel.find({ id: { $in: shelfItems } })
        console.log(`Found ${shelf.length} shelf items for user ${userId}`)
        shelf.forEach((item, index) => {
          if (item.effects) {
            console.log(
              `Shelf item ${index} effects: ${JSON.stringify(item.effects)}`
            )
            effectSources.shelf.push(item.effects)
          }
        })
      }

      // Worn clothing
      const userClothing = await UserClothing.findOne(
        { user_id: userId },
        { _id: 0, user_id: 0 }
      )
      if (userClothing) {
        const clothesItems = [
          userClothing.hat,
          userClothing.top,
          userClothing.pants,
          userClothing.shoes,
          userClothing.accessories,
        ].filter((item) => item !== null && item !== undefined)
        if (clothesItems.length > 0) {
          const clothing = await Clothing.find({
            clothing_id: { $in: clothesItems },
          })
          console.log(
            `Found ${clothing.length} clothing items for user ${userId}`
          )
          clothing.forEach((item, index) => {
            if (item.effects) {
              console.log(
                `Clothing item ${index} effects: ${JSON.stringify(
                  item.effects
                )}`
              )
              effectSources.clothing.push(item.effects)
            }
          })
        }
      }

      // Active boosts
      const activeBoostProcesses = await gameProcess.find({
        id: userId,
        type: "boost",
      })
      if (activeBoostProcesses.length) {
        const boostIds = activeBoostProcesses.map((p) => p.type_id)
        const boosts = await Boost.find({ boost_id: { $in: boostIds } })
        console.log(`Found ${boosts.length} active boosts for user ${userId}`)
        boosts.forEach((boost, index) => {
          if (boost.effects) {
            console.log(
              `Boost ${index} effects: ${JSON.stringify(boost.effects)}`
            )
            effectSources.boosts.push(boost.effects)
          }
        })
      }

      // Combine effects
      const combineEffects = (effects, target) => {
        effects.forEach((effectObj) => {
          if (!effectObj || typeof effectObj !== "object") return

          Object.entries(effectObj).forEach(([category, value]) => {
            // Handle array effects
            if (target[category] && Array.isArray(target[category])) {
              if (Array.isArray(value)) {
                value.forEach((effect) => {
                  if (
                    effect &&
                    typeof effect === "object" &&
                    "param" in effect &&
                    "value" in effect
                  ) {
                    console.log(
                      `Adding effect: ${category} - ${effect.param}: ${effect.value}`
                    )
                    target[category].push({
                      param: effect.param,
                      value: effect.value,
                    })
                  }
                })
              }
            }
            // Handle scalar effects
            else if (target[category] !== undefined && !Array.isArray(value)) {
              console.log(`Setting scalar effect: ${category} - ${value}`)
              target[category] = value
            }
          })
        })
      }

      combineEffects(effectSources.shelf, allEffects)
      combineEffects(effectSources.clothing, allEffects)
      combineEffects(effectSources.boosts, allEffects)
    } else {
      console.log(
        `Effects not applied for user ${userId}: canApplyConstantEffects returned false`
      )
    }

    // Neko Boost Percentage
    const nekoBoostMultiplier = await getNekoBoostMultiplier(userId)
    nekoBoostPercentage = (nekoBoostMultiplier - 1) * 100
    console.log(
      `Neko Boost Multiplier for user ${userId}: ${nekoBoostMultiplier}, Percentage: ${nekoBoostPercentage}%`
    )

    // Debug: Check active effects for the user
    const activeEffects = await ActiveEffectsModel.find({
      user_id: userId,
      valid_until: { $gt: new Date() },
    })
    console.log(`Active effects for user ${userId}:`, activeEffects)

    console.log("Final allEffects:", JSON.stringify(allEffects))

    res.status(200).json({
      effects: { ...allEffects, neko_boost_percentage: nekoBoostPercentage },
    })
  } catch (error) {
    console.error("Error fetching current effects:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/time", (req, res) =>
  res.status(200).json({ server_time: new Date() })
)

//!TODO move to different place
router.get("/leaderboard", getLeaderboard)

export const COOLDOWN_MS = 3600000 // 1 hour in milliseconds
export const EFFECT_DURATION_MS = 3600000 // 24 hours in milliseconds

// Helper to check if cooldown has expired
export const isCooldownExpired = (timestamp) => {
  const now = new Date()
  const cooldownEnd = new Date(timestamp.getTime() + COOLDOWN_MS)
  return now >= cooldownEnd
}

// Helper to get boost type based on neko ID
export const getActiveEffectTypeByNekoId = (id) => {
  if (!id) return null
  if (id === 8) {
    return ActiveEffectTypes.BasicNekoBoost
  } else if (id > 8) {
    return ActiveEffectTypes.NftNekoBoost
  }
  return null
}
// Helper to get coin reward for clicker based on neko ID
export const getCoinRewardByUserLevel = (level) => {
  return levelToNekoCoinsClaimAmountMap[level] || 0
}

export const getRespectRewardByNekoRarity = (rarity) => {
  return nekoRarityToRespectMap[rarity] || 0
}

// Check user's neko state (for Home page)
export const getUserNekoState = async (userId) => {
  try {
    // Check the user's own neko cooldown (userId is the owner of the neko)
    const lastAction = await ActionLogModel.findOne(
      { user_id: userId, action_type: ActionTypes.NekoInteract },
      null,
      { sort: { action_timestamp: -1 } }
    )
    const canClick =
      !lastAction || isCooldownExpired(lastAction.action_timestamp)
    const cooldownUntil =
      lastAction && !canClick
        ? new Date(lastAction.action_timestamp.getTime() + COOLDOWN_MS)
        : null

    return {
      canClick,
      cooldownUntil,
    }
  } catch (error) {
    console.error(`Error fetching neko state for user ${userId}:`, error)
    throw error
  }
}

// Check interaction state (ForeignHome page)
export const getNekoInteractionState = async (userId, targetUserId) => {
  try {
    // Check target user's neko cooldown
    const lastTargetAction = await ActionLogModel.findOne(
      { user_id: targetUserId, action_type: ActionTypes.NekoInteract },
      null,
      { sort: { action_timestamp: -1 } }
    )
    const targetCanBeClicked =
      !lastTargetAction || isCooldownExpired(lastTargetAction.action_timestamp)
    const targetCooldownUntil =
      lastTargetAction && !targetCanBeClicked
        ? new Date(lastTargetAction.action_timestamp.getTime() + COOLDOWN_MS)
        : null

    return {
      canClick: targetCanBeClicked,
      cooldownUntil: targetCooldownUntil,
      whoseCooldown: targetCanBeClicked ? null : "target",
    }
  } catch (error) {
    console.error(
      `Error fetching interaction state for user ${userId} on target ${targetUserId}:`,
      error
    )
    throw error
  }
}

export const interactWithNeko = async (userId, targetUserId) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Prevent self-interaction or invalid target
    if (userId === targetUserId || !targetUserId) {
      throw new Error('Cannot interact with yourself or nobody');
    }

    // Check neko cooldown (per target user)
    const interactionState = await getNekoInteractionState(userId, targetUserId);
    if (!interactionState.canClick) {
      throw new Error('This user\'s neko is still on cooldown from being clicked');
    }

    // Fetch target user's neko and relevant data
    const targetUser = await User.findOne(
      { id: targetUserId },
      { 'shelf.neko': 1 },
      { session }
    );
    const targetUserParams = await UserParameters.findOne(
      { id: targetUserId },
      { respect: 1 },
      { session }
    );
    const user = await UserParameters.findOne(
      { id: userId },
      { level: 1, respect: 1 },
      { session }
    );

    if (!targetUser) {
      throw new Error('Target user not found');
    }
    const nekoId = targetUser?.shelf?.neko || null;
    if (!nekoId) {
      throw new Error('Target user has no neko');
    }

    const neko = await ShelfItemModel.findOne({ id: nekoId }, null, { session });
    if (!neko) {
      throw new Error('Neko not found');
    }

    const activeEffectType = getActiveEffectTypeByNekoId(nekoId);
    const boostPercentage = getBoostPercentageFromType(activeEffectType);
    const coinReward = getCoinRewardByUserLevel(user.level);
    const respectReward = getRespectRewardByNekoRarity(neko.rarity);

    // Log the interaction
    const now = new Date();
    const actionLogExists = await ActionLogModel.findOne(
      {
        user_id: targetUserId,
        action_type: ActionTypes.NekoInteract,
        'metadata.nekoId': nekoId,
        'metadata.clickedBy': userId,
        action_timestamp: { $gte: new Date(now.getTime() - 1000) }, // Prevent duplicate logs within 1 second
      },
      null,
      { session }
    );

    if (actionLogExists) {
      throw new Error('Interaction already logged recently');
    }

    const newAction = new ActionLogModel({
      user_id: targetUserId,
      action_type: ActionTypes.NekoInteract,
      action_timestamp: now,
      metadata: {
        nekoId,
        boostPercentage,
        activeEffectType,
        coinReward,
        clickedBy: userId,
      },
      triggered_by: userId,
    });
    await newAction.save({ session });

    // Apply boost to the owner (targetUserId)
    if (activeEffectType && boostPercentage > 0) {
      // Check for existing active effect to prevent duplicates
      const existingEffect = await ActiveEffectsModel.findOne(
        {
          user_id: targetUserId,
          type: activeEffectType,
          valid_until: { $gt: now },
        },
        null,
        { session }
      );

      if (!existingEffect) {
        const userEffect = new ActiveEffectsModel({
          user_id: targetUserId,
          type: activeEffectType,
          valid_until: new Date(now.getTime() + EFFECT_DURATION_MS),
          triggered_by: userId,
        });
        await userEffect.save({ session });

        // Update respect
        targetUserParams.respect += respectReward;
        await targetUserParams.save({ session });

        // Send boost message (ensure it runs only once)
        await sendNekoBoostMessage(targetUserId, boostPercentage);

        logger.info('Effect applied to owner', {
          userId: targetUserId,
          effectType: activeEffectType,
        });
        logger.info(`Added ${respectReward} respect to user ${targetUserId}`);
      }
    }

    // Add coins to the clicker (userId)
    if (coinReward > 0) {
      await upUserBalance(userId, coinReward, session);
      logger.info('Coins added to clicker', { userId, coinReward });
    }

    logger.info('Neko interacted', {
      userId,
      targetUserId,
      nekoId,
      boostPercentage,
      boostType: activeEffectType,
      coinReward,
      cooldownUntil: new Date(now.getTime() + COOLDOWN_MS),
    });

    await session.commitTransaction();

    return {
      cooldownUntil: new Date(now.getTime() + COOLDOWN_MS),
      received_coins: coinReward,
      owners_boost: boostPercentage,
    };
  } catch (error) {
    await session.abortTransaction();
    logger.error(
      `Error interacting with neko for user ${userId} on target ${targetUserId}:`,
      error
    );
    throw error;
  } finally {
    session.endSession();
  }
};

// Generic function to log any action
export const logAction = async (userId, actionType, metadata = {}) => {
  try {
    const action = new ActionLogModel({
      user_id: userId,
      action_type: actionType,
      action_timestamp: new Date(),
      metadata,
      triggered_by: userId,
    })
    await action.save()
    return action
  } catch (error) {
    console.error(
      `Error logging action ${actionType} for user ${userId}:`,
      error
    )
    throw error
  }
}

// Route for Home page: Get user's clicking state
router.get("/neko/user-state/:userId", async (req, res) => {
  try {
    const userId = req.userId
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid userId" })
    }
    const state = await getUserNekoState(userId)
    res.json(state)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user neko state" })
  }
})

// Route for ForeignHome page: Get interaction state
router.post("/neko/interaction-state", async (req, res) => {
  try {
    const { targetUserId } = req.body
    const userId = req.userId
    if (!userId || !targetUserId) {
      return res
        .status(400)
        .json({ error: "Both userId and targetUserId are required" })
    }
    const parsedUserId = parseInt(userId)
    const parsedTargetUserId = parseInt(targetUserId)
    if (isNaN(parsedUserId) || isNaN(parsedTargetUserId)) {
      return res.status(400).json({ error: "Invalid userId or targetUserId" })
    }
    const state = await getNekoInteractionState(
      parsedUserId,
      parsedTargetUserId
    )
    res.json(state)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch neko interaction state" })
  }
})

// Route to interact with a target user's neko
router.post("/neko/interact", async (req, res) => {
  try {
    const { targetUserId } = req.body
    const userId = req.userId
    if (!userId || !targetUserId) {
      return res
        .status(400)
        .json({ error: "Both userId and targetUserId are required" })
    }
    const parsedUserId = parseInt(userId)
    const parsedTargetUserId = parseInt(targetUserId)
    if (isNaN(parsedUserId) || isNaN(parsedTargetUserId)) {
      return res.status(400).json({ error: "Invalid userId or targetUserId" })
    }
    const result = await interactWithNeko(parsedUserId, parsedTargetUserId)
    res.json(result)
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Failed to interact with neko" })
  }
})

// Get skill details by skill_id
router.get("/skills/:skillId", async (req, res) => {
  try {
    const skillId = parseInt(req.params.skillId)

    // Fetch the skill from the database
    const skill = await SkillModel.findOne({ skill_id: skillId })

    if (!skill) {
      return res.status(404).json({ error: true, message: "Skill not found" })
    }

    // Construct the response
    const response = {
      skill_id: skill.skill_id,
      name: skill.name, // Object with { ru: "...", en: "..." }
      link: skill.link, // URL to the skill icon/image
      description: skill.description || {}, // Optional, if it exists
      coins_price: skill.coins_price || 0, // Optional, for context
      duration: skill.duration || 0, // Optional, in minutes
      required_level: skill.requiredLevel || 0, // Optional, if applicable
    }

    return res.status(200).json(response)
  } catch (err) {
    console.error("Error fetching skill details:", err)
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" })
  }
})

const limiter = new Bottleneck({ minTime: 100, maxConcurrent: 1 })

const COIN_SPEED = -50
const COIN_EXPIRATION = 10
const SPAWN_INTERVAL = 2 // Spawn every 30s
const MAX_COINS = 10000

const spawnCoin = (process) => {
  const coinId = crypto.randomBytes(8).toString("hex")
  const token = crypto
    .createHmac("sha256", process._id.toString())
    .update(coinId + moment().tz("Europe/Moscow").toISOString())
    .digest("hex")
  return {
    id: coinId,
    spawnTime: moment().tz("Europe/Moscow").toDate(),
    x: 374,
    y: Math.floor(Math.random() * 80) + 20, // 20-100
    collectionToken: token,
    collected: false,
  }
}

// Start sleep process
router.post("/sleep/start/:userId", async (req, res) => {
  const userId = req.userId
  try {
    const userParams = await UserParameters.findOne({ id: userId })
    if (!userParams || userParams.energy >= userParams.energy_capacity) {
      return res
        .status(400)
        .json({ error: true, message: "Cannot start sleep" })
    }

    const levelParams = await LevelsParameters.findOne({
      level: userParams.level,
    })
    if (!levelParams) {
      return res
        .status(500)
        .json({ error: true, message: "Level parameters not found" })
    }

    const existingProcess = await gameProcess.findOne({
      id: userId,
      type: "sleep",
      active: true,
    })
    if (existingProcess) {
      return res
        .status(400)
        .json({ error: true, message: "Sleep process already active" })
    }

    const sleepDuration = levelParams.sleep_duration * 60
    const process = new gameProcess({
      id: userId,
      type: "sleep",
      type_id: userParams.level,
      base_duration_in_seconds: sleepDuration,
      target_duration_in_seconds: sleepDuration,
      sleep_game: {
        coins: [spawnCoin()],
        playerJumps: [],
        lastSpawnTime: moment().tz("Europe/Moscow").toDate(),
      },
    })
    await process.save()

    logger.info("Sleep process started with initial coin", {
      userId,
      processId: process._id,
    })
    return res.status(201).json({ success: true, processId: process._id })
  } catch (err) {
    logger.error("Error starting sleep", { userId, error: err.message })
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" })
  }
})

// Get sleep state (Auto-spawn coins)
router.get(
  "/sleep/state/:userId",
  limiter.wrap(async (req, res) => {
    const userId = req.userId
    try {
      const process = await gameProcess.findOne({
        id: userId,
        type: "sleep",
        active: true,
      })
      if (!process) {
        return res
          .status(404)
          .json({ error: true, message: "No active sleep process" })
      }

      const now = moment().tz("Europe/Moscow")
      const elapsedSeconds = now.diff(moment(process.createdAt), "seconds")
      const remainingSeconds =
        process.target_duration_in_seconds - elapsedSeconds

      const activeCoins = process.sleep_game.coins.filter(
        (c) =>
          !c.collected &&
          now.diff(moment(c.spawnTime), "seconds") <= COIN_EXPIRATION
      )
      const timeSinceLastSpawn = now.diff(
        moment(process.sleep_game.lastSpawnTime),
        "seconds"
      )
      if (
        activeCoins.length < MAX_COINS &&
        timeSinceLastSpawn >= SPAWN_INTERVAL
      ) {
        const newCoin = spawnCoin(process)
        process.sleep_game.coins.push(newCoin)
        process.sleep_game.lastSpawnTime = now.toDate()
        logger.info("Coin spawned in state", {
          userId,
          coinId: newCoin.id,
        })
        await process.save()
      }

      res.status(200).json({
        success: true,
        coins: process.sleep_game.coins,
        remainingSeconds: Math.max(0, remainingSeconds),
        playerJumps: process.sleep_game.playerJumps,
        serverTime: now.toISOString(),
      })
    } catch (err) {
      logger.error("Error fetching sleep game state", {
        userId,
        error: err.message,
      })
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  })
)

// Record jump (No spawning here)
router.post(
  "/sleep/jump/:userId",
  limiter.wrap(async (req, res) => {
    const userId = req.userId
    const { y, time } = req.body

    try {
      const process = await gameProcess.findOne({
        id: userId,
        type: "sleep",
        active: true,
      })
      if (!process) {
        return res
          .status(404)
          .json({ error: true, message: "No active sleep process" })
      }

      const now = moment().tz("Europe/Moscow")
      process.sleep_game.playerJumps.push({ time: new Date(time), y })
      await process.save()
      logger.info("Player jump recorded", { userId, y, time })
      return res.status(200).json({ success: true })
    } catch (err) {
      logger.error("Error recording jump", { userId, error: err.message })
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
    }
  })
)

// Collect coin
router.post("/sleep/collect-coin/:userId", async (req, res) => {
  const userId = req.userId
  const {
    coinId,
    collectionToken,
    playerX,
    playerY,
    jumpTime,
    clientCoinX,
    collectionTime,
  } = req.body

  try {
    const process = await gameProcess.findOne({
      id: userId,
      type: "sleep",
      active: true,
    })
    if (!process) {
      return res
        .status(404)
        .json({ error: true, message: "No active sleep process" })
    }

    const now = moment(collectionTime).tz("Europe/Moscow")
    const elapsedSeconds = now.diff(moment(process.createdAt), "seconds")
    const remainingSeconds = process.target_duration_in_seconds - elapsedSeconds
    if (remainingSeconds <= 0) {
      return res
        .status(400)
        .json({ error: true, message: "Sleep process completed" })
    }

    const coin = process.sleep_game.coins.find(
      (c) => c.id === coinId && !c.collected
    )
    if (!coin || coin.collectionToken !== collectionToken) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid coin or token" })
    }

    const coinAge = now.diff(moment(coin.spawnTime), "milliseconds") / 1000
    const serverCoinX = coin.x + COIN_SPEED * coinAge
    const bufferX = 20
    const bufferY = 20
    const tolerance = 50

    if (
      coinAge > COIN_EXPIRATION ||
      Math.abs(clientCoinX - serverCoinX) > tolerance ||
      playerX + tolerance < clientCoinX - bufferX || // Fixed: player must reach coin
      playerX > clientCoinX + bufferX ||
      playerY + 40 < coin.y - bufferY ||
      playerY > coin.y + 20 + bufferY
    ) {
      logger.debug("Coin collision check failed", {
        userId,
        coinId,
        coinAge,
        serverCoinX,
        clientCoinX,
        coinY: coin.y,
        playerX,
        playerY,
        bufferX,
        bufferY,
        tolerance,
      })
      return res.status(400).json({ error: true, message: "Coin out of reach" })
    }

    const jump = process.sleep_game.playerJumps.find((j) =>
      moment(j.time).isSame(moment(jumpTime), "second")
    )
    if (!jump) {
      return res
        .status(400)
        .json({ error: true, message: "No matching jump recorded" })
    }

    coin.collected = true
    process.target_duration_in_seconds = Math.max(
      10,
      process.target_duration_in_seconds - 10
    )
    process.updatedAt = now.toDate()
    await process.save()

    logger.info("Sleep coin collected", {
      userId,
      processId: process._id,
      coinId,
      newDuration: process.target_duration_in_seconds,
    })

    return res.status(200).json({
      success: true,
      remainingSeconds: Math.max(
        0,
        process.target_duration_in_seconds - elapsedSeconds
      ),
    })
  } catch (err) {
    logger.error("Error collecting sleep coin", {
      userId,
      error: err.message,
    })
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" })
  }
})

router.get("/work/last-click/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const process = await gameProcess.findOne(
      { id: parseInt(userId), type: 'work' },
      { "work_game.clicks": 1 }
    ).sort({ "work_game.clicks.clickedAt": -1 });

    if(!process) {
      return res.status(404).end()
    }

    if (!process.work_game.clicks.length) {
      return res.json({ lastClickedAt: null, remainingCooldown: 0 });
    }

    const lastClick = process.work_game?.clicks[0]?.clickedAt || 30;
    const COOLDOWN_MS = 30000; // 30 seconds
    const now = moment.tz(new Date(), "UTC"); // Server timezone (UTC for consistency)
    const lastClickMoment = moment.tz(lastClick, "UTC");
    const elapsedMs = now.diff(lastClickMoment);
    const remainingCooldown = Math.max(0, COOLDOWN_MS - elapsedMs);

    res.json({
      lastClickedAt: lastClick.toISOString(),
      remainingCooldown, // In milliseconds
    });
  } catch (error) {
    console.error(`Error fetching last click for user ${userId}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Collect coin
router.post("/work/boost-time/:userId", async (req, res) => {
  const userId = req.userId

  try {
    const process = await gameProcess.findOne({
      id: userId,
      type: "work",
    })
    if (!process) {
      return res
        .status(404)
        .json({ error: true, message: "No active sleep process" })
    }

    const now = moment()
    const elapsedSeconds = now.diff(moment(process.createdAt), 'seconds')
    const elapsedSecondsSinceLastBoost = process.lastBoostedTime ? now.diff(moment(process.lastBoostedTime), "seconds") : 30
    
    if(elapsedSecondsSinceLastBoost >= 30 - 5) {
      process.target_duration_in_seconds = Math.max(0, (process.target_duration_in_seconds || process.target_duration_in_seconds) - 10); 
      process.work_game?.clicks?.push({ clickedAt: now.toDate() })
      process.lastBoostedTime = now.toDate()
      await process.save()
    }

    logger.info("Work boost pressed", {
      userId,
      processId: process._id,
      newDuration: process.target_duration_in_seconds || process.base_duration_in_seconds,
    })

    return res.status(200).json({
      success: true,
      remainingSeconds: Math.max(
        0,
        (process.target_duration_in_seconds || process.base_duration_in_seconds) - elapsedSeconds
      ),
    })
  } catch (err) {
    logger.error("Error boosting work", {
      userId,
      error: err.message,
    })
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" })
  }
})

// Function to send a Telegram message to the owner about the neko boost
export const sendNekoBoostMessage = async (targetUserId, boostPercentage) => {
  try {
    // Use getChatMember to get the user's language
    let userLanguage = "en" // Default to English
    try {
      const chatMember = await bot.api.getChatMember(targetUserId, targetUserId)
      const languageCode = chatMember?.user?.language_code || "en"
      // Map language code to "en" or "ru"
      userLanguage = languageCode.startsWith("ru") ? "ru" : "en"
      logger.info("Fetched user language via getChatMember", {
        userId: targetUserId,
        chatId: targetUserId,
        languageCode,
        mappedLanguage: userLanguage,
      })
    } catch (error) {
      logger.warn(
        "Failed to fetch user language via getChatMember, defaulting to English",
        {
          userId: targetUserId,
          chatId: targetUserId,
          error: error.message,
        }
      )
    }

    // Localize the message based on the user's language
    let message
    if (userLanguage === "ru") {
      message = `Вы только что получили ${boostPercentage}% бонус к доходу от неко! 🐾`
    } else {
      message = `You've just received a ${boostPercentage}% income boost from neko! 🐾`
    }

    // Send the message
    await bot.api.sendMessage(targetUserId, message)
    logger.info("Telegram message sent to owner", {
      userId: targetUserId,
      chatId: targetUserId,
      message,
    })
  } catch (error) {
    logger.error("Failed to send Telegram message to owner", {
      userId: targetUserId,
      error: error.message,
    })
  }
}

// GET endpoint to calculate TRX earnings from referrals
router.get("/:userId/referral-earnings/", async (req, res) => {
  try {
    const userId = req.userId

    // Convert userId to number since it's stored as Number in the schema
    const numericUserId = Number(userId)

    if (isNaN(numericUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      })
    }

    // Aggregation pipeline
    const earningsData = await Referral.aggregate([
      // Stage 1: Match referrals where the user is the referrer
      {
        $match: {
          refer_id: numericUserId,
        },
      },

      // Stage 2: Lookup transactions for each referred user
      {
        $lookup: {
          from: "stars_transactions", // Must match the collection name in MongoDB
          localField: "referral_id",
          foreignField: "user_id",
          as: "transactions",
        },
      },

      // Stage 3: Unwind transactions array to process each transaction
      {
        $unwind: {
          path: "$transactions",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Stage 4: Filter for completed XTR transactions only
      {
        $match: {
          "transactions.currency": "XTR",
          "transactions.status": "complete",
        },
      },

      // Stage 5: Group and calculate totals
      {
        $group: {
          _id: "$refer_id",
          totalEarnings: {
            $sum: {
              $convert: {
                input: "$transactions.amount",
                to: "decimal",
                onError: 0,
                onNull: 0,
              },
            },
          },
          transactionCount: { $sum: 1 },
          referredUsers: { $addToSet: "$referral_id" },
        },
      },

      // Stage 6: Project the final shape of the data
      {
        $project: {
          _id: 0,
          referrerId: "$_id",
          totalEarnings: 1,
          transactionCount: 1,
          referredUserCount: { $size: "$referredUsers" },
        },
      },
    ])

    // If no earnings data found, return zero values
    const result = earningsData[0] || {
      referrerId: numericUserId,
      totalEarnings: 0,
      transactionCount: 0,
      referredUserCount: 0,
    }

    // Format the response
    res.status(200).json({
      success: true,
      data: {
        ...result,
        totalEarnings: result.totalEarnings.toString(), // Convert Decimal128 to string for JSON
        lastUpdated: new Date(),
      },
    })
  } catch (error) {
    console.error("Error calculating referral earnings:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
})

// Supply Endpoint
router.get("/nft/supply/:itemId", async (req, res) => {
  const { itemId } = req.params

  try {
    const availableSupply = await NFTItems.countDocuments({
      itemId: Number(itemId),
      status: "available",
    })
    res.json({ availableSupply })
  } catch (error) {
    console.error("Error fetching supply:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/:id/nft/shop", async (req, res) => {
  try {
    logger.info("Nft shop endpoint requested")
    const userId = req.userId
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid userId" })
    }

    const shelfItems = await ShelfItemModel.find(
      { type: "neko", id: { $not: { $in: [8] } } },
      { _id: false },
      { sort: { id: 1 } }
    )

    // Fetch supply for all shelf items in one query
    const shelfIds = shelfItems.map((item) => item.id)
    const supplyData = await NFTItems.aggregate([
      { $match: { itemId: { $in: shelfIds }, status: "available" } },
      { $group: { _id: "$itemId", availableSupply: { $sum: 1 } } },
    ])

    // Convert supply data to a lookup map for efficiency
    const supplyMap = supplyData.reduce((map, { _id, availableSupply }) => {
      map[_id] = availableSupply
      return map
    }, {})

    // Format shelf items with supply
    const formattedShelfItems = shelfItems.map((item) => ({
      id: item.id,
      productType: "shelf",
      name: item.name, // Assuming name is an object with language keys (e.g., { en: "Name" })
      image: item.link,
      price: item.cost.stars || item.cost.coins || 0,
      tonPrice: item.tonPrice || "0", // Default to "0" if not provided
      supply: supplyMap[item.id] || 0, // Use supply from map, default to 0 if not found
      category: "Shelf",
      isPrem: (item.cost.stars || 0) > 0,
      available: (item.cost.stars || 0) > 0 || (item.cost.coins || 0) === 0, // Simplified logic
      description: item.description, // Assuming description is an object with language keys
      respect: item.respect || 0,
    }))

    // Combine and return
    return res.status(200).json({
      shelf: formattedShelfItems,
    })
  } catch (err) {
    console.error("Failed to fetch shop items:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Transaction Details Endpoint
router.get("/nft/transaction-details", async (req, res) => {
  const { productId } = req.query
  const userId = req.userId

  if (!userId || !productId) {
    return res.status(400).json({ error: "userId and productId are required" })
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const nft = await NFTItems.findOneAndUpdate(
      { itemId: Number(productId), status: "available" },
      { status: "locked", memo: uuidv4(), lockedAt: new Date() },
      { new: true, session }
    )

    if (!nft) {
      await session.abortTransaction()
      return res.status(404).json({ error: "No available NFTs for this item" })
    }

    if (!nft.price) {
      await session.abortTransaction()
      return res.status(400).json({ error: "Price not defined for this NFT" })
    }

    const amount = toNano(nft.price + 0.05).toString()

    const affiliate = await Referal.findOne({ referral_id: userId })

    const transaction = new TONTransactions({
      user_id: Number(userId),
      currency: "TON",
      amount,
      product_type: "shelf",
      product_id: productId,
      memo: nft.memo,
      status: "awaiting_payment",
      affiliate_id: affiliate?.refer_id || null,
    })
    await transaction.save({ session })

    await session.commitTransaction()

    // Create payload with UUID as a comment
    const body = beginCell()
      .storeUint(0, 32) // 32-bit 0 opcode for comment
      .storeStringTail(nft.memo) // Use UUID as memo
      .endCell()

    const paymentRequest = {
      messages: [
        {
          address: "UQAyMah6BUuxR7D8HXt3hr0r2kbUgZ_kCOigjRnQj402WwY5",
          amount,
          payload: body.toBoc().toString("base64"), // Proper TON cell serialization
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 3600, // 1 hour
      network: "-239", // Mainnet
    }

    res.json({ paymentRequest })
  } catch (error) {
    console.error("Error generating transaction details:", error)
    await session.abortTransaction()
    res.status(500).json({ error: "Internal server error" })
  } finally {
    session.endSession()
  }
})

const SERVER_TIMEZONE = moment.tz.guess()
const investmentTypeKeys = Object.fromEntries(
  Object.entries(InvestmentTypes).map(([key, value]) => [value, key])
)

export const getAutoclaimStatus = async (userId) => {
  try {
    const now = new Date()

    // Find all active autoclaims for the user (not expired)
    const activeAutoclaims = await Autoclaims.find({
      userId,
      expiresAt: { $gt: now },
    })

    // Initialize result with all investment types set to inactive
    const status = {
      GameCenter: { is_active: false, active_until: null, tz: SERVER_TIMEZONE },
      ZooShop: { is_active: false, active_until: null, tz: SERVER_TIMEZONE },
      CoffeeShop: { is_active: false, active_until: null, tz: SERVER_TIMEZONE },
    }

    // Update status for each active autoclaim
    activeAutoclaims.forEach((autoclaim) => {
      const key = investmentTypeKeys[autoclaim.investmentType]
      if (key) {
        // Only update if investmentType matches a known key
        status[key] = {
          is_active: true,
          active_until: autoclaim.expiresAt,
          tz: SERVER_TIMEZONE,
        }
      }
    })

    logger.debug(`Retrieved autoclaim status for user ${userId}`, {
      status,
    })
    return status
  } catch (err) {
    logger.error(`Failed to get autoclaim status for user ${userId}`, {
      error: err.message,
      stack: err.stack,
    })
    throw err // Re-throw to handle in caller if needed
  }
}

router.get("/autoclaim-data", async (req, res) => {
  const userId = req.userId

  try {
    const status = await getAutoclaimStatus(userId)
    res.status(200).json(status)
  } catch (err) {
    logger.error(`Failed to get autoclaim status for user ${userId}`, {
      error: err.message,
      stack: err.stack,
    })

    res.status(500).end()
  }
})

router.get("/:id/affiliate-data", async (req, res) => {
  const userId = req.userId
  try {
    const data = await getAffiliateEarningsData(userId)
    const refsCount = await Referal.countDocuments({ refer_id: userId })

    const gameCenterLevel = gamecenterLevelMap[refsCount]
    const nextLevelGameCenter = gameCenterLevel + 1

    const currentLevelRefsRequired =
      gameCenterLevelRequirements[gameCenterLevel]
    const nextLevelRefsRequired =
      gameCenterLevelRequirements[nextLevelGameCenter] ||
      currentLevelRefsRequired

    logger.info(ansiColors.cyan("Affiliate data requested"), {
      userId,
      ...data,
      gameCenterLevel,
      refsCount,
      currentLevelRefsRequired,
      nextLevelRefsRequired,
    })

    return res.status(200).json({ ...data })
  } catch (err) {
    logger.error(`Failed to get autoclaim status for user ${userId}`, {
      error: err.message,
      stack: err.stack,
    })

    return res.status(500).send()
  }
})

router.get("/:id/affiliate-withdraw", async (req, res) => {
  const affiliateId = parseInt(req.params.id)

  try {
    if (!affiliateId) {
      return res.status(400).json({ error: "Affiliate ID is required" })
    }

    // Add withdrawal request to the queue
    const jobId = await queueAffiliateWithdrawal(affiliateId)

    return res.status(202).json({
      message: "Withdrawal request queued successfully",
      jobId,
      affiliateId,
    })
  } catch (error) {
    console.error("Error queuing withdrawal:", error.message)
    if (error.message.includes("Withdrawal already in progress")) {
      return res.status(409).json({ error: "Already in progess" }) // 409 Conflict
    }
    return res.status(500).json({ error: "Failed to queue withdrawal request" })
  }
})

export default router
