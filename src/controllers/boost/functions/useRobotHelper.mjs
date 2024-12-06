import Boost from "../../../models/boost/boostModel.mjs"
import process from "../../../models/process/processModel.mjs"
import addProcess from "../../process/functions/addProcess.mjs"

const useRobotHelper = async (userId, boostId) => {
  try {
    const existProcess = await process.findOne({
      id: userId,
      type: "boost",
      type_id: boostId,
    })
    const boost = await Boost.findOne({ boost_id: boostId })
    if (existProcess) {
      existProcess.duration = boost?.duration
      await existProcess.save()
    } else {
      await addProcess(userId, "boost", boostId, boost?.duration)
    }
    return true
  } catch (e) {
    console.log("Error in useRobotHelper ", e)
    return false
  }
}

export default useRobotHelper
