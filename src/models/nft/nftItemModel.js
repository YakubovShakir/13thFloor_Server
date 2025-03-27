import mongoose from "mongoose";

const nftItemSchema = new mongoose.Schema({
  itemId: { type: Number, required: true },
  index: { type: Number, required: true },
  address: { type: String, required: true, unique: true },
  status: { type: String, enum: ["available", "locked", "sold"], default: "available" },
  memo: { type: String, default: null, unique: true, sparse: true },
  lockedAt: { type: Date, default: null },
  owner: { type: String, default: null },
}, {
  indexes: [
    { key: { itemId: 1, index: 1 }, unique: true }
  ]
});

const NFTItems = mongoose.model("nft_items", nftItemSchema);

export default NFTItems;
