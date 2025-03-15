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
import { UserSpins } from "../../models/user/userSpinsModel.js"
import { log } from "../../utils/log.js"
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
import ShelfItemModel from "../../models/shelfItem/shelfItemModel.js"

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
    chance_premium: 15,
    chance_daily: 20,
    prize_equivalent: {
      type: "coins",
      amount: 100
    }
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
    chance_daily: 4,
  },
  {
    id: 4,
    type: "coins",
    chance: 1,
    amount: 250,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins2.webp",
    name: { ru: "250 Монет", en: "250 Coins" },
    chance_premium: 3,
    chance_daily: 5,
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
    chance_daily: 10,
    prize_equivalent: {
      type: "coins",
      amount: 100
    }
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
      amount: 100
    }
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
    chance_premium: 15,
    chance_daily: 10,
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
    chance_premium: 2,
    chance_daily: 8,
  },
  {
    id: 51,
    type: "clothes",
    chance_premium: 20,
    chance_daily: 15,
    prize_equivalent: {
      type: "coins",
      amount: 100
    }
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
    chance_premium: 7,
    chance_daily: 5,
  },
  {
    id: 8,
    type: "shelf",
    chance_premium: 1,
    chance_daily: 3,
    prize_equivalent: {
      type: "coins",
      amount: 100
    }
  },
]

router.get("/:id/gacha/items", async (req, res) => {
  const result = []

  const userId = parseInt(req.params.id)
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
    const userId = parseInt(req.params.id)
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
    await log("error", "error in fetching gacha attempts", error)

    return res.status(500).send()
  }
})

