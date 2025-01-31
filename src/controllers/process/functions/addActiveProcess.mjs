import addProcess from "./addProcess.mjs"
import process from "../../../models/process/processModel.mjs"

const addActiveProcess = async (userId, type, typeId, duration, seconds, effects, processExtra) => {
  const activeProcess = await process.findOne({
    id: userId,
    active: true,
  })
  if (activeProcess && type !== 'skill') {
    activeProcess.type = type
    activeProcess.type_id = typeId
    activeProcess.duration = duration || 0
    activeProcess.seconds = seconds || 0
    if(effects) activeProcess.effects = {...effects}
    if(processExtra) { 
      console.log('process extra', processExtra)
      const { base_duration_in_seconds = null, target_duration_in_seconds = null, reward_at_the_end = null} = processExtra

      activeProcess.base_duration_in_seconds = base_duration_in_seconds
      activeProcess.target_duration_in_seconds = target_duration_in_seconds
      activeProcess.reward_at_the_end = reward_at_the_end
    }
    
    await activeProcess.save()
  } else {
    await addProcess(userId, type, typeId, duration,seconds, effects, processExtra)
  }
}

export default addActiveProcess
