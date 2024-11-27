import UserParameters from "../../../models/user/userParametersModel.mjs"
import Food from "../../../models/food/foodModel.mjs"
import UserProcess from "../../../models/process/processModel.mjs"
import cron from "node-cron"

export const FoodProccess = cron.schedule(
  "* * * * *",
  async () => {
    try {
      //get All Food process
      let foodProcesses = await UserProcess.find({ type: "food" })
      let food, userParameters

      for (let process of foodProcesses) {
        // get User Parameters and Food
        userParameters = await UserParameters.findOne({ id: process?.id })
        food = await Food.findOne({ food_id: process?.type_id })

        // Hungry restore
        const hungryRestore = food?.long_hungry_restore?.value / 60
        if (hungryRestore)
          userParameters.hungry = Math.min(
            100,
            userParameters.hungry + hungryRestore
          )

        // MoodRestore
        const moodRestore = food?.long_mood_restore?.value / 60
        if (moodRestore)
          userParameters.mood = Math.min(100, userParameters.mood + moodRestore)

        // Energy restore
        const energyRestore = food?.long_energy_restore?.value / 60
        if (energyRestore)
          userParameters.energy = Math.min(
            userParameters?.energy_capacity,
            userParameters.energy + energyRestore
          )

        await userParameters.save()

        if (process?.duration > 1) {
          process.duration -= 1
          await process.save()
        } else await process.deleteOne({ _id: process?._id })
      }
    } catch (e) {
      console.log("Error when foodProcess", e)
    }
  },
  {
    scheduled: false,
  }
)

export default FoodProccess
