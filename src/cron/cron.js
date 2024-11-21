import cron from "node-cron"
import UserProcess from "../models/userProcessModel.mjs"
import UserParameters from "../models/userParametersModel.mjs"
import User from "../models/userModel.mjs"
import Food from "../models/foodModel.mjs"
import Skill from "../models/skillModel.mjs"
import UserSkills from "../models/userSkillsModel.mjs"
import TrainingParameters from "../models/trainingsParameters.mjs"
const FoodProccess = cron.schedule(
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

const SkillProccess = cron.schedule(
  "* * * * *",
  async () => {
    try {
      //get All Food process
      let skillProcesses = await UserProcess.find({ type: "skill" })

      for (let process of skillProcesses) {
        if (process?.duration > 1) {
          process.duration -= 1
          await process.save()
        } else {
          await UserSkills.create({
            id: process?.id,
            skill_id: process?.type_id,
          })
          await process.deleteOne({ _id: process?._id })
        }
      }
    } catch (e) {
      console.log("Error when SkillProcess", e)
    }
  },
  {
    scheduled: false,
  }
)

const TrainingProccess = cron.schedule(
  "* * * * *",
  async () => {
    try {
      //get All Training Processes
      let processes = await UserProcess.find({ type: "training" })

      for (let process of processes) {
        const parameters = await UserParameters.findOne({ id: process?.id })
        const tp = await TrainingParameters.findOne({ level: process?.type_id })

        if (
          parameters?.hungry < tp?.hungry_spend ||
          parameters?.energy < tp?.energy_spend
        ) {
          parameters.mood = Math.min(100, tp?.mood_profit + parameters?.mood)
          await process.deleteOne({ _id: process?._id })
          return
        }

        parameters.hungry -= tp?.hungry_spend
        parameters.energy -= tp?.energy_spend

        if (process?.duration > 1) {
          process.duration -= 1
          await process.save()
        } else {
          parameters.mood = Math.min(100, tp?.mood_profit + parameters?.mood)

          await process.deleteOne({ _id: process?._id })
        }
        parameters.save()
      }
    } catch (e) {
      console.log("Error when Training process", e)
    }
  },
  {
    scheduled: false,
  }
)

const gameTimer = {
  FoodProccess,
  SkillProccess,
  TrainingProccess,
}

export default gameTimer
