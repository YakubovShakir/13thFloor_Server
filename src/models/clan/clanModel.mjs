import mongoose from "mongoose"

const clanSchema = new mongoose.Schema({
  clan_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  leader_id: { type: Number, required: true },
  members: [{ type: Number }],
  created_at: { type: Date, default: Date.now },
})

const Clan = mongoose.model("clans", clanSchema)

export default Clan
