import process from "../../../models/process/processModel.mjs"

//!! ADD SECONDS CORRECTLY
const addProcess = async (userId, type, typeId, duration, seconds, effects, processExtra) => {
  try {
    if (!["work", "training", "sleep", "skill", "food", "boost"].includes(type))
      return console.log("utils->addProcess - not valid type of process")

    // const active = {
    //   work: true,
    //   training: true,
    //   sleep: true,
    //   skill: false,
    //   food: false,
    //   boost: false,
    // }

    let params = {
      id: userId,
      type: type,
      type_id: typeId,
      duration: duration || 0,
      active: true,
      seconds: seconds || 0,
    }

    if(effects) params.effects = {...effects}
    if(processExtra) params = {...params, ...processExtra}

    await process.create(params)
  } catch (e) {
    console.log("Error while add Process", e)
  }
}
export default addProcess
