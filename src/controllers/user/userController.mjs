import User from "../../models/user/userModel.mjs"
import Referal from "../../models/referral/referralModel.mjs"
import LevelsParamters from "../../models/level/levelParametersModel.mjs"
import UserClothing from "../../models/user/userClothingModel.mjs"
import UserCurrentInventory from "../../models/user/userInventoryModel.js"
import Clothing from "../../models/clothing/clothingModel.mjs"
import ShelfItems from "../../models/shelfItem/shelfItemModel.js"
import UserParameters from "../../models/user/userParametersModel.mjs"
import _fetch from "isomorphic-fetch"
import Boost from "../../models/boost/boostModel.mjs"
import ShelfItemModel from "../../models/shelfItem/shelfItemModel.js"
import Investments from "../../models/investments/investmentModel.mjs"
import { InvestmentTypes } from "../../models/investments/userLaunchedInvestments.mjs"
import UserLaunchedInvestments from "../../models/investments/userLaunchedInvestments.mjs"
import moment from "moment-timezone"
import Tasks from "../../models/tasks/taskModel.mjs"
import CompletedTasks from "../../models/tasks/completedTask.mjs"
import { Bot } from "grammy"
import Work from "../../models/work/workModel.mjs"

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
    const userId = parseInt(req.params.id)
    const { race, gender, name } = req.body

    if (!userId) {
      return res.status(400).json({ error: true })
    }

    console.log("Creating personage", race, gender, name, userId)
    const refs = await Referal.countDocuments({ refer_id: userId })
    const gameCenterLevel = gamecenterLevelMap[refs.toString()] || 0
    await User.updateOne(
      {
        id: userId,
      },
      {
        $set: {
          personage: {
            race,
            gender,
            name,
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
        accessories: [],
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

// export const equipClothes = async (req, res) => {
//   try {
//     const userId = parseInt(req.params.id)

//     const userInventory = await UserCurrentInventory.findOne({ user_id: userId })
//     const { clothes } = userInventory
//     console.log(clothes)
//     const clothingClean = (await Clothing.find({}, { _id: false }, { sort: { tier: 1 } })).filter(item => !clothes.map(c => c.id).includes(item.clothing_id))
//     const shelf = await ShelfItems.find({}, { _id: false }, { sort: { _id: 1 } })

//     return res.status(200).json({
//       clothing: clothingClean,
//       shelf
//     })
//   } catch(err) {
//     console.log("Failed to fetch shop items", err)
//   }
// }

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
    shelf = await Promise.all(
      shelf.map((c) => ShelfItemModel.findOne({ id: c.id }))
    )
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
        ...userClothing.accessories,
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
        accessories: clothingElements.filter((el) =>
          userClothing.accessories.includes(el.clothing_id)
        ),
      }

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
        if (type.toLowerCase() !== "accessory") {
          const currentClothingId = (
            await UserClothing.findOne({ user_id: userId })
          )[type.toLowerCase()]
          const currentClothing = currentClothingId
            ? await Clothing.find(
                { clothing_id: currentClothingId },
                { respect: 1 }
              )
            : null
          const currentClothingRespect = currentClothing
            ? currentClothing.respect
            : 0
          // update respect
          userParams.respect =
            userParams.respect - currentClothingRespect + isClothingReal.respect
          await userParams.save()
          await UserClothing.updateOne(
            { user_id: userId },
            { $set: { [type.toLowerCase()]: parseInt(clothing_id) } }
          )
        } else {
          //
        }
      }
    }

    if (productType === "shelf") {
      const doesUserHaveIt = (
        await UserCurrentInventory.findOne({ user_id: userId })
      ).shelf.find((c) => c.id === clothing_id)

      console.log(clothing_id, productType, doesUserHaveIt)

      if (doesUserHaveIt) {
        const currentUser = await User.findOne({ id: userId })
        const currentShelf = { ...currentUser.shelf, [type]: clothing_id }

        await User.updateOne({ id: userId }, { $set: { shelf: currentShelf } })
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
  } catch (err) {
    console.log("Error in handleShelfEquip", e)
    return res.status(500).json({ error: true })
  }
}

export const handleShelfUnequip = async (req, res) => {
  const userId = parseInt(req.params.id)
  const { type } = req.body

  try {
    await User.updateOne({ id: userId }, { $set: { [`shelf.${type}`]: null } })
  } catch (err) {
    console.log("Error in handleShelfEquip", e)
    return res.status(500).json({ error: true })
  }
}

export const buyItemsForCoins = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const { productType, id } = req.body

    const user = await UserParameters.findOne({ id: userId }, { coins: 1 })
    const userCurrentInventory = await UserCurrentInventory.findOne({
      user_id: userId,
    })
    let product

    if (productType === "clothes") {
      if (userCurrentInventory.clothes.find((item) => item.id === id))
        return res.status(401).json({ ok: false })
      product = await Clothing.findOne({ clothing_id: id })
      if (product && user.coins >= product.price) {
        await UserParameters.updateOne(
          { id: userId },
          { $inc: { coins: -product.price } }
        )
        await UserCurrentInventory.updateOne(
          { user_id: userId },
          { $addToSet: { clothes: { id: product.clothing_id } } }
        )
      } else {
        return res.status(401).json({ ok: false, reason: "Not enough funds" })
      }
    }

    if (productType === "shelf") {
      if (userCurrentInventory.shelf.find((item) => item.id === id))
        return res.status(401).json({ ok: false })
      product = await ShelfItemModel.findOne({ id: id })
      if (product) {
        const { coins, stars } = product.cost
        if (stars > 0) {
          return res.status(500).json({ ok: false })
        }
        if (user.coins >= coins) {
          await UserParameters.updateOne(
            { id: userId },
            { $inc: { coins: -coins } }
          )
          await UserCurrentInventory.updateOne(
            { user_id: userId },
            { $addToSet: { shelf: { id: product.id } } }
          )
        } else {
          return res.status(401).json({ ok: false, reason: "Not enough funds" })
        }
      } else {
        return res.status(500).json({ ok: false })
      }
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.log("Error in buying for coins", err)
    return res.status(500).json({ error: true })
  }
}

