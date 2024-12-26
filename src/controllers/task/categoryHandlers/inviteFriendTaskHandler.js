import Referal from "../../../models/referral/referralModel.mjs"
const inviteFriendTaskHandler = async (userId, refCount) => {
  const referrals = await Referal.find({ refer_id: userId })
  if (referrals?.length >= refCount) return true
  return false
}

export default inviteFriendTaskHandler
