const getMinutesAndSeconds = (totalSeconds) => {
    const duration = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)
    return { duration, seconds }
}

export default getMinutesAndSeconds
  