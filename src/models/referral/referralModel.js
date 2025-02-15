import mongoose from "mongoose"
const schema = new mongoose.Schema(
  {
    refer_id: {
      type: Number,
      required: true,
    },
    referral_id: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)
const Referal = mongoose.model("Referral", schema)
export default Referal
