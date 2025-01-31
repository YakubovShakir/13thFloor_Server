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
import { ConstantEffects, ConstantEffectTypes } from "../../models/effects/constantEffectsLevels.mjs"

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
    const userId = parseInt(req.params.id);
    if (!userId) {
      return res.status(400).json({ error: "bad request" });
    }

    // First get or create user
    let user = await Users.findOne({ id: userId });
    const refs = await Referal.countDocuments({ refer_id: userId });

    if (!user) {
      console.log("Registering user with ID", userId);
      const gameCenterLevel = gamecenterLevelMap[refs.toString()] || 0;
      
      // Create user document
      const userData = {
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
          game_center: gameCenterLevel,
          coffee_shop: 0,
          zoo_shop: 0
        },
        has_autoclaim: {
          game_center: false,
          coffee_shop: false,
          zoo_shop: false
        }
      };

      try {
        user = await Users.create(userData); // Use create instead of new...save()
      } catch (err) {
        if (err.code === 11000) { // Handle potential race condition
          user = await Users.findOne({ id: userId });
        } else {
          throw err;
        }
      }

      // Handle game center investment if needed
      if (gameCenterLevel > 0) {
        const investment = await Investments.findOne({ 
          type: 'game_center', 
          level: gameCenterLevel 
        });
        
        if (investment) {
          await UserLaunchedInvestments.create({
            user_id: userId,
            investment_id: investment.id,
            to_claim: investment.coins_per_hour,
          });
        }
      }
    }

    // Get or create user parameters
    let parameters = await UserParameters.findOne({ id: userId });
    if (!parameters) {
      parameters = await UserParameters.create({ 
        id: userId,
        work_id: 1
      });
    }
    parameters.hasWallet = user.tonWalletAddress !== null;
    await parameters.save();

    const work_duration_decrease_level = parameters.constant_effects_levels?.work_duration_decrease
    const work_hourly_income_increase_level = parameters.constant_effects_levels?.work_hourly_income_increase
    
    const work_duration_decrease_doc = await ConstantEffects.findOne({ type: ConstantEffectTypes.WorkDurationDecrease, level: work_duration_decrease_level })
    const work_hourly_income_increase_doc = await ConstantEffects.findOne({ type: ConstantEffectTypes.WorkHourlyIncomeIncrease, level: work_hourly_income_increase_level })    // Get or create inventory
    
    //! TODO REMOVE
    const work_duration_decrease = work_duration_decrease_doc?.value_change || null
    const work_hourly_income_increase = work_hourly_income_increase_doc?.value_change || null

    let inventory = await UserCurrentInventory.findOne({ user_id: userId });
    if (!inventory) {
      inventory = await prebuildInitialInventory(userId);
    }

    // Get or create clothing
    let userClothing = await UserClothing.findOne({ user_id: userId });
    if (!userClothing) {
      userClothing = await UserClothing.create({
        user_id: userId,
        hat: 4,
        top: 5,
        pants: 6,
        shoes: 7,
        accessories: null,
      });
    }

    // Fetch clothing items in parallel
    const [hat, top, pants, shoes, accessories] = await Promise.all([
      Clothing.findOne({ clothing_id: userClothing?.hat }),
      Clothing.findOne({ clothing_id: userClothing?.top }),
      Clothing.findOne({ clothing_id: userClothing?.pants }),
      Clothing.findOne({ clothing_id: userClothing?.shoes }),
      Clothing.findOne({ clothing_id: userClothing?.accessories }),
    ]);

    // Process shelf items
    const processShelf = async (userShelf) => {
      const entries = await Promise.all(
        Object.entries(userShelf).map(async ([key, value]) => {
          if (!value) return [key, null];
          const item = await ShelfItemModel.findOne({ id: value });
          return [key, item];
        })
      );
      return Object.fromEntries(entries);
    };

    const shelf = await processShelf(user.shelf);
    const personage = Object.keys(user.personage).length > 0 ? user.personage : null;

    return res.status(200).json({
      parameters,
      personage,
      inventory,
      clothing: userClothing && { hat, top, pants, shoes, accessories },
      shelf,
      work_duration_decrease,
      work_hourly_income_increase
    });

  } catch (error) {
    console.error('Error in getUserParameters:', error);
    return res.status(500).json({ 
      error: true,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};