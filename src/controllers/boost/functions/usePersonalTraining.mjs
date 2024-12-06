import process from "../../../models/process/processModel.mjs"
import addProcess from "../../process/functions/addProcess.mjs"

const usePersonalTraining = async (userId) => {
  try {
    const existProcess = await process.findOne({
      id: userId,
      type: "boost",
      type_id: 3,
    })
    if (existProcess) return false

    await addProcess(userId, "boost", 3)
    return true
  } catch (e) {
    console.log("Error in usePersonalTraining ", e)
    return false
  }
}

export default usePersonalTraining