router.get("/:id/gacha/spin", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const attempts = await UserSpins.find(
      { user_id: userId, is_used: false },
      { _id: 1, type: 1 },
      { sort: { createdAt: -1 }, limit: 1 }
    );

    if (!attempts.length) {
      return res.status(403).json({ error: "Not enough spins" });
    }

    const attempt = attempts[0];
    const spinType = attempt.type;
    const chanceField = spinType === "daily" ? "chance_daily" : "chance_premium";
    const totalWeight = itemsPoolRaw.reduce((sum, item) => sum + item[chanceField], 0);

    const randomValue = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    let selectedItem;

    for (const item of itemsPoolRaw) {
      cumulativeWeight += item[chanceField];
      if (randomValue <= cumulativeWeight) {
        selectedItem = item;
        break;
      }
    }

    if (!selectedItem) selectedItem = itemsPoolRaw[itemsPoolRaw.length - 1];

    const user = await User.findOne({ id: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    let wonItem;
    let burnedTo = null; // What the item was burned into, if applicable

    switch (selectedItem.type) {
      case "boost":
        const boost = await Boost.findOne({ boost_id: selectedItem.id });
        wonItem = { id: selectedItem.id, type: "boost", image: boost.link, name: boost.name };
        await new UserBoost({ id: userId, boost_id: wonItem.id }).save();
        break;
      case "clothes":
        const clothes = await Clothing.findOne({ clothing_id: selectedItem.id });
        wonItem = {
          id: selectedItem.id,
          type: "clothes",
          image: user.personage.gender === "male" ? clothes.male_icon : clothes.female_icon,
          name: clothes.name,
        };
        const userInventoryClothes = await UserCurrentInventory.findOne({ user_id: userId });
        const isDuplicateClothes = userInventoryClothes?.clothes.some(c => c.id === wonItem.id);
        if (isDuplicateClothes && selectedItem.prize_equivalent) {
          burnedTo = selectedItem.prize_equivalent;
          if (burnedTo.type === "coins") {
            await upUserBalance(userId, burnedTo.amount);
            burnedTo.image = "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins3.webp"; // Assuming a static coin image from Assets
          } else if (burnedTo.type === "boost") {
            const burnedBoost = await Boost.findOne({ boost_id: burnedTo.amount });
            await new UserBoost({ id: userId, boost_id: burnedTo.amount }).save();
            burnedTo.image = burnedBoost.link; // Actual boost image
            burnedTo.name = burnedBoost.name; // Boost name for display
          }
        } else {
          await UserCurrentInventory.updateOne(
            { user_id: userId },
            { $addToSet: { clothes: { id: wonItem.id } } }
          );
        }
        break;
      case "coins":
        wonItem = {
          id: selectedItem.id,
          type: "coins",
          image: selectedItem.image || "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins3.webp", // Use item-specific or default coin image
          name: selectedItem.name,
          amount: selectedItem.amount,
        };
        await upUserBalance(userId, wonItem.amount);
        break;
      case "shelf":
        const shelfItem = await ShelfItemModel.findOne({ id: selectedItem.id });
        wonItem = { id: selectedItem.id, type: "shelf", image: shelfItem.link, name: shelfItem.name };
        const userInventoryShelf = await UserCurrentInventory.findOne({ user_id: userId });
        const isDuplicateShelf = userInventoryShelf?.shelf.some(s => s.id === wonItem.id);
        if (isDuplicateShelf && selectedItem.prize_equivalent) {
          burnedTo = selectedItem.prize_equivalent;
          if (burnedTo.type === "coins") {
            await upUserBalance(userId, burnedTo.amount);
            burnedTo.image = "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins3.webp"; // Coin image
          } else if (burnedTo.type === "boost") {
            const burnedBoost = await Boost.findOne({ boost_id: burnedTo.amount });
            await new UserBoost({ id: userId, boost_id: burnedTo.amount }).save();
            burnedTo.image = burnedBoost.link; // Actual boost image
            burnedTo.name = burnedBoost.name; // Boost name
          }
        } else {
          await UserCurrentInventory.updateOne(
            { user_id: userId },
            { $addToSet: { shelf: { id: wonItem.id } } }
          );
        }
        break;
      default:
        return res.status(400).json({ error: "Invalid item type" });
    }

    await UserSpins.updateOne(
      { _id: attempt._id },
      { $set: { is_used: true } }
    );

    res.status(200).json({
      wonItem, // Always return the won item for roulette display
      burnedTo, // Prize if burned, including image
    });
  } catch (error) {
    console.error("Error in gacha spin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
  {
    day: 3,
    type: "coins",
    amount: 300,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins3.webp",
    name: { ru: "300 Монет", en: "300 Coins" },
  },
  { day: 4, type: "boost", id: 2, name: { en: "Boost" } },
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
    amount: 5000,
    image:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Coins%2FCoins5.webp",
    name: { ru: "5000 Монет", en: "5000 Coins" },
  },
]

// Helper function to get the start of the day in the server's local timezone
const getStartOfDay = () => {
  const now = moment() // Uses server's local timezone
  const startOfDay = now.startOf("day") // 00:00:00 in local timezone
  return startOfDay
}

// Helper function to create a date that MongoDB will store as YYYY-MM-DD 00:00:00.000+00:00
const createMongoDate = (momentDate) => {
  // Get the year, month, and day in the server's local timezone
  const year = momentDate.year()
  const month = momentDate.month() // 0-11
  const day = momentDate.date()

  // Create a new Date object in UTC with the same year, month, and day
  // This ensures MongoDB stores it as YYYY-MM-DD 00:00:00.000+00:00
  const mongoDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0))
  return mongoDate
}

