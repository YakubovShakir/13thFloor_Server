import Boost from "../../../models/boost/boostModel.js";
import process from "../../../models/process/processModel.js";
import addProcess from "../../process/functions/addProcess.js";

const useRobotHelper = async (userId, boostId, session) => {
  try {
    const existProcess = await process.findOne({
      id: userId,
      type: "boost",
      type_id: boostId,
    }).session(session);

    const boost = await Boost.findOne({ boost_id: boostId }).session(session);
    if (existProcess) {
      existProcess.duration = boost?.duration;
      await existProcess.save({ session });
    } else {
      await addProcess(userId, "boost", boostId, boost?.duration, null, null, null, session);
    }
    return true;
  } catch (e) {
    console.log("Error in useRobotHelper ", e);
    return false;
  }
};

export default useRobotHelper;