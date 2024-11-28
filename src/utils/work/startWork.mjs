export const startWork = async (userId) => {
  try {
    // Получение параметров и работы
    const user = await UserParameters.findOne({ id: userId })
    const work = await Work.findOne({ work_id: user?.work_id })
    if (!user || !work)
      return res.status(404).json({ error: "User or work not found" })

    // Проверка на наличие необходимых параметров
    const moodCosts = work?.mood_cost_in_hour / 60
    const hungryCosts = work?.hungry_cost_in_hour / 60
    const energyCosts = work?.energy_cost_in_hour / 60
    const cond =
      user?.mood >= moodCosts &&
      user?.energy >= energyCosts &&
      user?.hungry >= hungryCosts
    if (!cond)
      return {
        status: 400,
        data: { error: "Not enough Mood or Energy or Hungry" },
      }

    await addActiveProcess(userId, "work", user?.work_id)

    return { status: 200, data: { status: "ok" } }
  } catch (e) {
    console.log("ERR in buy work controller - ", e)
  }
}
