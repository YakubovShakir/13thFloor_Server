import Referal from "../../models/referral/referralModel.mjs"

export const getReferralsCount = async (req, res) => {
  try {
    const refer_id = req.params.id
    if (refer_id) {
      const referrals = await Referal.find({ refer_id })
      res.status(200).send({ referralsCount: referrals.length || 0 })
    } else console.log("Error while Parse: refer_id from request parameters")
  } catch (e) {
    console.log("Error while referral count ", e)
  }
}
