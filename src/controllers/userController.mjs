import User from "../models/userModel.mjs"
import Referal from "../models/referralModel.mjs"
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
      console.log(user)
    }
  } catch (e) {
    console.log("Error while get user ", e)
    return res.status(404).json({ message: "User not found" })
  }
}
export const updateUserPrestart = async (req, res) => {
  try {
    console.log("Обновляю статус ")
    const userId = req.params.id
    console.log(userId)
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
    console.log(result)
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
