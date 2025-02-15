import Boost from "../../../models/boost/boostModel.js"
import process from "../../../models/process/processModel.js"
import addProcess from "../../process/functions/addProcess.js"

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
