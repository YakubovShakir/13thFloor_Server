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
import UserCheckInsModel from "../../models/user/userCheckInsModel.js"
import { ActiveEffectsModel, ActiveEffectTypes } from "../../models/effects/activeEffectsModel.js"
import { ActionLogModel, ActionTypes } from "../../models/effects/actionLogModel.js"

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
    id: 23,
    type: "clothes",
    chance_premium: 1,
    chance_daily: 1,
  },
  {
    id: 28,
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

const dailyRewardsPool = [
  { day: 1, type: "coins", amount: 10, image: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/icons/shittonsmoney.png", name: { ru: "10 Монет", en: "10 Coins" } },
  { day: 2, type: "coins", amount: 25, image: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/icons/shittonsmoney.png", name: { ru: "25 Монет", en: "25 Coins" } },
  { day: 3, type: "coins", amount: 50, image: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/icons/shittonsmoney.png", name: { ru: "50 Монет", en: "50 Coins" } },
  { day: 4, type: "boost", id: 1, name: { en: "Boost" } },
  { day: 5, type: "clothes", id: 1, name: { en: "Clothes" } },
  { day: 6, type: "coins", amount: 100, image: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/icons/shittonsmoney.png", name: { ru: "100 Монет", en: "100 Coins" } },
  { day: 7, type: "boost", id: 2, name: { en: "Boost" } },
  { day: 8, type: "coins", amount: 150, image: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/icons/shittonsmoney.png", name: { ru: "150 Монет", en: "150 Coins" } },
  { day: 9, type: "clothes", id: 2, name: { en: "Clothes" } },
  { day: 10, type: "boost", id: 3, name: { en: "Boost" } },
  { day: 11, type: "coins", amount: 200, image: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/icons/shittonsmoney.png", name: { ru: "200 Монет", en: "200 Coins" } },
  { day: 12, type: "clothes", id: 3, name: { en: "Clothes" } },
  { day: 13, type: "boost", id: 4, name: { en: "Boost" } },
  { day: 14, type: "coins", amount: 300, image: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/icons/shittonsmoney.png", name: { ru: "300 Монет", en: "300 Coins" } },
];

router.get("/:id/daily/check-in", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastCheckIn = await UserCheckInsModel.findOne(
      { user_id: userId, is_claimed: true },
      { check_in_date: 1, streak: 1 },
      { sort: { check_in_date: -1 } }
    );

    if (lastCheckIn && lastCheckIn.check_in_date >= today) {
      return res.status(403).json({ error: "Already checked in today" });
    }

    let streak = 1;
    if (lastCheckIn) {
      const lastDate = new Date(lastCheckIn.check_in_date);
      lastDate.setHours(0, 0, 0, 0);
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      if (lastDate.getTime() === yesterday.getTime()) {
        streak = lastCheckIn.streak + 1;
      }
    }

    if (streak > 14) streak = 1; // Reset to 1 after 14 days

    const checkIn = new UserCheckInsModel({
      user_id: userId,
      check_in_date: today,
      streak,
      last_check_in: lastCheckIn ? lastCheckIn.check_in_date : null,
    });
    await checkIn.save();

    const reward = dailyRewardsPool.find((item) => item.day === streak);

    res.status(200).json({ streak, canClaim: true, nextReward: reward });
  } catch (error) {
    await log("error", "error in daily check-in", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id/daily/claim", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkIn = await UserCheckInsModel.findOne({
      user_id: userId,
      check_in_date: { $gte: today },
      is_claimed: false,
    });

    if (!checkIn) {
      return res.status(403).json({ error: "No unclaimed check-in available" });
    }

    const selectedItem = dailyRewardsPool.find((item) => item.day === checkIn.streak);
    if (!selectedItem) {
      return res.status(500).json({ error: "No reward defined for this day" });
    }

    let wonItem;
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    switch (selectedItem.type) {
      case "coins":
        wonItem = {
          id: selectedItem.id,
          type: selectedItem.type,
          image: selectedItem.image,
          name: selectedItem.name,
          amount: selectedItem.amount,
        };
        await upUserBalance(userId, wonItem.amount);
        break;
      case "boost":
        const boost = await Boost.findOne({ boost_id: selectedItem.id });
        wonItem = {
          id: selectedItem.id,
          type: selectedItem.type,
          image: boost.link,
          name: boost.name,
        };
        await new UserBoost({ id: userId, boost_id: wonItem.id }).save();
        break;
      case "clothes":
        const clothes = await Clothing.findOne({ clothing_id: selectedItem.id });
        wonItem = {
          id: selectedItem.id,
          type: selectedItem.type,
          image: user.personage.gender === "male" ? clothes.male_icon : clothes.female_icon,
          name: clothes.name,
        };
        await UserCurrentInventory.updateOne(
          { user_id: userId },
          { $addToSet: { clothes: { id: wonItem.id } } }
        );
        break;
      default:
        return res.status(400).json({ error: "Invalid item type" });
    }

    await UserCheckInsModel.updateOne({ _id: checkIn._id }, { $set: { is_claimed: true } });

    res.status(200).json({ wonItem, streak: checkIn.streak });
  } catch (error) {
    await log("error", "error in claiming daily reward", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id/daily/status", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastCheckIn = await UserCheckInsModel.findOne(
      { user_id: userId },
      { check_in_date: 1, streak: 1, is_claimed: 1 },
      { sort: { check_in_date: -1 } }
    );

    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch metadata for all items in dailyRewardsPool
    const resolvedRewards = [];
    for (const item of dailyRewardsPool) {
      let fullItem;
      switch (item.type) {
        case "boost":
          const boost = await Boost.findOne({ boost_id: item.id });
          fullItem = {
            day: item.day,
            id: item.id,
            type: item.type,
            image: boost?.link || "path/to/default-icon.png",
            name: boost?.name || { en: "Boost" }, // Fallback if boost not found
          };
          break;
        case "clothes":
          const clothes = await Clothing.findOne({ clothing_id: item.id });
          fullItem = {
            day: item.day,
            id: item.id,
            type: item.type,
            image:
              user.personage.gender === "male"
                ? clothes?.male_icon
                : clothes?.female_icon || "path/to/default-icon.png",
            name: clothes?.name || { en: "Clothes" }, // Fallback if clothes not found
          };
          break;
        case "coins":
          fullItem = {
            day: item.day,
            id: item.id,
            type: item.type,
            image: item.image,
            name: item.name,
            amount: item.amount,
          };
          break;
        default:
          continue; // Skip invalid items
      }
      resolvedRewards.push(fullItem);
    }

    let streak = 0;
    let canClaim = true;
    let hasCheckedInToday = false;
    let nextReward = resolvedRewards[0];

    if (lastCheckIn) {
      const isToday = lastCheckIn.check_in_date >= today;
      hasCheckedInToday = isToday;
      canClaim = isToday && !lastCheckIn.is_claimed;
      streak = lastCheckIn.streak;
      const nextStreak = hasCheckedInToday ? streak : streak + 1;
      nextReward = resolvedRewards.find((item) => item.day === (nextStreak > 14 ? 1 : nextStreak));
    }

    res.status(200).json({
      streak,
      canClaim,
      hasCheckedInToday,
      nextReward,
      rewards: resolvedRewards, // Fully resolved items with metadata
    });
  } catch (error) {
    await log("error", "error in fetching daily status", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/time", (req, res) =>
  res.status(200).json({ server_time: new Date() })
)

//!TODO move to different place
router.get("/leaderboard", getLeaderboard)

// Constants
const COOLDOWN_HOURS = 24;
const COOLDOWN_MS = COOLDOWN_HOURS * 60 * 60 * 1000; // 24 hours in milliseconds
const EFFECT_DURATION_MS = 60 * 60 * 1000; // 1 hour in milliseconds

// Helper function to check if cooldown has expired
const isCooldownExpired = (lastActionTimestamp) => {
  const now = new Date();
  return (now - lastActionTimestamp) >= COOLDOWN_MS;
};

// Helper function to get boost percentage from effect type
//! add checks!!!!!!!
export const getActiveEffectTypeByNekoId = (id) => {
  if(id === 8) {
    return ActiveEffectTypes.BasicNekoBoost
  } else if(id > 8) {
    return ActiveEffectTypes.NftNekoBoost
  }

  return null
}
export const getBoostPercentageFromType = (type) => {
  switch (type) {
    case ActiveEffectTypes.BasicNekoBoost:
      return 5;
    case ActiveEffectTypes.NftNekoBoost:
      return 10;
    default:
      return 0;
  }
};

// Service functions

// Check user's clicking cooldown (Home page)
export const getUserNekoState = async (userId) => {
  try {
    const lastAction = await ActionLogModel.findOne(
      { triggered_by: userId, action_type: ActionTypes.NekoInteract },
      null,
      { sort: { action_timestamp: -1 } }
    );
    const canClick = !lastAction || isCooldownExpired(lastAction.action_timestamp);
    const cooldownUntil = lastAction && !canClick
      ? new Date(lastAction.action_timestamp.getTime() + COOLDOWN_MS)
      : null;

    return {
      canClick,
      cooldownUntil,
    };
  } catch (error) {
    console.error(`Error fetching neko state for user ${userId}:`, error);
    throw error;
  }
};

// Check interaction state (ForeignHome page)
export const getNekoInteractionState = async (userId, targetUserId) => {
  try {
    // Check user's clicking cooldown
    const lastUserAction = await ActionLogModel.findOne(
      { triggered_by: userId, action_type: ActionTypes.NekoInteract },
      null,
      { sort: { action_timestamp: -1 } }
    );
    const userCanClick = !lastUserAction || isCooldownExpired(lastUserAction.action_timestamp);
    const userCooldownUntil = lastUserAction && !userCanClick
      ? new Date(lastUserAction.action_timestamp.getTime() + COOLDOWN_MS)
      : null;

    if (!userCanClick) {
      return {
        canClick: false,
        cooldownUntil: userCooldownUntil,
        whoseCooldown: 'user',
      };
    }

    // Check target user's neko cooldown
    const lastTargetAction = await ActionLogModel.findOne(
      { user_id: targetUserId, action_type: ActionTypes.NekoInteract },
      null,
      { sort: { action_timestamp: -1 } }
    );
    const targetCanBeClicked = !lastTargetAction || isCooldownExpired(lastTargetAction.action_timestamp);
    const targetCooldownUntil = lastTargetAction && !targetCanBeClicked
      ? new Date(lastTargetAction.action_timestamp.getTime() + COOLDOWN_MS)
      : null;

    return {
      canClick: targetCanBeClicked,
      cooldownUntil: targetCooldownUntil,
      whoseCooldown: targetCanBeClicked ? null : 'target',
    };
  } catch (error) {
    console.error(`Error fetching interaction state for user ${userId} on target ${targetUserId}:`, error);
    throw error;
  }
};

export const interactWithNeko = async (userId, targetUserId) => {
  try {
    if(userId === targetUserId || !targetUserId) {
      throw new Error("Cannot interact with yourself or nobody");
    }
    // Check both cooldowns
    const userState = await getUserNekoState(userId);
    const interactionState = await getNekoInteractionState(userId, targetUserId);
    if (!userState.canClick) {
      throw new Error("You are still on cooldown from clicking a neko");
    }
    if (!interactionState.canClick) {
      throw new Error("This user's neko is still on cooldown from being clicked");
    }

    // Fetch the target user's neko
    const targetUser = await User.findOne({ id: targetUserId }, { "shelf.neko": 1 });
    if (!targetUser) {
      throw new Error("Target user not found");
    }
    const nekoId = targetUser?.shelf?.neko || null;
    const activeEffectType = getActiveEffectTypeByNekoId(nekoId)
    const boostPercentage = getBoostPercentageFromType(activeEffectType);

    // Log the interaction
    const now = new Date();
    const newAction = new ActionLogModel({
      user_id: targetUserId, // Target whose neko was clicked
      action_type: ActionTypes.NekoInteract,
      action_timestamp: now,
      metadata: { nekoId, boostPercentage, activeEffectType, clickedBy: userId },
      triggered_by: userId,
    });
    await newAction.save();

    // Remove existing neko boosts for both users
    await Active.deleteMany({
      user_id: { $in: [userId, targetUserId] },
      type: { $in: [ActiveEffectTypes.BasicNekoBoost, ActiveEffectTypes.NftNekoBoost] },
    });

    // Create active effect for the clicking user
    const userEffect = new ActiveEffectsModel({
      user_id: userId,
      type: boostType,
      valid_until: new Date(now.getTime() + EFFECT_DURATION_MS),
      triggered_by: userId,
    });
    await userEffect.save();

    // Create active effect for the target user (if different)
    if (userId !== targetUserId) {
      const targetEffect = new ActiveEffectsModel({
        user_id: targetUserId,
        type: boostType,
        valid_until: new Date(now.getTime() + EFFECT_DURATION_MS),
        triggered_by: userId,
      });
      await targetEffect.save();
    }

    await log("info", "Neko interacted", {
      userId,
      targetUserId,
      nekoId,
      boostPercentage,
      boostType,
      cooldownUntil: new Date(now.getTime() + COOLDOWN_MS),
    });

    return { cooldownUntil: new Date(now.getTime() + COOLDOWN_MS) };
  } catch (error) {
    console.error(`Error interacting with neko for user ${userId} on target ${targetUserId}:`, error);
    throw error;
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
    });
    await action.save();
    return action;
  } catch (error) {
    console.error(`Error logging action ${actionType} for user ${userId}:`, error);
    throw error;
  }
};

// Route for Home page: Get user's clicking cooldown
router.get('/neko/user-state/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const state = await getUserNekoState(userId);
    res.json(state);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user neko state' });
  }
});

// Route for ForeignHome page: Get interaction state
router.post('/neko/interaction-state', async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;
    if (!userId || !targetUserId) {
      return res.status(400).json({ error: 'Both userId and targetUserId are required' });
    }
    const parsedUserId = parseInt(userId);
    const parsedTargetUserId = parseInt(targetUserId);
    const state = await getNekoInteractionState(parsedUserId, parsedTargetUserId);
    res.json(state);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch neko interaction state' });
  }
});

// Route to interact with a target user's neko
router.post('/neko/interact', async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;
    if (!userId || !targetUserId) {
      return res.status(400).json({ error: 'Both userId and targetUserId are required' });
    }
    const parsedUserId = parseInt(userId);
    const parsedTargetUserId = parseInt(targetUserId);
    const result = await interactWithNeko(parsedUserId, parsedTargetUserId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to interact with neko' });
  }
});

export default router
