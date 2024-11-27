import Boost from "../../models/boost/boostModel.mjs"

export const getBoosts = async (req, res) => {
  try {
    const boosts = await Boost.find({}).sort({ boost_id: 1 })
    if (boosts) res.status(200).send({ boosts })
  } catch (e) {
    console.log("Error while getBoosts", e)
  }
}

export const buyBoost = async (req, res) => {
  const { userId, boostId } = req.body //

  if (!userId || !boostId) {
    return res.status(400).send({ message: "userId and boostId are required" })
  }

  try {
    const boost = await Boost.findOne({ boost_id: boostId })
    if (!boost) {
      return res.status(404).send({ message: "Boost not found" })
    }

    const user = await UserParameters.findOne({ id: userId })
    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }

    if (user.stars < boost.stars_price) {
      return res.status(400).send({ message: "Not enough stars to buy boost" })
    }

    user.stars -= boost.stars_price

    const userBoostProcess = new UserProcess({
      id: userId,
      active: true,
      type: boost.type,
      type_id: boost.boost_id,
      duration: boost.duration,
    })

    await userBoostProcess.save()
    await user.save()

    res.status(200).send({
      message: "Boost purchased and applied successfully",
      boost: boost,
      remainingStars: user.stars,
    })
  } catch (e) {
    console.error("Error buying boost: ", e)
    res.status(500).send({ error: "Internal server error" })
  }
}
