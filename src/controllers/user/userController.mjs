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
import Investments, { InvestmentTypes } from "../../models/investments/investmentModel.js"
import UserLaunchedInvestments from "../../models/investments/userLaunchedInvestments.js"

export const prebuildInitialInventory = (user_id) =>
  new UserCurrentInventory({
    user_id,
    shelf: process.env.NODE_ENV === 'test' ? [{id: 1},{id: 2},{id: 5},{id: 8}] : [],
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
  } catch (e) {
    console.log("Error while get user ", e)
    return res.status(404).json({ message: "User not found" })
  }
}

export const createUserPersonage = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const { race, gender, name } = req.body

    if (userId) {
      console.log("Creating personage", race, gender, name, userId)
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
          },
        }
      )
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

    let userParam = await UserParameters.findOne({ id: userId })

    const sumRespect = (
      await Clothing.find({
        clothing_id: { $in: [5, 6, 7, getInitialHatByRace(race)] },
      })
    ).reduce((acc, cur) => {
      acc += cur.respect
      return acc
    }, 0)
    userParam.respect = sumRespect
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
    const user = await User.findOne({ id: userId })
    const userInventory = await UserCurrentInventory.findOne({
      user_id: userId,
    })
    const { clothes, shelf } = userInventory
    
    const clothingClean = (
      await Clothing.find({}, { _id: false }, { sort: { tier: 1 } })
    ).filter((item) => !clothes.map((c) => c.id).includes(item.clothing_id))
    const shelfClean = (
      await ShelfItemModel.find({}, { _id: false })
    ).filter((item) => !shelf.map((c) => c.id).includes(item.id))

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
    const referrals = await Referal.find({ refer_id: userId })
    const refCount = referrals.length
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
    if (productType === 'clothes') {
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

    if (productType === 'shelf') {
      const doesUserHaveIt = (
        await UserCurrentInventory.findOne({ user_id: userId })
      ).shelf.find((c) => c.id === clothing_id)

      if (doesUserHaveIt) {
        const currentUser = await User.findOne({ id: userId });
        const currentShelf = { ...currentUser.shelf, [type]: null };

        await User.updateOne(
          { id: userId },
          { $set: { shelf: currentShelf } }
        )
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

    if (productType === 'clothes') {
      const isClothingReal = await Clothing.findOne({ clothing_id })
      const doesUserHaveIt = (
        await UserCurrentInventory.findOne({ user_id: userId })
      ).clothes.find((c) => c.id == clothing_id)

      console.log(userId, clothing_id, type)

      if (isClothingReal && doesUserHaveIt) {
        await UserClothing.updateOne(
          { user_id: userId },
          { $set: { [type.toLowerCase()]: parseInt(clothing_id) } }
        )
      }
    }

    if (productType === 'shelf') {
      const doesUserHaveIt = (
        await UserCurrentInventory.findOne({ user_id: userId })
      ).shelf.find((c) => c.id === clothing_id)

      console.log(clothing_id, productType, doesUserHaveIt)

      if (doesUserHaveIt) {
          const currentUser = await User.findOne({ id: userId });
          const currentShelf = { ...currentUser.shelf, [type]: clothing_id };

          await User.updateOne(
            { id: userId },
            { $set: { shelf: currentShelf } }
          )
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
          'shelf.flower': null,
          'shelf.award': null,
          'shelf.event': null,
          'shelf.neko': null,
          'shelf.flag': null
        },
        $set: { [`shelf.${type}`]: id }
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
    await User.updateOne({ id: userId },  { $set: { [`shelf.${type}`]: null } })
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
    const userCurrentInventory = await UserCurrentInventory.findOne({ user_id: userId })
    let product

    if(productType === 'clothes') {
      if(userCurrentInventory.clothes.find(item => item.id === id)) return res.status(401).json({ ok: false })
      product = await Clothing.findOne({ clothing_id: id })
      if(product && user.coins >= product.price) {
        await UserParameters.updateOne({ id: userId }, { $inc: { coins: -product.price } })
        await UserCurrentInventory.updateOne({ user_id: userId }, { $addToSet: { clothes: { id: product.clothing_id } } })
      } else {
        return res.status(401).json({ ok: false, reason: 'Not enough funds' })  
      }
    }

    if(productType === 'shelf') {
      if(userCurrentInventory.shelf.find(item => item.id === id)) return res.status(401).json({ ok: false })
      product = await ShelfItemModel.findOne({ id: id })
      if(product) {
        const {coins, stars} = product.cost
        if(stars > 0) {
          return res.status(500).json({ ok: false })  
        }
        if(user.coins >= coins) {
          await UserParameters.updateOne({ id: userId }, { $inc: { coins: -coins } })
          await UserCurrentInventory.updateOne({ user_id: userId }, { $addToSet: { shelf: { id: product.id } } })
        } else {
          return res.status(401).json({ ok: false, reason: 'Not enough funds' })  
        }
      } else {
        return res.status(500).json({ ok: false })
      }
    }

    return res.status(200).json({ ok: true })
  } catch(err) {
    console.log("Error in buying for coins", err)
    return res.status(500).json({ error: true })
  }
}

export const requestStarsPaymentLink = async (req, res) => {
  try {
    const { productType, id } = req.body

    let product, name, description, amount, title;

    if (productType === 'boosts') {
      product = await Boost.findOne({ id: id })
    }

    if (productType === 'clothes') {
      product = await Clothing.findOne({ clothing_id: id })
      name = product.name.ru
      description = product.description.ru
      title = '13th Floor'
      amount = product.price
    }

    if(productType === 'shelf') {
      product = await ShelfItemModel.findOne({ id: id })
      name = product.name.ru
      description = product.description.ru
      title = '13th Floor'
      amount = product.cost.stars
    }

    const invoiceLink = await _fetch('http://bot:4444/payment-create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productType,
        id,
        title,
        amount,
        productName: name,
        description
      })
    }).then(res => res.json()).then(res => res.invoiceLink)

    return res.status(200).json({ status: 'ok', invoiceLink })
  } catch (e) {
    console.log("Error in pay", e)
    return res.status(500).json({ error: true })
  }
}

