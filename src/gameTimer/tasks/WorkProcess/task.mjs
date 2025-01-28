import UserProcess from "../../../models/process/processModel.mjs"
import Work from "../../../models/work/workModel.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import upUserBalance from "../../../utils/userParameters/upUserBalance.mjs"
import moment from 'moment-timezone'


const durationFunction = async (process, work, userParameters) => {
  // Convert hourly costs to per-second costs
  const moodCostPerSecond = work.mood_cost_in_hour / 3600
  const hungryCostPerSecond = work.hungry_cost_in_hour / 3600
  const energyCostPerSecond = work.energy_cost_in_hour / 3600
  const coinRewardPerSecond = work.coins_in_hour / 3600
  
  // Calculate time difference since last update
  const diffSeconds = moment().diff(moment(process.updatedAt), 'seconds')
  
  // Calculate costs for the time period
  const periodMoodCost = moodCostPerSecond * diffSeconds
  const periodHungryCost = hungryCostPerSecond * diffSeconds
  const periodEnergyCost = energyCostPerSecond * diffSeconds
  const periodCoinReward = coinRewardPerSecond * diffSeconds

  // Check if user has enough resources
  const canContinueWork = 
    Math.floor(userParameters.mood) >= periodMoodCost &&
    Math.floor(userParameters.energy) >= periodEnergyCost &&
    Math.floor(userParameters.hungry) >= periodHungryCost

  if (canContinueWork) {
    // Deduct resources
    userParameters.mood = Math.max(0, userParameters.mood - periodMoodCost)
    userParameters.energy = Math.max(0, userParameters.energy - periodEnergyCost)
    userParameters.hungry = Math.max(0, userParameters.hungry - periodHungryCost)
    
    // Add coins
    await upUserBalance(userParameters.id, periodCoinReward)

    // Update timer
    let newSeconds = Math.max(0, process.seconds - diffSeconds)
    
    // If we've passed the previous timer, reset to 1 minute
    if (newSeconds <= 0) {
      // Calculate how many seconds have passed into the new minute
      const extraSeconds = Math.abs(newSeconds)
      process.duration = 0
      process.seconds = 60 - extraSeconds
    } else {
      process.duration = 0
      process.seconds = newSeconds
    }
    
    process.updatedAt = new Date()
    
    // Save changes
    await process.save()
    await userParameters.save()
  } else {
    // If user doesn't have enough resources, end the work process
    await process.deleteOne({ _id: process._id })
  }
}

export const WorkProcess = cron.schedule(
  "*/5 * * * * *", // Run every 10 seconds
  async () => {
    try {
      // Get all work processes
      const processes = await UserProcess.find({ type: "work" })
      
      for (let process of processes) {
        const userParameters = await UserParameters.findOne({ id: process.id })
        const work = await Work.findOne({ work_id: process.type_id })
        
        if (!userParameters || !work) {
          console.log("Work process error: work or userParameters not found")
          continue
        }

        await durationFunction(process, work, userParameters)
      }
    } catch (e) {
      console.log("Error in WorkProcess:", e)
    }
  },
  {
    scheduled: false,
  }
)