export const requestStarsPaymentLink = async (req, res) => {
  try {
    const { productType, id } = req.body

    let product, name, description, amount, title

    if (productType === "boosts") {
      product = await Boost.findOne({ id: id })
    }

    if (productType === "clothes") {
      product = await Clothing.findOne({ clothing_id: id })
      name = product.name.ru
      description = product.description.ru
      title = "13th Floor"
      amount = product.price
    }

    if (productType === "shelf") {
      product = await ShelfItemModel.findOne({ id: id })
      name = product.name.ru
      description = product.description.ru
      title = "13th Floor"
      amount = product.cost.stars
    }

    if (productType === "autoclaim") {
      product = await ShelfItemModel.findOne({ id: id })
      name = "Автоклейм"
      description = "Автоматический сбор инвестиции с вашего бизнеса!"
      title = "13th Floor"
      amount = 1
    }

    const invoiceLink = await _fetch("http://bot:4444/payment-create", {
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

// investments
export const getUserInvestments = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const user = await User.findOne(
      { id: userId },
      { investment_levels: 1, has_autoclaim: 1 }
    )

    // current investments by user level
    const currentGameCenter = await Investments.findOne({
      type: InvestmentTypes.GameCenter,
      level: user.investment_levels[InvestmentTypes.GameCenter],
    })
    const currentCoffeeShop = await Investments.findOne({
      type: InvestmentTypes.CoffeeShop,
      level: user.investment_levels[InvestmentTypes.CoffeeShop],
    })
    const currentZooShop = await Investments.findOne({
      type: InvestmentTypes.ZooShop,
      level: user.investment_levels[InvestmentTypes.ZooShop],
    })

    // next levels
    const nextLevelGameCenter = await Investments.findOne({
      type: InvestmentTypes.GameCenter,
      level: user.investment_levels[InvestmentTypes.GameCenter] + 1,
    })
    const nextLevelCoffeeShop = await Investments.findOne({
      type: InvestmentTypes.CoffeeShop,
      level: user.investment_levels[InvestmentTypes.CoffeeShop] + 1,
    })
    const nextLevelZooShop = await Investments.findOne({
      type: InvestmentTypes.ZooShop,
      level: user.investment_levels[InvestmentTypes.ZooShop] + 1,
    })

    const activeGameCenter = currentGameCenter
      ? (
          await UserLaunchedInvestments.find(
            { investment_id: currentGameCenter.id, user_id: userId },
            null,
            { sort: { createdAt: -1 } }
          )
        )[0]
      : null
    const activeCoffeeShop = currentCoffeeShop
      ? (
          await UserLaunchedInvestments.find(
            { investment_id: currentCoffeeShop.id, user_id: userId },
            null,
            { sort: { createdAt: -1 } }
          )
        )[0]
      : null
    const activeZooShop = currentZooShop
      ? (
          await UserLaunchedInvestments.find(
            { investment_id: currentZooShop.id, user_id: userId },
            null,
            { sort: { createdAt: -1 } }
          )
        )[0]
      : null

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
            }
          : null,
      },
    }

    return res.status(200).json(response)
  } catch (err) {
    console.log("Error in get investment", err)
    return res.status(500).json({ error: true })
  }
}

