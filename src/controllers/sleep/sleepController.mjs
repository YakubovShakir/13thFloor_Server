import process from "../../models/process/processModel.mjs"
import LevelsParameters from "../../models/level/levelParametersModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"
import addActiveProcess from "../process/functions/addActiveProcess.mjs"

export const startSleep = async (userId) => {
  try {
    const user = await UserParameters.findOne({id: userId})
    const level = await LevelsParameters.findOne({level: user?.level})

    await addActiveProcess(userId, "sleep", user?.level, level?.sleep_duration)

    return { status: 200, data: {message: "Succesfully start sleep!"}}
  } catch (e) {
    console.log("Error in startSleep", e)
  }
}