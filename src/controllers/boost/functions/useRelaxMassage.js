const useRelaxMassage = async (user) => {
  try {
    user.mood = 100
    await user.save()
    return true
  } catch (e) {
    console.log("Error in useRelaxMassage", e)
    return false
  }
}

export default useRelaxMassage
