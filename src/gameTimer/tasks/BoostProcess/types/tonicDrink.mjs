const tonicDrinkDurationFunction = async (user) => {
  user.energy = Math.min(
    user?.energy_capacity,
    user.energy + user.energy_capacity * 0.03
  )
  await user.save()
}

export default tonicDrinkDurationFunction
