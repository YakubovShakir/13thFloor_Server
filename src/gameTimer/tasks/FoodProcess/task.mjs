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
      let food, user

      for (let process of foodProcesses) {
        // get User Parameters and Food
        user = await UserParameters.findOne({ id: process?.id })
        food = await Food.findOne({ food_id: process?.type_id })

        // Hungry restore
        const hungryRestore = food?.long_hungry_restore?.value / 60
        if (hungryRestore)
          user.hungry = Math.min(
            100,
            user.hungry + hungryRestore
          )

        // MoodRestore
        const moodRestore = food?.long_mood_restore?.value / 60
        if (moodRestore)
          user.mood = Math.min(100, user.mood + moodRestore)

        // Energy restore
        const energyRestore = food?.long_energy_restore?.value / 60
        if (energyRestore)
          user.energy = Math.min(
            user?.energy_capacity,
            user.energy + energyRestore
          )

        await user.save()

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
