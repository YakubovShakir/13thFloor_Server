import User from "../../models/user/userModel.mjs"
import Referal from "../../models/referral/referralModel.mjs"
import LevelsParamters from "../../models/level/levelParametersModel.mjs"

export const getUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)

    console.log("Отдаю инфу по пользователю", userId)
    if (userId) {
      const user = await User.findOne({ id: userId })
      if (user)
        return res
          .status(200)
          .json({ userId: user.id, prestart: user.prestart })
    }
  } catch (e) {
    console.log("Error while get user ", e)
    return res.status(404).json({ message: "User not found" })
  }
}
export const updateUserPrestart = async (req, res) => {
  try {
    const userId = req.params.id
    const referrals = await Referal.find({ refer_id: userId })
    const refCount = referrals.length
    if (refCount < 5)
      return res.status(400).json({ message: "Not enough referrals" })
    if (!parseInt(userId))
      return res.status(400).json({ message: "User id must be Integer" })

    const user = await User.findOne({ id: userId })
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found or status already updated." })

    const result = await user.updateOne({
      prestart: true, // Обновляемое поле
    })
    // Проверяем, было ли обновление успешным
    if (result.modifiedCount > 0) {
      return res
        .status(200)
        .json({ message: "User prestart status updated successfully." })
    } else {
      return res
        .status(404)
        .json({ message: "User not found or status already updated." })
    }
  } catch (e) {
    console.log("Error while updating prestart claim status: ", e)
    return res.status(500).json({ message: "Internal server error." })
  }
}

export const getLevelsParameters = async (req, res) => {
  try {
    const levels = await LevelsParamters.find({}, {_id: false})
    return res.status(200).json({levels})
  } catch (e) {
    console.log("Error in getLevelParameters", e)
  }
}