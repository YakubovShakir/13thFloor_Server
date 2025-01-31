import UserProcess from "../../../models/process/processModel.mjs"
import Work from "../../../models/work/workModel.mjs"
import UserParameters from "../../../models/user/userParametersModel.mjs"
import cron from "node-cron"
import upUserBalance from "../../../utils/userParameters/upUserBalance.mjs"
import moment from 'moment-timezone'


const durationFunction = async (process, work, userParameters) => {
  console.log('im here')
  // Apply duration decrease
  const durationDecreasePercentage = process.effects.duration_decrease || 0
  const rewardIncreaseHourly = process.effects.reward_increase || 0

  const baseWorkDuration = work.duration * 60 || 60
  const actualWorkDuration = baseWorkDuration * (1 - durationDecreasePercentage / 100)
  console.log(actualWorkDuration)
  // Convert hourly costs to per-second costs
  const moodCostPerSecond = work.mood_cost_in_hour / 3600
  const hungryCostPerSecond = work.hungry_cost_in_hour / 3600
  const energyCostPerSecond = work.energy_cost_in_hour / 3600

  
  // Calculate time difference since last update
  const now = moment()
  const diffSeconds = now.diff(moment(process.createdAt), 'seconds')
  const processDurationInSeconds = now.diff(moment(process.createdAt), 'seconds')

    // Calculate remaining time with the decreased duration
  const remainingSeconds = Math.max(0, actualWorkDuration - processDurationInSeconds);
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingSecondsAfterMinutes = remainingSeconds % 60;
  
  console.log('@', remainingMinutes, remainingSecondsAfterMinutes)
    // Update process duration and seconds
  process.duration = remainingMinutes;
  process.seconds = remainingSecondsAfterMinutes;
    
  // Calculate costs for the time period
  const periodMoodCost = moodCostPerSecond * diffSeconds
  const periodHungryCost = hungryCostPerSecond * diffSeconds
  const periodEnergyCost = energyCostPerSecond * diffSeconds

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

    const processDurationInSeconds = moment().diff(moment(process.createdAt), 'seconds');
    console.log(processDurationInSeconds, actualWorkDuration, rewardIncreaseHourly)
    if(processDurationInSeconds >= actualWorkDuration) {
      //! Work finished
      const coinReward = (work.coins_in_hour + rewardIncreaseHourly) / 3600 * baseWorkDuration
      console.log(coinReward)
      await upUserBalance(userParameters.id, coinReward)
      await process.deleteOne({ _id: process._id })
      return
    }
    
    // Save changes
    process.user_parameters_updated_at = now.toDate()
    await process.save()
    await userParameters.save()
  } else {
    // If user doesn't have enough resources, end the work process without granting reward
    await process.deleteOne({ _id: process._id })
  }
}

export const WorkProcess = cron.schedule(
  "/10 * * * * *", // Run every 10 seconds
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