import User from "../../models/user/userModel.js"
import Referal from "../../models/referral/referralModel.js"
import LevelsParamters from "../../models/level/levelParametersModel.js"
import UserClothing from "../../models/user/userClothingModel.js"
import UserCurrentInventory from "../../models/user/userInventoryModel.js"
import Clothing from "../../models/clothing/clothingModel.js"
import ShelfItems from "../../models/shelfItem/shelfItemModel.js"
import UserParameters from "../../models/user/userParametersModel.js"
import _fetch from "isomorphic-fetch"
import Boost from "../../models/boost/boostModel.js"
import ShelfItemModel from "../../models/shelfItem/shelfItemModel.js"
import Investments from "../../models/investments/investmentModel.js"
import { InvestmentTypes } from "../../models/investments/userLaunchedInvestments.js"
import UserLaunchedInvestments from "../../models/investments/userLaunchedInvestments.js"
import moment from "moment-timezone"
import Tasks from "../../models/tasks/taskModel.js"
import CompletedTasks from "../../models/tasks/completedTask.js"
import { Bot } from "grammy"
import Work from "../../models/work/workModel.js"
import fs from 'fs/promises'

import { upUserExperience } from "../../utils/userParameters/upUserBalance.js"
import { recalcValuesByParameters } from "../../utils/parametersDepMath.js"
import UserSkill from "../../models/user/userSkillModel.js"
import { UserSpins } from "../../models/user/userSpinsModel.js"

export function calculateGamecenterLevel(refsCount) {
  const levels = Object.keys(gamecenterLevelMap).map(Number).sort((a, b) => a - b); // Ensure sorted order
  let low = 0;
  let high = levels.length - 1;

  if (refsCount < levels[0]) return 0; // Below first threshold

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const threshold = levels[mid];

    if (refsCount < threshold) {
      high = mid - 1;
    } else if (refsCount >= threshold && (mid === levels.length - 1 || refsCount < levels[mid + 1])) {
      return gamecenterLevelMap[threshold]; // Found the correct level
    } else {
      low = mid + 1;
    }
  }

  // If we exit the loop, return the highest level (shouldn't happen with proper map)
  return gamecenterLevelMap[levels[levels.length - 1]];
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

const gameCenterLevelRequirements = {
  '1': 1,
  '2': 5,
  '3': 10,
  '4': 25,
  '5': 40,
  '6': 60,
  '7': 90,
  '8': 200,
  '9': 300,
  '10': 450,
  '11': 500,
  '12': 750,
  '13': 1000,
  '14': 1500,
  '15': 2250,
  '16': 2500,
  '17': 3750,
  '18': 5500,
  '19': 8250,
  '20': 10000,
  '21': 15000,
  '22': 22500,
  '23': 33750,
  '24': 50000,
  '25': 75000,
  '26': 112500,
  '27': 168750,
  '28': 253130,
  '29': 379700,
  '30': 569550,
  '31': 854330,
  '32': 1281500,
  '33': 1922250,
  '34': 2883380,
  '35': 4325070
}

export const prebuildInitialInventory = async (user_id) => {
  await new UserCurrentInventory({
    user_id,
    shelf:
      process.env.NODE_ENV === "test"
        ? [{ id: 1 }, { id: 2 }, { id: 5 }, { id: 8 }]
        : [],
    // all tier 0 items, no offence
    clothes: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 6,
      },
      {
        id: 7,
      },
    ],
    boosts: [],
  }).save()
}

export const getUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)

    if (userId) {
      const user = await User.findOne({ id: userId })
      if (user)
        return res.status(200).json({
          userId: user.id,
          prestart: user.prestart,
          personage: user.personage || null,
        })
    }

    return res.status(500).json({ error: true })
  } catch (e) {
    console.log("Error while get user ", e)
    return res.status(404).json({ message: "User not found" })
  }
}

