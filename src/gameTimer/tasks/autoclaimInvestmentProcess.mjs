import UserParameters from "../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import User from "../../models/user/userModel.mjs"
import Investments from '../../models/investments/investmentModel.mjs'
import { InvestmentTypes } from "../../models/investments/userLaunchedInvestments.mjs"
import UserLaunchedInvestments from '../../models/investments/userLaunchedInvestments.mjs'
import { upUserBalance, upUserExperience } from "../../utils/userParameters/upUserBalance.mjs"

const claim = async (investment_type, userId) => {
    if(!Object.values(InvestmentTypes).includes(investment_type)) {
      return
    }

    const user = await User.findOne({ id: userId }, { investment_levels: 1 })
    const userParams = await UserParameters.findOne({ id: userId })
    const userInvestmentLevel = user.investment_levels[investment_type]
    const investmentsOfType = (await Investments.find({ type: investment_type }, { id: 1 })).map(item => item.id)
    const investmentToClaim = await UserLaunchedInvestments.findOne({ user_id: userId, investment_id: { $in: investmentsOfType } }, null, { sort: { createdAt: -1 } })

    if(investmentToClaim) {
        console.log('Auto-claiming for user', userId, investment_type, userInvestmentLevel, investmentToClaim && investmentToClaim.investment_id, investmentToClaim && investmentToClaim.to_claim)
    }

    if(!investmentToClaim || investmentToClaim.claimed) {
      return  
    }

    const investment = await Investments.findOne({ type: investment_type, level: userInvestmentLevel })

    // Make claimable in 10 sec on test
    if(Date.now() - new Date(investmentToClaim.createdAt).getTime() < (process.env.NODE_ENV === 'test' ? 30000 : 3600000)) {
        console.log('here')
      return
    }

    await upUserBalance(userId, investmentToClaim.to_claim)
    await upUserExperience(userId, investment.experience_reward)
    
    investmentToClaim.claimed = true

    await userParams.save()
    await investmentToClaim.save()
    await ( new UserLaunchedInvestments({ user_id: userId, investment_id: investment.id, to_claim: investment.coins_per_hour }) ).save()
}

export const AutoclaimProccess = cron.schedule(
    // every 5 sec
  "*/1 * * * * *",
  async () => {
    try {
        let usersWithAutoclaim = await User.find({
            $or: [
              { "has_autoclaim.game_center": true },
              { "has_autoclaim.zoo_shop": true },
              { "has_autoclaim.coffee_shop": true }
            ]
          });

      for (let user of usersWithAutoclaim) {
        const { has_autoclaim: { game_center = false, zoo_shop = false, coffee_shop = false } } = user

        // autoclaim
        const claim_promises = []
        if(game_center) {
            claim_promises.push(claim(InvestmentTypes.GameCenter, user.id))
        }

        if(zoo_shop) {
            claim_promises.push(claim(InvestmentTypes.ZooShop, user.id))
        }

        if(coffee_shop) {
            claim_promises.push(claim(InvestmentTypes.CoffeeShop, user.id))
        }

        await Promise.all(claim_promises)
      }
    } catch (e) {
      console.log("Error in autoclaim process", e)
    }
  },
  {
    scheduled: false,
  }
)
