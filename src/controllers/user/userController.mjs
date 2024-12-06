import User from "../../models/user/userModel.mjs"
import Referal from "../../models/referral/referralModel.mjs"
import LevelsParamters from "../../models/level/levelParametersModel.mjs"
import UserClothing from "../../models/user/userClothingModel.mjs"
import UserCurrentInventory from "../../models/user/userInventoryModel.js"
import Clothing from "../../models/clothing/clothingModel.mjs"
import ShelfItems from "../../models/shelfItem/shelfItemModel.js"

export const getUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)

    if (userId) {
      const user = await User.findOne({ id: userId })
      if (user)
        return res
          .status(200)
          .json({ userId: user.id, prestart: user.prestart, personage: user.personage || null })
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

    const userClothing = new UserClothing({
      user_id: userId,
      hat: getInitialHatByRace(race),
      top: 5,
      pants: 6,
      shoes: 7,
      accessories: []
    })

    const userInitialInventory = new UserCurrentInventory({
      user_id: userId,
      shelf: [],
      // all tier 0 items, no offence
      clothes: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        },
        {
          id: 6
        },
        {
          id: 7
        }
      ],
      boosts: []
    })

    console.log(await userClothing.save())
    console.log(await userInitialInventory.save())
  } catch(e) {
    console.log("Error creating personage for user", e)
    return res.status(404).json({ message: "User not found" })
  }
}

export const getShopItems = async (req, res) => {
  // TODO: boosters
  try {
    const userId = parseInt(req.params.id)
    const userInventory = await UserCurrentInventory.findOne({ user_id: userId })
    const { clothes } = userInventory
    console.log(clothes)
    const clothingClean = (await Clothing.find({}, { _id: false }, { sort: { tier: 1 } })).filter(item => !clothes.map(c => c.id).includes(item.clothing_id))
    const shelf = await ShelfItems.find({}, { _id: false }, { sort: { _id: 1 } })
    
    return res.status(200).json({
      clothing: clothingClean,
      shelf
    })
  } catch(err) {
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
    const userInventory = await UserCurrentInventory.findOne({ user_id: userId })
    let { clothes, shelf } = userInventory
    clothes = await Promise.all(
      clothes.map(c => Clothing.findOne({ clothing_id: c.id }))
    )
    const currentlyUsedClothes = await UserClothing.findOne({ user_id: userId })
    const currentlyUsedShelf = (await User.findOne({ id: userId })).shelf
    
    return res.status(200).json({
      clothes,
      shelf,
      currentlyUsedClothes,
      currentlyUsedShelf
    })
  } catch(err) {
    console.log("Failed to fetch shop items", err)
  }
}

export const getCurrentClothes = async(req, res) => {
  try {
    const userId = parseInt(req.params.id)
    if(userId) {
      const userClothing = await UserClothing.findOne({ user_id: id })

      if (!userClothing) {
        return res.status(404).json({ message: 'User has no clothing data' });
      }
  
      const clothingIds = [
        userClothing.hat,
        userClothing.top,
        userClothing.pants,
        userClothing.shoes,
        ...userClothing.accessories,
      ];
  
      const clothingElements = await Clothing.find({ clothing_id: { $in: clothingIds } });
  
      const response = {
        hat: clothingElements.find((el) => el.clothing_id === userClothing.hat),
        top: clothingElements.find((el) => el.clothing_id === userClothing.top),
        pants: clothingElements.find((el) => el.clothing_id === userClothing.pants),
        shoes: clothingElements.find((el) => el.clothing_id === userClothing.shoes),
        accessories: clothingElements.filter((el) => userClothing.accessories.includes(el.clothing_id)),
      };
  
      return res.status(200).json(response);
    }
  } catch(err) {
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
    const { clothing_id, type } = req.body

    const isClothingReal = await Clothing.findOne({ clothing_id })
    const doesUserHaveIt = (await UserCurrentInventory.findOne({ user_id: userId })).clothes.find(c => c.id == clothing_id)
    console.log(isClothingReal)
    console.log(doesUserHaveIt)

    if(isClothingReal && doesUserHaveIt) {
      await UserClothing.updateOne({ user_id: userId }, { $set: { [type.toLowerCase()]: null } })
    }

    return res.status(200).json({ status: 'ok' })
  } catch(e) {
    console.log("Error in handleClothesUnequip", e)
  }
}

export const handleClothesEquip = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const { clothing_id, type } = req.body

    const isClothingReal = await Clothing.findOne({ clothing_id })
    const doesUserHaveIt = (await UserCurrentInventory.findOne({ user_id: userId })).clothes.find(c => c.id == clothing_id)

    console.log(userId, clothing_id, type)

    if(isClothingReal && doesUserHaveIt) {
      await UserClothing.updateOne({ user_id: userId }, { $set: { [type.toLowerCase()]: parseInt(clothing_id) } })
    }

    return res.status(200).json({ status: 'ok' })
  } catch(e) {
    console.log("Error in handleClothesUnequip", e)
    return res.status(500).json({ error: true })
  }
}
