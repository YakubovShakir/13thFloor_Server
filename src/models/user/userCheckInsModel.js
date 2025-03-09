import mongoose from "mongoose";

const UserCheckInsSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    check_in_date: { type: Date, default: Date.now },
    streak: { type: Number, default: 1 }, // Tracks day in cycle (1-7)
    last_check_in: { type: Date }, // For streak calculation
    is_claimed: { type: Boolean, default: false }, // Whether reward was claimed
  });

const UserCheckInsModel = mongoose.model('user_checkin', UserCheckInsSchema)

export default UserCheckInsModel;