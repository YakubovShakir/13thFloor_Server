import process from "../../../models/process/processModel.js";
import addProcess from "../../process/functions/addProcess.js";
import Boost from "../../../models/boost/boostModel.js";

const useTonicDrink = async (userId, session) => {
  try {
    const boost = await Boost.findOne({ type: "tonic-drink" }).session(session);
    const boostProcess = await process.findOne({
      id: userId,
      type: "boost",
      type_id: boost?.boost_id,
    }).session(session);

    if (boostProcess) {
      boostProcess.duration = boost?.duration;
      await boostProcess.save({ session });
    } else {
      await addProcess(userId, "boost", boost?.boost_id, boost?.duration, null, null, {
        base_duration_in_seconds: boost?.duration * 60,
      }, session);
    }
    return true;
  } catch (e) {
    console.log("Error in useTonicDrink", e);
    return false;
  }
};

export default useTonicDrink;