import mongoose from "mongoose"

const SaleStatuses = {
  WaitingForPayment: "WAITING_FOR_PAYMENT",
  SendingNFT: "SENDING_NFT",
  TimedOut: "TIMED_OUT",
  Rejected: "REJECTED",
}

const schema = new mongoose.Schema(
  {
    nftAddress: { type: String, required: true, unique: true },
    amountInTon: { type: String, required: true },
    nftMetadataIndex: { type: Number, required: true },
    status: { type: String, enum: Object.values(SaleStatuses), required: true },
  },
  { 
    timestamps: true 
  }
)

const LevelsParameters = mongoose.model("levels_parameters", schema)

export default LevelsParameters