export const createUserPersonage = async (req, res) => {
  try {
    //
    const userId = parseInt(req.params.id)
    const { race, gender } = req.body

    if (!userId) {
      return res.status(400).json({ error: true })
    }

    const refs = await Referal.countDocuments({ refer_id: userId })
    const gameCenterLevel = refs > 0 ? calculateGamecenterLevel(refs) : 0
    
    await User.updateOne(
      {
        id: userId,
      },
      {
        $set: {
          personage: {
            race,
            gender,
          },
          investment_levels: {
            game_center: gameCenterLevel,
            coffee_shop: 0,
            zoo_shop: 0,
          },
        },
      }
    )
    let userParam = await UserParameters.findOne({ id: userId })
    if (userParam) {
      userParam.work_id = 1
    } else {
      userParam = new UserParameters({ id: userId })
    }
    await userParam.save()

    if (gameCenterLevel > 0) {
      const investment = await Investments.findOne({
        type: "game_center",
        level: gameCenterLevel,
      })
      await new UserLaunchedInvestments({
        user_id: userId,
        investment_id: investment.id,
        to_claim: investment.coins_per_hour,
      }).save()
      userParam.respect += investment.respect
      await userParam.save()
    }

    const getInitialHatByRace = (race) => {
      const map = {
        white: 2,
        black: 4,
        asian: 4,
      }

      return map[race]
    }

    let userClothing = await UserClothing.findOne({ user_id: userId })
    if (!userClothing) {
      userClothing = new UserClothing({
        user_id: userId,
        hat: getInitialHatByRace(race),
        top: 5,
        pants: 6,
        shoes: 7,
        accessories: null,
      })
      await userClothing.save()
    }
    if (!(await UserCurrentInventory.findOne({ user_id: userId })))
      await prebuildInitialInventory(userId)

    const sumRespect = (
      await Clothing.find({
        clothing_id: { $in: [5, 6, 7, getInitialHatByRace(race)] },
      })
    ).reduce((acc, cur) => {
      acc += cur.respect
      return acc
    }, 0)
    userParam.respect += sumRespect
    await userParam.save()

    await (new UserSpins({ user_id: userId, type: 'daily', is_ })).save()

    return res.status(200).json({})
  } catch (e) {
    console.log("Error creating personage for user", e)
    return res.status(404).json({ message: "User not found" })
  }
}

export const getShopItems = async (req, res) => {
  // TODO: boosters
  try {
    const userId = parseInt(req.params.id)
    const userInventory = await UserCurrentInventory.findOne({
      user_id: userId,
    })
    const { clothes, shelf } = userInventory

    const clothingClean = (
      await Clothing.find({}, { _id: false }, { sort: { tier: 1 } })
    ).filter((item) => !clothes.map((c) => c.id).includes(item.clothing_id))
    const shelfClean = (await ShelfItemModel.find({}, { _id: false })).filter(
      (item) => !shelf.map((c) => c.id).includes(item.id)
    )

    return res.status(200).json({
      clothing: clothingClean,
      shelf: shelfClean,
    })
  } catch (err) {
    console.log("Failed to fetch shop items", err)
  }
}

export const getInventoryItems = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    let userInventory = await UserCurrentInventory.findOne({ user_id: userId })

    if (!userInventory) {
      userInventory = await prebuildInitialInventory(userId)
    }

    let { clothes, shelf } = userInventory
    clothes = await Promise.all(
      clothes.map((c) => Clothing.findOne({ clothing_id: c.id }))
    )
    clothes = clothes.filter(item => item != null)
    shelf = await Promise.all(
      shelf.map((c) => ShelfItemModel.findOne({ id: c.id }))
    )
    shelf = shelf.filter(item => item != null)
    const currentlyUsedClothes = await UserClothing.findOne({ user_id: userId })
    const currentlyUsedShelf = (await User.findOne({ id: userId })).shelf

    return res.status(200).json({
      clothes,
      shelf,
      currentlyUsedClothes,
      currentlyUsedShelf,
    })
  } catch (err) {
    console.log("Failed to fetch shop items", err)
  }
}

