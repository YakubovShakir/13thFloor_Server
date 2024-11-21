import UserParameters from "../models/userParametersModel.mjs"

export const getUserParameters = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    if (!userId) return res.status(404).json({ error: "user not found" })

    let parameters = await UserParameters.findOne({ id: userId }, { _id: 0 })
    if (!parameters) {
      parameters = await UserParameters.create({ id: userId })
    }

    return res.status(200).json({ parameters })
  } catch (e) {
    console.log("Error while get parameters ", e)
  }
}
