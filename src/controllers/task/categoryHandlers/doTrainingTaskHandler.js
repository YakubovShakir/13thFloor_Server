import UserStat from "../../../models/user/userStatModel.js"

const doTrainingTaskHandler = async (userId) => {
  try {
    const cond = await UserStat.findOne({ user_id: userId, type: "doTraining" })

    if (cond) return true
    return false
  } catch (e) {
    console.log("Error in doTrainingTaskHandler ", e)
  }
}

export default doTrainingTaskHandler
