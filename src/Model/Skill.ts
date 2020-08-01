import { expToLevel } from "../util";
import { SkillStats } from "../types/types";

const Skill = (exp: number): SkillStats => ({
  exp,
  level: expToLevel(exp),
  boost: 0,
});

export default Skill;
