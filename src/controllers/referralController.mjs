import Referal from "../models/referralModel.mjs"

export const getReferralsCount = async (req, res) => {
  console.log("Отдаю реферралов")
  const refer_id = req.params.id
  const referrals = await Referal.find({ refer_id })
  const refCount = referrals.length
  res.status(200).send({ referralsCount: refCount })
}