export const getCurrentClothes = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    if (userId) {
      const userClothing = await UserClothing.findOne({ user_id: id })

      if (!userClothing) {
        return res.status(404).json({ message: "User has no clothing data" })
      }

      const clothingIds = [
        userClothing.hat,
        userClothing.top,
        userClothing.pants,
        userClothing.shoes,
        userClothing.accessory,
      ]

      const clothingElements = await Clothing.find({
        clothing_id: { $in: clothingIds },
      })

      const response = {
        hat: clothingElements.find((el) => el.clothing_id === userClothing.hat),
        top: clothingElements.find((el) => el.clothing_id === userClothing.top),
        pants: clothingElements.find(
          (el) => el.clothing_id === userClothing.pants
        ),
        shoes: clothingElements.find(
          (el) => el.clothing_id === userClothing.shoes
        ),
        accessories: clothingElements.find((el) =>
          userClothing.accessories.includes(el.clothing_id)
        ),
      }

      console.log(reponse)

      return res.status(200).json(response)
    }
  } catch (err) {
    console.log("Error fetching clothes for user", err)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

export const updateUserPrestart = async (req, res) => {
  try {
    const userId = req.params.id
    const refCount = await Referal.countDocuments({ refer_id: userId })
    if (refCount < 5)
      return res.status(400).json({ message: "Not enough referrals" })
    if (!parseInt(userId))
      return res.status(400).json({ message: "User id must be Integer" })

    const user = await User.findOne({ id: userId })
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found or status already updated." })

    const result = await user.updateOne({
      prestart: true, // Обновляемое поле
    })
    // Проверяем, было ли обновление успешным
    if (result.modifiedCount > 0) {
      return res
        .status(200)
        .json({ message: "User prestart status updated successfully." })
    } else {
      return res
        .status(404)
        .json({ message: "User not found or status already updated." })
    }
  } catch (e) {
    console.log("Error while updating prestart claim status: ", e)
    return res.status(500).json({ message: "Internal server error." })
  }
}

export const getLevelsParameters = async (req, res) => {
  try {
    const levels = await LevelsParamters.find({}, { _id: false })
    return res.status(200).json({ levels })
  } catch (e) {
    console.log("Error in getLevelParameters", e)
  }
}

export const handleClothesUnequip = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const { clothing_id, type, productType } = req.body
    // const userParams =
    if (productType === "clothes") {
      if (type !== "Accessory") return res.status(200).json({})
      const isClothingReal = await Clothing.findOne({ clothing_id })
      const doesUserHaveIt = (
        await UserCurrentInventory.findOne({ user_id: userId })
      ).clothes.find((c) => c.id == clothing_id)
      console.log(isClothingReal)
      console.log(doesUserHaveIt)

      if (isClothingReal && doesUserHaveIt) {
        await UserClothing.updateOne(
          { user_id: userId },
          { $set: { [type.toLowerCase()]: null } }
        )
      }
    }

    if (productType === "shelf") {
      const doesUserHaveIt = (
        await UserCurrentInventory.findOne({ user_id: userId })
      ).shelf.find((c) => c.id === clothing_id)

      if (doesUserHaveIt) {
        const currentUser = await User.findOne({ id: userId })
        const currentShelf = { ...currentUser.shelf, [type]: null }

        await User.updateOne({ id: userId }, { $set: { shelf: currentShelf } })
      }
    }

    return res.status(200).json({ status: "ok" })
  } catch (e) {
    console.log("Error in handleClothesUnequip", e)
  }
}

export const handleClothesEquip = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const { clothing_id, type, productType } = req.body

    if (productType === "clothes") {
      const isClothingReal = await Clothing.findOne({ clothing_id })
      const doesUserHaveIt = (
        await UserCurrentInventory.findOne({ user_id: userId })
      ).clothes.find((c) => c.id == clothing_id)

      console.log(userId, clothing_id, type)

      if (isClothingReal && doesUserHaveIt) {
        let userParams = await UserParameters.findOne({ id: userId })
        console.log(userParams)
        const currentClothingId = (
          await UserClothing.findOne({ user_id: userId })
        )[type.toLowerCase()]
        const currentClothing = currentClothingId
          ? await Clothing.findOne(
              { clothing_id: currentClothingId },
              { respect: 1 }
            )
          : null
        const currentClothingRespect = currentClothing?.respect || 0
        console.log(currentClothingRespect)
        userParams.respect =
          userParams.respect - currentClothingRespect + isClothingReal.respect
        await userParams.save()
        await UserClothing.updateOne(
          { user_id: userId },
          { $set: { [type === 'Accessory' ? 'accessories' : type.toLowerCase()]: parseInt(clothing_id) } }
        )
      }
    }

    if (productType === "shelf") {
      const doesUserHaveIt = (
        await UserCurrentInventory.findOne({ user_id: userId })
      ).shelf.find((c) => c.id === clothing_id)

      console.log(clothing_id, productType, doesUserHaveIt)

      if (doesUserHaveIt) {
        const shelfItem = await ShelfItems.findOne({ id: clothing_id })
        console.log(shelfItem)
        const userParam = await UserParameters.findOne({ id: userId })
        userParam.respect +=
          shelfItem && shelfItem.respect ? shelfItem.respect : 0
        const currentUser = await User.findOne({ id: userId })
        const currentShelf = { ...currentUser.shelf, [type]: clothing_id }

        await User.updateOne({ id: userId }, { $set: { shelf: currentShelf } })
        await userParam.save()
      }
    }

    return res.status(200).json({ status: "ok" })
  } catch (e) {
    console.log("Error in handleClothesUnequip", e)
    return res.status(500).json({ error: true })
  }
}

