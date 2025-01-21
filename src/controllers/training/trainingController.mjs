import TrainingParameters from "../../models/training/trainingParameters.mjs"
import User from "../../models/user/userModel.mjs"
import UserParameters from "../../models/user/userParametersModel.mjs"

export const getUserTrainingParameters = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    if (!userId) return res.status(400).json({ error: "not valid id" })

    const user = await User.findOne({ id: userId })
    if (!user) return res.status(404).json({ error: "user not found" })

    let parameters = await UserParameters.findOne({ id: userId })
    if (!parameters) {
      parameters = await UserParameters.create({ id: userId })
    }

    let tp = await TrainingParameters.findOne({ level: parameters?.level })
    if (tp) return res.status(200).json({ training_parameters: tp })
    else return res.status(404).json({ error: "tp not found" })
  } catch (e) {
    console.log('From training controller')
    console.log("Error while get parameters ", e)
  }
}
