import Referal from "../models/referralModel.mjs"

export const getReferralsCount = async (req, res) => {
  try {
    console.log("Отдаю реферралов")
    const refer_id = req.params.id
    const referrals = await Referal.find({ refer_id })
    const refCount = referrals.length
    res.status(200).send({ referralsCount: refCount })
  } catch (e) {
    console.log("Error while referral count ", e)
  }
}
