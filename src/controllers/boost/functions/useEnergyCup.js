const useEnergyCup = async (user) => {
  // Увеличивает на 100% енергию пользователя
  try {
    user.energy = user?.energy_capacity
    await user.save()
    return true
  } catch (e) {
    console.log("Error in useEnergyCup ", e)
    return false
  }
}

export default useEnergyCup
