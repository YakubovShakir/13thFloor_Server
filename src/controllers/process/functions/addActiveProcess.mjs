import addProcess from "./addProcess.mjs"
import process from "../../../models/process/processModel.mjs"

const addActiveProcess = async (userId, type, typeId, duration, seconds) => {
  const activeProcess = await process.findOne({
    id: userId,
    active: true,
  })
  if (activeProcess) {
    activeProcess.type = type
    activeProcess.type_id = typeId
    activeProcess.duration = duration || 0
    activeProcess.seconds = seconds || 0
    await activeProcess.save()
  } else {
    await addProcess(userId, type, typeId, duration)
  }
}

export default addActiveProcess
