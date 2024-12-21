import UserParameters from "../../../models/user/userParametersModel.mjs"

const levelTaskHandler = async (levelRequired, parameters) => {
  try {
    const cond = parameters.level >= levelRequired
    if (cond) return true
    return false
  } catch (e) {
    console.log("Error in taskLevelHandler - ", e)
  }
}

export default levelTaskHandler
