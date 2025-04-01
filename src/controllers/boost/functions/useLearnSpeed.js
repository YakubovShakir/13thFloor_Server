import moment from "moment-timezone";
import { ConstantEffects } from "../../../models/effects/constantEffectsLevels.js";
import process from "../../../models/process/processModel.js";
import Skill from "../../../models/skill/skillModel.js";
import UserParameters from "../../../models/user/userParametersModel.js";
import UserSkill from "../../../models/user/userSkillModel.js";

const useLearnSpeed = async (userId, skillId, sub_type, speedRate, session) => {
  try {
    const skill = sub_type === 'constant_effects'
      ? await ConstantEffects.findOne({ id: skillId }).session(session)
      : await Skill.findOne({ skill_id: skillId }).session(session);
    if (!skill) return false;

    const learningSkillProcess = await process.findOne({
      id: userId,
      type: "skill",
      type_id: skillId,
      sub_type,
    }).session(session);

    if (!learningSkillProcess) return false;

    learningSkillProcess.target_duration_in_seconds = learningSkillProcess.target_duration_in_seconds
      ? Math.ceil(learningSkillProcess.target_duration_in_seconds * (1 - speedRate / 100))
      : Math.ceil(learningSkillProcess.base_duration_in_seconds * (1 - speedRate / 100));

    const elapsedSeconds = moment().diff(learningSkillProcess.createdAt, 'seconds');
    if (learningSkillProcess.target_duration_in_seconds <= elapsedSeconds) {
      if (sub_type === 'constant_effects') {
        const userParameters = await UserParameters.findOne({ id: userId }, { constant_effects_levels: 1 }).session(session);
        userParameters.constant_effects_levels[skill.type] = skill.level;
        await userParameters.save({ session });
      } else {
        await new UserSkill({ id: userId, skill_id: skill.skill_id }).save({ session });
      }
      await process.deleteOne({ id: userId, type: "skill", type_id: skillId, sub_type }).session(session);
    } else {
      await learningSkillProcess.save({ session });
    }
    return true;
  } catch (e) {
    console.log("Error in useLearnSpeed ", e);
    return false;
  }
};

export default useLearnSpeed;