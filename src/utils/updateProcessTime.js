const updateProcessTime = async (
  process,
  durationCallback,
  endCallback,
  infinity
) => {
  const minuts = process?.duration
  const seconds = process?.seconds

  if (infinity) {
    if (seconds) {
      process.seconds -= 1
      await process.save()
    } else {
      process.seconds = 59
      await process.save()
      if (durationCallback) await durationCallback() // Минутный тик при котором должно что-то произойти
    }
    return
  }
  if (minuts) {
    if (seconds) {
      process.seconds -= 1
    } else {
      process.duration -= 1
      process.seconds = 59
      if (durationCallback) await durationCallback() // Минутный тик при котором должно что-то произойти
    }

    await process.save()
  } else {
    if (seconds - 1 > 0) {
      process.seconds -= 1
      await process.save()
    } else {
      console.log('deleting process')
      await process.deleteOne({ _id: process?._id })
      if (durationCallback) await durationCallback() // Минутный тик при котором должно что-то произойти
      if (endCallback) await endCallback()
    }
  }
}

export default updateProcessTime