export const handleShelfEquip = async (req, res) => {
  const userId = parseInt(req.params.id)
  const { type, id } = req.body

  try {
    const shelfItem = await ShelfItemModel.findOne({ id, type })
    const userParams = await UserParameters.findOne({ id: userId })

    if (!shelfItem) {
      return res.status(400).json({ error: true })
    }
    console.log(type)
    await User.updateOne(
      { id: userId },
      {
        $setOnInsert: {
          "shelf.flower": null,
          "shelf.award": null,
          "shelf.event": null,
          "shelf.neko": null,
          "shelf.flag": null,
        },
        $set: { [`shelf.${type}`]: id },
      },
      { upsert: true }
    )
    userParams.respect += shelfItem.respect
  } catch (err) {
    console.log("Error in handleShelfEquip", e)
    return res.status(500).json({ error: true })
  }
}

export const handleShelfUnequip = async (req, res) => {
  const userId = parseInt(req.params.id)
  const { type } = req.body

  try {
    const user = await User.findOne({ id: userId })
    const currentShelfItemIdByType = user[`shelf.${type}`]

    if (!currentShelfItemIdByType) {
      return res.status(403).json({ error: true })
    }

    const shelfItem = await ShelfItemModel.findOne({
      id: currentShelfItemIdByType,
      type,
    })
    const userParams = await UserParameters.findOne({ id: userId })
    console.log(shelfItem)
    await User.updateOne({ id: userId }, { $set: { [`shelf.${type}`]: null } })

    userParams.respect -= shelfItem.respect
    await userParams.save()
  } catch (err) {
    console.log("Error in handleShelfEquip", e)
    return res.status(500).json({ error: true })
  }
}

export const buyItemsForCoins = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { productType, id } = req.body;

    const user = await UserParameters.findOne({ id: userId });
    const userCurrentInventory = await UserCurrentInventory.findOne({
      user_id: userId,
    });
    let product;

    if (productType === "clothes") {
      if (userCurrentInventory.clothes.find((item) => item.id === id))
        return res.status(401).json({ ok: false });
      product = await Clothing.findOne({ clothing_id: id });
      if (product && user.coins >= product.price && user.level >= product.requiredLevel) {
        await UserParameters.updateOne(
          { id: userId },
          { $inc: { coins: -product.price } }
        );
        await UserCurrentInventory.updateOne(
          { user_id: userId },
          { $addToSet: { clothes: { id: product.clothing_id } } }
        );
      } else {
        return res.status(401).json({ ok: false, reason: "Not enough funds" });
      }
    }

    if (productType === "shelf") {
      if (userCurrentInventory.shelf.find((item) => item.id === id))
        return res.status(401).json({ ok: false });

      product = await ShelfItemModel.findOne({ id: id });
      if (product) {
        const { coins, stars } = product.cost;

        // Block purchase for IDs 9-38
        if (id >= 9 && id <= 38) {
          return res.status(403).json({ 
            ok: false, 
            reason: "This item can only be obtained via NFT" 
          });
        }

        if (stars > 0) {
          return res.status(500).json({ ok: false });
        }
        if (user.coins >= coins) {
          await UserParameters.updateOne(
            { id: userId },
            { $inc: { coins: -coins } }
          );
          await UserCurrentInventory.updateOne(
            { user_id: userId },
            { $addToSet: { shelf: { id: product.id } } }
          );
        } else {
          console.log('not enough coins');
          return res.status(401).json({ ok: false, reason: "Not enough funds" });
        }
      } else {
        return res.status(500).json({ ok: false });
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.log("Error in buying for coins", err);
    return res.status(500).json({ error: true });
  }
};

