import Boost from "../models/boostModel.mjs"

export const getBoosts = async (req, res) => {
  try {
    console.log("Отдаю boosts")
    const boosts = await Boost.find({}).sort({ boost_id: 1 })
    if (boosts) res.status(200).send({ boosts })
  } catch (e) {
    console.log("Error while getBoosts", e)
  }
}