// Claim Reward Endpoint
router.get("/:id/daily/claim", async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    // Get the start of the day in the server's local timezone
    const todayMoment = getStartOfDay()
    const today = todayMoment.toDate()

    // Check if user has claimed today
    const lastClaim = await UserCheckInsModel.findOne(
      { user_id: userId, is_claimed: true },
      { check_in_date: 1, streak: 1 },
      { sort: { check_in_date: -1 } }
    )

    // Log for debugging
    console.log("Server timezone offset (minutes):", moment().utcOffset())
    console.log("Today (local):", todayMoment.format())
    console.log(
      "Last claim date:",
      lastClaim ? lastClaim.check_in_date : "None"
    )

    if (
      lastClaim &&
      moment(lastClaim.check_in_date).isSameOrAfter(today, "day")
    ) {
      return res.status(403).json({ error: "Reward already claimed today" })
    }

    // Calculate streak
    let streak = 1
    if (lastClaim) {
      const lastDate = moment(lastClaim.check_in_date).startOf("day")
      const yesterday = moment(today).subtract(1, "day").startOf("day")

      if (lastDate.isSame(yesterday, "day")) {
        streak = lastClaim.streak + 1
      }
    }
    if (streak > 14) streak = 1 // Reset after 14 days

    // Find reward for the current streak
    const selectedItem = dailyRewardsPool.find((item) => item.day === streak)
    if (!selectedItem) {
      return res.status(500).json({ error: "No reward defined for this day" })
    }

    const user = await User.findOne({ id: userId })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
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
      case "shelf":
        const item = await ShelfItemModel.findOne({ id: selectedItem.id })
        wonItem = {
          id: selectedItem.id,
          type: selectedItem.type,
          image: item.link,
          name: item.name,
        }
        await UserCurrentInventory.updateOne(
          { user_id: userId },
          { $addToSet: { shelf: { id: wonItem.id } } }
        )
        break
      default:
        return res.status(400).json({ error: "Invalid item type" })
    }

    // Create a date that MongoDB will store as YYYY-MM-DD 00:00:00.000+00:00
    const mongoDate = createMongoDate(todayMoment)

    // Log the date we're saving
    console.log("Date to save in MongoDB:", mongoDate)

    // Record the claim
    const claim = new UserCheckInsModel({
      user_id: userId,
      check_in_date: mongoDate,
      streak,
      is_claimed: true,
      last_check_in: lastClaim ? lastClaim.check_in_date : null,
    })
    await claim.save()

    res.status(200).json({ wonItem, streak })
  } catch (error) {
    await log("error", "error in claiming daily reward", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Status Endpoint
router.get("/:id/daily/status", async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    // Get the start of the day in the server's local timezone
    const todayMoment = getStartOfDay()
    const today = todayMoment.toDate()

    const lastClaim = await UserCheckInsModel.findOne(
      { user_id: userId },
      { check_in_date: 1, streak: 1 },
      { sort: { check_in_date: -1 } }
    )

    const user = await User.findOne({ id: userId })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Resolve rewards metadata
    const resolvedRewards = await Promise.all(
      dailyRewardsPool.map(async (item) => {
        switch (item.type) {
          case "boost":
            const boost = await Boost.findOne({ boost_id: item.id })
            return {
              ...item,
              image: boost?.link || "default.png",
              name: boost?.name || item.name,
            }
          case "clothes":
            const clothes = await Clothing.findOne({ clothing_id: item.id })
            return {
              ...item,
              image:
                user.personage.gender === "male"
                  ? clothes?.male_icon
                  : clothes?.female_icon || "default.png",
              name: clothes?.name || item.name,
            }
          case "coins":
            return { ...item }
          default:
            return null
        }
      })
    ).then((results) => results.filter(Boolean))

    let streak = 0
    let canClaim = true
    let nextReward = resolvedRewards[0]

    if (lastClaim) {
      const lastClaimMoment = moment(lastClaim.check_in_date)
      const isToday = lastClaimMoment.isSame(today, "day")
      streak = lastClaim.streak
      canClaim = !isToday
      const nextStreak = isToday ? streak : streak + 1
      nextReward = resolvedRewards.find(
        (item) => item.day === (nextStreak > 14 ? 1 : nextStreak)
      )
    }

    res.status(200).json({
      streak,
      canClaim,
      nextReward,
      rewards: resolvedRewards,
    })
  } catch (error) {
    await log("error", "error in fetching daily status", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/time", (req, res) =>
  res.status(200).json({ server_time: new Date() })
)

//!TODO move to different place
router.get("/leaderboard", getLeaderboard)

// Constants
const COOLDOWN_HOURS = 24
const COOLDOWN_MS = COOLDOWN_HOURS * 60 * 60 * 1000 // 24 hours in milliseconds
const EFFECT_DURATION_MS = 60 * 60 * 1000 // 1 hour in milliseconds

// Helper function to check if cooldown has expired
const isCooldownExpired = (lastActionTimestamp) => {
  const now = new Date()
  return now - lastActionTimestamp >= COOLDOWN_MS
}

// Helper function to get boost percentage from effect type
//! add checks!!!!!!!
export const getActiveEffectTypeByNekoId = (id) => {
  if (id === 8) {
    return ActiveEffectTypes.BasicNekoBoost
  } else if (id > 8) {
    return ActiveEffectTypes.NftNekoBoost
  }

  return null
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

// Service functions

// Check user's clicking cooldown (Home page)
export const getUserNekoState = async (userId) => {
  try {
    const lastAction = await ActionLogModel.findOne(
      { triggered_by: userId, action_type: ActionTypes.NekoInteract },
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
      incomeBoostPercentage: lastAction
        ? lastAction?.metadata.activeEffectType ===
          ActiveEffectTypes.BasicNekoBoost
          ? 5
          : 10
        : 0,
    }
  } catch (error) {
    console.error(`Error fetching neko state for user ${userId}:`, error)
    throw error
  }
}

// Check interaction state (ForeignHome page)
export const getNekoInteractionState = async (userId, targetUserId) => {
  try {
    // Check user's clicking cooldown
    const lastUserAction = await ActionLogModel.findOne(
      { triggered_by: userId, action_type: ActionTypes.NekoInteract },
      null,
      { sort: { action_timestamp: -1 } }
    )
    const userCanClick =
      !lastUserAction || isCooldownExpired(lastUserAction.action_timestamp)
    const userCooldownUntil =
      lastUserAction && !userCanClick
        ? new Date(lastUserAction.action_timestamp.getTime() + COOLDOWN_MS)
        : null

    if (!userCanClick) {
      return {
        canClick: false,
        cooldownUntil: userCooldownUntil,
        whoseCooldown: "user",
      }
    }

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
  try {
    if (userId === targetUserId || !targetUserId) {
      throw new Error("Cannot interact with yourself or nobody")
    }
    // Check both cooldowns
    const userState = await getUserNekoState(userId)
    const interactionState = await getNekoInteractionState(userId, targetUserId)
    if (!userState.canClick) {
      throw new Error("You are still on cooldown from clicking a neko")
    }
    if (!interactionState.canClick) {
      throw new Error(
        "This user's neko is still on cooldown from being clicked"
      )
    }

    // Fetch the target user's neko
    const targetUser = await User.findOne(
      { id: targetUserId },
      { "shelf.neko": 1 }
    )
    if (!targetUser) {
      throw new Error("Target user not found")
    }
    const nekoId = targetUser?.shelf?.neko || null
    const activeEffectType = getActiveEffectTypeByNekoId(nekoId)
    const boostPercentage = getBoostPercentageFromType(activeEffectType)

    // Log the interaction
    const now = new Date()
    const newAction = new ActionLogModel({
      user_id: targetUserId, // Target whose neko was clicked
      action_type: ActionTypes.NekoInteract,
      action_timestamp: now,
      metadata: {
        nekoId,
        boostPercentage,
        activeEffectType,
        clickedBy: userId,
      },
      triggered_by: userId,
    })
    await newAction.save()

    // Create active effect for users the clicking user
    const userEffect = new ActiveEffectsModel({
      user_id: targetUserId,
      type: activeEffectType,
      valid_until: new Date(now.getTime() + EFFECT_DURATION_MS),
      triggered_by: userId,
    })
    await userEffect.save()

    await log("info", "Neko interacted", {
      userId,
      targetUserId,
      nekoId,
      boostPercentage,
      boostType: activeEffectType,
      cooldownUntil: new Date(now.getTime() + COOLDOWN_MS),
    })

    return { cooldownUntil: new Date(now.getTime() + COOLDOWN_MS) }
  } catch (error) {
    console.error(
      `Error interacting with neko for user ${userId} on target ${targetUserId}:`,
      error
    )
    throw error
  }
}

// Generic function to log any action
export const logAction = async (userId, actionType, metadata = {}) => {
  try {
    const action = new ActionLogModel({
      user_id: userId,
      action_type: actionType,
      action_timestamp: new Date(),
      metadata,
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

// Route for Home page: Get user's clicking cooldown
router.get("/neko/user-state/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const state = await getUserNekoState(userId)
    res.json(state)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user neko state" })
  }
})

// Route for ForeignHome page: Get interaction state
router.post("/neko/interaction-state", async (req, res) => {
  try {
    const { userId, targetUserId } = req.body
    if (!userId || !targetUserId) {
      return res
        .status(400)
        .json({ error: "Both userId and targetUserId are required" })
    }
    const parsedUserId = parseInt(userId)
    const parsedTargetUserId = parseInt(targetUserId)
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
    const { userId, targetUserId } = req.body
    if (!userId || !targetUserId) {
      return res
        .status(400)
        .json({ error: "Both userId and targetUserId are required" })
    }
    const parsedUserId = parseInt(userId)
    const parsedTargetUserId = parseInt(targetUserId)
    const result = await interactWithNeko(parsedUserId, parsedTargetUserId)
    res.json(result)
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Failed to interact with neko" })
  }
})

export default router