// investments
export const getUserInvestments = async () => {
  try {
    const userId = parseInt(req.params.id)

    if(!Object.values(InvestmentTypes).includes(investment_type)) {
      return res.status(400).json({ error: true })
    }

    const user = await User.findOne({ id: userId }, { investment_levels: 1 })
    const userParams = await UserParameters.findOne({ id: userId })
    const InvestmentLevel = user.investment_levels[investment_type]
    
    // current investments by user level
    const currentGameCenter = await Investments.findOne({ type: InvestmentTypes.GameCenter, level: user.investment_levels[InvestmentTypes.GameCenter] })
    const currentCoffeeShop = await Investments.findOne({ type: InvestmentTypes.CoffeeShop, level: user.investment_levels[InvestmentTypes.CoffeeShop] })
    const currentZooShop = await Investments.findOne({ type: InvestmentTypes.ZooShop, level: user.investment_levels[InvestmentTypes.ZooShop] })

    const activeGameCenter = await UserLaunchedInvestments.find({ investment_id: currentGameCenter.id, user_id: userId }, null, { sort: {  } })

    const response = {
      [InvestmentTypes.GameCenter]: {
        current_level: currentGameCenter.level,
        in_progress,
        can_claim,
        started_at,
      },
    }
  } catch(err) {
    console.log("Error in get investment", e)
    return res.status(500).json({ error: true })
  }
}

export const buyInvestmentLevel = async () => {
  try {
    const userId = parseInt(req.params.id)
    const { investment_type } = req.body

    if(!Object.values(InvestmentTypes).includes(investment_type)) {
      return res.status(400).json({ error: true })
    }

    const user = await User.findOne({ id: userId }, { investment_levels: 1 })
    const userParams = await UserParameters.findOne({ id: userId })
    const userInvestmentLevel = user.investment_levels[investment_type]
    
    const currentInvestment = await Investments.findOne({ type: investment_type, level: userInvestmentLevel }, { respect: 1 })
    const nextLevelInvestment = await Investments.findOne({ type: investment_type, level: userInvestmentLevel + 1 })

    if(!nextLevelInvestment) {
      console.log("Error in buyInvestmentLevel - nowhere to upgrade")
      return res.status(404).json({ error: true })  
    }

    if(userParams.coins >= nextLevelInvestment) {
      if(!investment_type === InvestmentTypes.GameCenter) {
        user.investment_levels[investment_type] += 1
        userParams.respect = userParams.respect - currentInvestment?.respect || 0 + nextLevelInvestment.respect
        await user.save()
        await userParams.save()

        return res.status(200).json({ ok: true })
      }
    }

  } catch(err) {
    console.log("Error in investment upgrade", e)
    return res.status(500).json({ error: true })
  }
}

export const claimInvestment = async () => {
  try {
    const userId = parseInt(req.params.id)
    const { investment_type } = req.body

    if(!Object.values(InvestmentTypes).includes(investment_type)) {
      return res.status(400).json({ error: true })
    }

    const user = await User.findOne({ id: userId }, { investment_levels: 1 })
    const userParams = await UserParameters.findOne({ id: userId })
    const userInvestmentLevel = user.investment_levels[investment_type]
    const currentInvestment = await Investments.findOne({ type: investment_type, level: userInvestmentLevel })
    const investmentToClaim = await UserLaunchedInvestments.findOne({ user_id: userId, investment_id: currentInvestment.id })

    if(!investmentToClaim || investmentToClaim.claimed) {
      return res.status(404).json({ error: true })  
    }

    // Make claimable in 10 sec on test
    if(!Date.now() - new Date(investmentToClaim.createdAt).getTime() >= process.env.NODE_ENV === 'test' ? 10000 : 3600000) {
      return res.status(403).json({ error: true })
    }

    userParams.coins += investmentToClaim.to_claim
    investmentToClaim.claimed = true

    await userParams.save()
    await investmentToClaim.save()
  } catch(err) {
    console.log("Error in investment upgrade", e)
    return res.status(500).json({ error: true })
  }
}