import process from "../../../models/process/processModel.mjs"

const addProcess = async (userId, type, typeId, duration, seconds, effects, processExtra) => {
  try {
    if (!["work", "training", "sleep", "skill", "food", "boost"].includes(type))
      return console.log("utils->addProcess - not valid type of process")

    const active = {
      work: true,
      training: true,
      sleep: true,
      skill: false,
      food: false,
      boost: false,
    }

    let params = {
      id: userId,
      type: type,
      type_id: typeId,
      duration: duration || 0,
      active: active[type],
      seconds: seconds || 0,
    }

    if(effects) params.effects = {...effects}
    
    console.log(effects)

    if(processExtra) { 
      console.log('process extra', processExtra)
      const { base_duration_in_seconds = null, target_duration_in_seconds = null, reward_at_the_end = null, sub_type = null} = processExtra

      params.base_duration_in_seconds = base_duration_in_seconds
      params.target_duration_in_seconds = target_duration_in_seconds
      params.reward_at_the_end = reward_at_the_end
      params.sub_type = sub_type
    }

    await process.create(params)
  } catch (e) {
    console.log("Error while add Process", e)
  }
}
export default addProcess
