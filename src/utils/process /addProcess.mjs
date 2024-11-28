import process from "../../models/process/processModel.mjs"

export const addProcess = async (userId, type, typeId, duration) => {
  try {
    if (!["work", "training", "sleep", "skill", "food"].includes(type))
      return console.log("utils->addProcess - not valid type of process")

    const active = {
      work: true,
      training: true,
      sleep: true,
      skill: false,
      food: false,
    }

    let params = {
      id: userId,
      type: type,
      type_id: typeId,
      duration: duration || 0,
      active: active[type],
      seconds: new Date().getUTCDate(),
    }

    await process.create(params)
  } catch (e) {
    console.log("Error while add Process", e)
  }
}