export const buyInvestmentLevel = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const { investment_type } = req.body

    if (!Object.values(InvestmentTypes).includes(investment_type)) {
      return res.status(400).json({ error: true })
    }

    const user = await User.findOne({ id: userId }, { investment_levels: 1 })
    const userParams = await UserParameters.findOne({ id: userId })
    const userInvestmentLevel = user.investment_levels[investment_type]

    const currentInvestment = await Investments.findOne(
      { type: investment_type, level: userInvestmentLevel },
      { respect: 1 }
    )
    const nextLevelInvestment = await Investments.findOne({
      type: investment_type,
      level: userInvestmentLevel + 1,
    })

    if (!nextLevelInvestment) {
      console.log("Error in buyInvestmentLevel - nowhere to upgrade")
      return res.status(404).json({ error: true })
    }

    if (userParams.coins >= nextLevelInvestment.price) {
      if (investment_type !== InvestmentTypes.GameCenter) {
        // if (user.investment_levels[investment_type] === 0) {

        // }
        // creating investment object
        await new UserLaunchedInvestments({
          user_id: userId,
          investment_id: nextLevelInvestment.id,
          to_claim: nextLevelInvestment.coins_per_hour,
        }).save()
        // const activeInvestment = await UserLaunchedInvestments.findOne({ type: investment_type, level: user.investment_levels[investment_type] }, null, { createdAt: -1 })
        user.investment_levels[investment_type] += 1
        userParams.respect =
          userParams.respect -
          (currentInvestment?.respect || 0) +
          nextLevelInvestment.respect
        userParams.coins = userParams.coins - nextLevelInvestment.price
        await user.save()
        await userParams.save()

        return res.status(200).json({ ok: true })
      }

      // Cannot buy gamecenter
      return res.status(400).json({ error: true })
    }

    // not enough coins
    return res
      .status(403)
      .json({ error: true, message: "Insufficient balance" })
  } catch (err) {
    console.log("Error in investment upgrade", err)
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

    // Make claimable in 10 sec on test
    if (
      Date.now() - new Date(investmentToClaim.createdAt).getTime() <
      (process.env.NODE_ENV === "test" ? 10000 : 3600000)
    ) {
      return res.status(403).json({ error: true })
    }

    userParams.coins += investmentToClaim.to_claim
    investmentToClaim.claimed = true

    await userParams.save()
    await investmentToClaim.save()
    await new UserLaunchedInvestments({
      user_id: userId,
      investment_id: investment.id,
      to_claim: investment.coins_per_hour,
    }).save()
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

const bot = new Bot("7866433891:AAHAh-4Lc0Dvr80URgOQMJrIKB_1bfxc0KM")

export const claimUserTask = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const { id } = req.body

    const task = await Tasks.findOne({ id: id })
    const userParam = await UserParameters.findOne({ id: userId })

    if(await CompletedTasks.findOne({ task_id: id, user_id: userId })) {
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
      userParam.coins += task.fixed + (work ? work.coins_in_hour * task.multiplier : 0)
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
