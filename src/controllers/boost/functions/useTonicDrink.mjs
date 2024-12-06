import process from "../../../models/process/processModel.mjs"
import addProcess from "../../process/functions/addProcess.mjs"
import Boost from "../../../models/boost/boostModel.mjs"

const useTonicDrink = async (userId) => {
  try {
    const boost = await Boost.findOne({ type: "tonic-drink" })
    const boostProcess = await process.findOne({
      id: userId,
      type: "boost",
      type_id: boost?.boost_id,
    })

    if (boostProcess) {
      boostProcess.duration = boost?.duration
      await boostProcess.save()
    } else {
      await addProcess(userId, "boost", boost?.boost_id, boost?.duration)
    }
    return true
  } catch (e) {
    console.log("Error in useTonicDrink", e)
    return false
  }
}
export default useTonicDrink