export const requestStarsPaymentLink = async (req, res) => {
  try {
    const { productType, id, lang = 'en', userId } = req.body

    let product, name, description, amount, title

    if (productType === "boost") {
      product = await Boost.findOne({ boost_id: id })
      name = product.name[lang]
      description = product.description[lang]
      title = name
      amount = product.stars_price
    }

    if (productType === "clothes") {
      product = await Clothing.findOne({ clothing_id: id })
      name = product.name[lang]
      description = product.description[lang]
      title = name
      amount = product.price
    }

    if (productType === "shelf") {
      product = await ShelfItemModel.findOne({ id: id })
      name = product.name[lang]
      description = product.description[lang]
      title = name
      amount = product.cost.stars
    }

    //! TODO: change spin amount
    if(productType === 'spin') {
      name = {
        ru: "Спин",
        en: 'Spin'
      }[lang]
      description = {
        ru: "Попытка для игры в колесо!",
        en: 'An attempt to play the wheel!'
      }[lang]
      title = name
      amount = 1
    }

    if (productType === "autoclaim") {
        name = {
          ru: "Автоклейм",
          en: 'Autoclaim'
        }[lang]
        description = {
          ru: "Автоматический сбор дохода от вашего бизнеса!",
          en: "Autoclaim of your businesses`s revenue"
        }[lang]
        title = name
        amount = 1
    }

    const invoiceLink = await _fetch(`${process.env.BOT_ADDR}payment-create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productType,
        id,
        title,
        amount,
        productName: name,
        description,
        userId
      }),
    })
      .then((res) => res.json())
      .then((res) => res.invoiceLink)

    return res.status(200).json({ status: "ok", invoiceLink })
  } catch (e) {
    console.log("Error in pay", e)
    return res.status(500).json({ error: true })
  }
}

export const getUserInvestments = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await User.findOne(
      { id: userId },
      { investment_levels: 1, has_autoclaim: 1 }
    );
    const userParams = await UserParameters.findOne({ id: userId }, { level: 1 });
    const userSkills = await UserSkill.find({ user_id: userId }); // Fetch user's learned skills

    // Current investments by user level
    const currentGameCenter = await Investments.findOne({
      type: InvestmentTypes.GameCenter,
      level: user.investment_levels[InvestmentTypes.GameCenter],
    });
    const currentCoffeeShop = await Investments.findOne({
      type: InvestmentTypes.CoffeeShop,
      level: user.investment_levels[InvestmentTypes.CoffeeShop],
    });
    const currentZooShop = await Investments.findOne({
      type: InvestmentTypes.ZooShop,
      level: user.investment_levels[InvestmentTypes.ZooShop],
    });

    // Next levels
    const nextLevelGameCenter = await Investments.findOne({
      type: InvestmentTypes.GameCenter,
      level: user.investment_levels[InvestmentTypes.GameCenter] + 1,
    });
    const nextLevelCoffeeShop = await Investments.findOne({
      type: InvestmentTypes.CoffeeShop,
      level: user.investment_levels[InvestmentTypes.CoffeeShop] + 1,
    });
    const nextLevelZooShop = await Investments.findOne({
      type: InvestmentTypes.ZooShop,
      level: user.investment_levels[InvestmentTypes.ZooShop] + 1,
    });

    // Active investments
    const activeGameCenter = currentGameCenter
      ? (
          await UserLaunchedInvestments.find(
            { investment_type: InvestmentTypes.GameCenter, user_id: userId, claimed: false },
            null,
            { sort: { createdAt: -1 } }
          )
        )[0]
      : null;
    const activeCoffeeShop = currentCoffeeShop
      ? (
          await UserLaunchedInvestments.find(
            { investment_type: InvestmentTypes.CoffeeShop, user_id: userId, claimed: false },
            null,
            { sort: { createdAt: -1 } }
          )
        )[0]
      : null;
    const activeZooShop = currentZooShop
      ? (
          await UserLaunchedInvestments.find(
            { investment_type: InvestmentTypes.ZooShop, user_id: userId, claimed: false },
            null,
            { sort: { createdAt: -1 } }
          )
        )[0]
      : null;

    const learnedSkillIds = userSkills.map(skill => skill.skill_id);

    const response = {
      tz: moment.tz.guess(),
      game_center: {
        type: InvestmentTypes.GameCenter,
        current_level: currentGameCenter?.level || 0,
        can_claim: activeGameCenter
          ? currentGameCenter.level > 0 && activeGameCenter.claimed === false
          : false,
        started_at: activeGameCenter?.createdAt,
        has_autoclaim: user.has_autoclaim[InvestmentTypes.GameCenter] || false,
        upgrade_info: nextLevelGameCenter
          ? {
              level: nextLevelGameCenter.level,
              price: nextLevelGameCenter.price,
              from: currentGameCenter?.coins_per_hour || 0,
              to: nextLevelGameCenter.coins_per_hour,
            }
          : false,
        friends: await Referal.countDocuments({ refer_id: userId }),
        this_level_friends_required: gameCenterLevelRequirements[currentGameCenter?.level || 0] || 0,
        next_level_friends_required: gameCenterLevelRequirements[(nextLevelGameCenter?.level || 0)] || 0,
      },
      coffee_shop: {
        type: InvestmentTypes.CoffeeShop,
        current_level: currentCoffeeShop?.level || 0,
        can_claim: activeCoffeeShop
          ? currentCoffeeShop.level > 0 && activeCoffeeShop.claimed === false
          : false,
        started_at: activeCoffeeShop?.createdAt,
        has_autoclaim: user.has_autoclaim[InvestmentTypes.CoffeeShop] || false,
        upgrade_info: nextLevelCoffeeShop
          ? {
              level: nextLevelCoffeeShop.level,
              price: nextLevelCoffeeShop.price,
              from: currentCoffeeShop?.coins_per_hour || 0,
              to: nextLevelCoffeeShop.coins_per_hour,
              skill_id_required: nextLevelCoffeeShop.skill_id_required || null,
              level_required: nextLevelCoffeeShop.level_required || 0,
              respect_required: nextLevelCoffeeShop.respect_required || 0,
              stars_price: nextLevelCoffeeShop.stars_price || 0,
            }
          : false,
      },
      zoo_shop: {
        type: InvestmentTypes.ZooShop,
        current_level: currentZooShop?.level || 0,
        can_claim: activeZooShop
          ? currentZooShop.level > 0 && activeZooShop.claimed === false
          : false,
        started_at: activeZooShop?.createdAt,
        has_autoclaim: user.has_autoclaim[InvestmentTypes.ZooShop] || false,
        upgrade_info: nextLevelZooShop
          ? {
              level: nextLevelZooShop.level,
              price: nextLevelZooShop.price,
              from: currentZooShop?.coins_per_hour || 0,
              to: nextLevelZooShop.coins_per_hour,
              skill_id_required: nextLevelZooShop.skill_id_required || null,
              level_required: nextLevelZooShop.level_required || 0,
              respect_required: nextLevelZooShop.respect_required || 0,
              stars_price: nextLevelZooShop.stars_price || 0,
            }
          : false,
      },
      user_level: userParams.level,
      user_skills: learnedSkillIds,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.log("Error in get investment", err);
    return res.status(500).json({ error: true });
  }
};

export const buyInvestmentLevel = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { investment_type } = req.body;

    if (!Object.values(InvestmentTypes).includes(investment_type)) {
      return res.status(400).json({ error: true });
    }

    const user = await User.findOne({ id: userId }, { investment_levels: 1 });
    const userParams = await UserParameters.findOne({ id: userId });
    const userSkills = await UserSkill.find({ user_id: userId });
    const userInvestmentLevel = user.investment_levels[investment_type];

    const currentInvestment = await Investments.findOne(
      { type: investment_type, level: userInvestmentLevel },
      { respect: 1 }
    );
    const nextLevelInvestment = await Investments.findOne({
      type: investment_type,
      level: userInvestmentLevel + 1,
    });

    if (!nextLevelInvestment) {
      console.log("Error in buyInvestmentLevel - nowhere to upgrade");
      return res.status(404).json({ error: true });
    }

    // Check requirements (skip for Game Center)
    if (investment_type !== InvestmentTypes.GameCenter) {
      const hasRequiredSkill = nextLevelInvestment.skill_id_required
        ? userSkills.some(skill => skill.skill_id === nextLevelInvestment.skill_id_required)
        : true;
      const meetsLevelRequirement = userParams.level >= (nextLevelInvestment.level_required || 0);

      if (!hasRequiredSkill) {
        return res.status(403).json({ error: true, message: "Required skill not learned" });
      }
      if (!meetsLevelRequirement) {
        return res.status(403).json({ error: true, message: "Level requirement not met" });
      }
    }

    if (userParams.coins >= nextLevelInvestment.price) {
      if (investment_type !== InvestmentTypes.GameCenter) {
        user.investment_levels[investment_type] += 1;
        userParams.respect =
          userParams.respect -
          (currentInvestment?.respect || 0) +
          nextLevelInvestment.respect;
        userParams.coins = userParams.coins - nextLevelInvestment.price;
        await upUserExperience(userId, nextLevelInvestment.experience_reward);
        await user.save();
        await userParams.save();

        return res.status(200).json({ ok: true });
      }

      // Cannot buy Game Center directly (requires friends)
      return res.status(400).json({ error: true });
    }

    return res.status(403).json({ error: true, message: "Insufficient balance" });
  } catch (err) {
    console.log("Error in investment upgrade", err);
    return res.status(500).json({ error: true });
  }
};

export const startInvestment = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const { investment_type } = req.body

    if (!Object.values(InvestmentTypes).includes(investment_type)) {
      return res.status(400).json({ error: true })
    }

    const user = await User.findOne({ id: userId }, { investment_levels: 1 })
    const userInvestmentLevel = user.investment_levels[investment_type]

    const currentInvestment = await Investments.findOne(
      { type: investment_type, level: userInvestmentLevel },
    )
    
    if(!currentInvestment) {
      return res.status(400).json({ error: true })
    }

    const isThereARunningInvestment = await UserLaunchedInvestments.findOne(
      {
        user_id: userId,
        investment_id: currentInvestment.id,
        claimed: false,
      }
    )

    if (!isThereARunningInvestment) {
        await new UserLaunchedInvestments({
          user_id: userId,
          investment_id: currentInvestment.id,
          to_claim: currentInvestment.coins_per_hour,
          investment_type: investment_type
        }).save()

        return res.status(200).json({ ok: true })
    }

    
    return res.status(403).json({ ok: true })
  } catch (err) {
    console.log("Error in investment kick-start", err)
    return res.status(500).json({ error: true })
  }
}

export const claimInvestment = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const { investment_type } = req.body

    if (!Object.values(InvestmentTypes).includes(investment_type)) {
      return res.status(400).json({ error: true })
    }

    const user = await User.findOne({ id: userId }, { investment_levels: 1 })
    const userParams = await UserParameters.findOne({ id: userId })
    const userInvestmentLevel = user.investment_levels[investment_type]
    const investmentsOfType = (
      await Investments.find({ type: investment_type }, { id: 1 })
    ).map((item) => item.id)
    const investmentToClaim = await UserLaunchedInvestments.findOne(
      { user_id: userId, investment_id: { $in: investmentsOfType } },
      null,
      { sort: { createdAt: -1 } }
    )

    if (!investmentToClaim || investmentToClaim.claimed) {
      return res.status(404).json({ error: true })
    }

    const investment = await Investments.findOne({
      type: investment_type,
      level: userInvestmentLevel,
    })

    if (
      Date.now() - new Date(investmentToClaim.createdAt).getTime() <
      3600000
    ) {
      return res.status(403).json({ error: true })
    }

    await new UserLaunchedInvestments({
      user_id: userId,
      investment_id: investment.id,
      to_claim: investment.coins_per_hour,
      investment_type
    }).save()

    await recalcValuesByParameters(userParams, { coinsReward: investmentToClaim.to_claim })
    // await upUserExperience(userId, investment.experience_reward)

    investmentToClaim.claimed = true

    await userParams.save()
    await investmentToClaim.save()
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.log("Error in investment upgrade", err)
    return res.status(500).json({ error: true })
  }
}

export const getUserTasks = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)

    const tasks = await Tasks.find()
    const userParam = await UserParameters.findOne({ id: userId })
    const completedTaskIds = (
      await CompletedTasks.find({ user_id: userId })
    ).map((item) => item.task_id)

    const work = await Work.findOne({ id: userParam.work_id })

    const response = {
      social_tasks: tasks.map((task) => ({
        ...task._doc,
        is_complete: completedTaskIds.includes(task.id),
        reward: task.fixed + (work ? work.coins_in_hour * task.multiplier : 0),
      })),
    }

    return res.status(200).json(response)
  } catch (err) {
    console.log("Error in getUserTasks", err)
    return res.status(500).json({ error: true })
  }
}

export const saveProfileData = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const { photo_url = null, first_name = null, last_name = null, username = null} = req.body

    const setBlock = {}

    if(photo_url) setBlock.photo_url = photo_url
    if(first_name) setBlock.first_name = first_name
    if(last_name) setBlock.last_name = last_name
    if(username) setBlock.username = username

    if(JSON.stringify(setBlock) !== JSON.stringify({})) {
      await User.updateOne({ id: userId }, { $set: setBlock })
    }

    return res.status(200).json({ })
  } catch(err) {
    console.log("Error in saveProfileData", err)
    return res.status(500).json({ })
  }
}

const bot = new Bot("7866433891:AAHAh-4Lc0Dvr80URgOQMJrIKB_1bfxc0KM")

// stats forming step 1 
export const collectRefStatsFromDb = async () => {
  return Referal.aggregate([
    {
      $group: {
        _id: "$refer_id",
        referral_count: {
          $sum: 1
        }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "id",
        as: "user_info"
      }
    },
    {
      $unwind: "$user_info"
    },
    {
      $project: {
        referer_id: "$_id",
        referral_count: 1,
        username: "$user_info.username"
      }
    },
    {
      $match: {
        referral_count: {
          $gte: 5
        }
      }
    }
  ])
}

// stats forming step 2
export const addUserSubscriptionStatus = async (refsAggregationResult, channelId) => {
  const results = [];
  const chunkSize = 15;

  const processChunk = async (chunk) => {
    const chunkResults = await Promise.all(
      chunk.map(async (userStat) => {
        const result = { ...userStat, subscribed: false };
        try {
          await bot.api.getChatMember(channelId, result.referer_id);
          result.subscribed = true;
        } catch (err) {
          // not subscribed
        }
        return result;
      })
    );
    return chunkResults;
  };

  for (let i = 0; i < refsAggregationResult.length; i += chunkSize) {
    const chunk = refsAggregationResult.slice(i, i + chunkSize);
    const chunkResults = await processChunk(chunk);
    results.push(...chunkResults);
  }

  await fs.writeFile('./refs-weekly-stats.json', JSON.stringify(results, null, 2));
};

export const claimUserTask = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const { id } = req.body

    const task = await Tasks.findOne({ id: id })
    const userParam = await UserParameters.findOne({ id: userId })

    if (await CompletedTasks.findOne({ task_id: id, user_id: userId })) {
      console.log(`Task is already completed by user ${userId} ${task.id}`)
      return res.status(403).json({ ok: true })
    }

    if (task) {
      if (task.is_tg) {
        try {
          await bot.api.getChatMember(task.channel_id, userId)
          console.log("Task complete")
        } catch (err) {
          return res.status(403).json({ error: true })
        }
      } else {
        console.log("Link task - skipping")
      }

      await new CompletedTasks({ user_id: userId, task_id: task.id }).save()
      const work = await Work.findOne({ id: userParam.work_id })
      const coinsReward = task.fixed + (work ? work.coins_in_hour * task.multiplier : 0)

      await recalcValuesByParameters(userParam, { coinsReward })
      await upUserExperience(userId, task.experience_reward)

      await userParam.save()
    } else {
      return res.status(404).json({ ok: true })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.log("Error in getUserTasks", err)
    return res.status(500).json({ error: true })
  }
}

export const handleTonWalletConnect = async (req, res) => {
  const { tonWalletAddress } = req.body
  const userId = parseInt(req.params.userId)

  if(!userId || !tonWalletAddress || tonWalletAddress === '') {
    return res.status(400).json({ error: true })
  }

  try {
    const userWithWallet = await User.findOne({ tonWalletAddress })
    
    if(userWithWallet) {
      return res.status(403).json({ error: true })
    }

    await User.updateOne({ id: userId }, { $set: { tonWalletAddress } })

    return res.status(200).json({ error: false })
  } catch(err) {
    return res.status(500).json({ error: true })
  }
}

export const handleTonWalletDisconnect = async (req, res) => {
  const userId = parseInt(req.params.userId)

  if(!userId) {
    return res.status(400).json({ error: true })
  }

  try {
    await User.updateOne({ id: userId }, { $set: { tonWalletAddress: null } })
  } catch(err) {
    return res.status(500).json({ error: true })
  }

  return res.status(400).json({ error: false })
}

export const getLeaderboard = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const userId = req.query.userId ? parseInt(req.query.userId) : null; // Ensure userId is parsed

    const leaderboardPipeline = [
      {
        $lookup: {
          from: "users",
          localField: "id",
          foreignField: "id",
          as: "user_info",
        },
      },
      {
        $unwind: {
          path: "$user_info",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          score: {
            $add: ["$total_earned", "$respect"],
          },
          "user_info.personage": { $ifNull: ["$user_info.personage", {}] },
          "user_info.username": { $ifNull: ["$user_info.username", "Unknown"] },
          "user_info.first_name": { $ifNull: ["$user_info.first_name", ""] },
          "user_info.last_name": { $ifNull: ["$user_info.last_name", ""] },
          "user_info.photo_url": { $ifNull: ["$user_info.photo_url", null] },
        },
      },
      {
        $sort: { score: -1 },
      },
      {
        $group: {
          _id: null,
          allUsers: { $push: "$$ROOT" },
        },
      },
      {
        $unwind: {
          path: "$allUsers",
          includeArrayIndex: "rank",
        },
      },
    ];

    const fullList = await UserParameters.aggregate([...leaderboardPipeline]);
    const rankedUsers = fullList.map((doc) => ({
      user_id: doc.allUsers.user_info.id,
      name: doc.allUsers.user_info.personage.name || doc.allUsers.user_info.username || "Unknown",
      gender: doc.allUsers.user_info.personage.gender || "unknown",
      username: doc.allUsers.user_info.username,
      first_name: doc.allUsers.user_info.first_name,
      last_name: doc.allUsers.user_info.last_name,
      photo_url: doc.allUsers.user_info.photo_url,
      respect: doc.allUsers.respect,
      total_earned: doc.allUsers.total_earned,
      rank: doc.rank + 1,
    }));

    // Find current user's entry
    const currentUser = rankedUsers.find((user) => user.user_id === userId) || {
      user_id: userId,
      name: "Unknown",
      gender: "unknown",
      username: "Unknown",
      first_name: "",
      last_name: "",
      photo_url: null,
      respect: 0,
      total_earned: 0,
      rank: "N/A",
    };

    // Paginate the leaderboard
    const leaderboard = rankedUsers.slice(skip, skip + limit);

    const response = {
      leaderboard,
      currentUser,
    };
    
    return res.status(200).json(response);
  } catch (err) {
    console.error("Error in getLeaderboard:", err);
    res.status(500).json({ error: true });
  }
};