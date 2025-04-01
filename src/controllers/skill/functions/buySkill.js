import UserParameters from "../../../models/user/userParametersModel.js";
import Skill from "../../../models/skill/skillModel.js";
import UserSkill from "../../../models/user/userSkillModel.js";
import process from "../../../models/process/processModel.js";
import addProcess from "../../process/functions/addProcess.js";
import addActiveProcess from "../../process/functions/addActiveProcess.js";
import { ConstantEffects } from "../../../models/effects/constantEffectsLevels.js";
import { upUserExperience } from "../../../utils/userParameters/upUserBalance.js";
import { withTransaction } from "../../../utils/dbUtils.js"
import getMinutesAndSeconds from "../../../utils/getMinutesAndSeconds.js";

const buySkill = async (userId, skillId, sub_type, session) => {
  try {
    const result = await withTransaction(async (session) => {
      const user = await UserParameters.findOne({ id: userId }).session(session);
      const skill = sub_type
        ? await ConstantEffects.findOne({ id: skillId }).session(session)
        : await Skill.findOne({ skill_id: skillId }).session(session);
      console.log(skill, sub_type);
      if (!user || !skill) {
        return { status: 404, data: { error: "User or skill not found by given id!" } };
      }

      // Check if user already has this skill (for regular skills only)
      if (!sub_type) {
        const userHaveSkill = await UserSkill.findOne({
          id: userId,
          skill_id: skillId,
        }).session(session);
        if (userHaveSkill) {
          return { status: 400, data: { error: "Skill already exists" } };
        }
      }

      // Check if a learning process for this skill already exists
      const processExist = await process.findOne({
        id: userId,
        type: "skill",
        skill_id: skillId,
        sub_type,
      }).session(session);
      if (processExist) {
        return { status: 400, data: { error: "in Learning!" } };
      }

      // Check required skill (for regular skills only)
      if (!sub_type && skill?.skill_id_required) {
        const userRequiredSkill = await UserSkill.findOne({
          skill_id: skill?.skill_id_required,
        }).session(session);
        if (!userRequiredSkill) {
          return { status: 400, data: { error: "Need Required Skill!" } };
        }
      }

      const skillPrice = skill?.price || skill.coins_price;
      console.log(skillPrice);
      const requiredLevel = sub_type === 'constant_effects' ? skill.required_level : skill.requiredLevel;
      if (user?.coins < skillPrice || user?.level < requiredLevel) {
        return { status: 400, data: { error: "Balance or level not enough!" } };
      }

      user.coins -= skillPrice;
      const durationInSeconds = skill.duration * 60;
      const baseDuration = (skill?.duration || 1) * 60; // in secs for precision
      const { duration, seconds } = getMinutesAndSeconds(durationInSeconds);

      await addActiveProcess(
        userId,
        "skill",
        skillId,
        duration,
        seconds,
        null,
        {
          base_duration_in_seconds: baseDuration,
          target_duration_in_seconds: null, // Increased through boost logic
          sub_type,
        },
        session
      );

      await user.save({ session });
      return { status: 200, data: { status: "ok" } };
    }, session); // Pass session to withTransaction if already in a transaction

    return result;
  } catch (e) {
    console.log("Error in buySkill - ", e);
    return { status: 500, data: { error: "Internal server error" } };
  }
};

export default buySkill;