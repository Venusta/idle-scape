/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { SkillsStats, SkillStats } from "../types/types";
import Skill from "./Skill";
import { expToLevel, levelToExp } from "../util";

// export const createFirstStats = (): SkillsStats => skillList.reduce((accum, skill) => {
//   let exp = levelToExp(80);
//   if (skill === SkillNames.hitpoints) {
//     exp = levelToExp(80); // 10
//   }
//   return {
//     ...accum,
//     [skill]: {
//       exp,
//       level: expToLevel(exp),
//       boost: 0,
//     },
//   };
// }, { } as SkillsStats); // TODO remake this maybe

export const skillList = [
  "attack",
  "defence",
  "strength",
  "hitpoints",
  "ranged",
  "prayer",
  "magic",
  "cooking",
  "woodcutting",
  "fletching",
  "fishing",
  "firemaking",
  "crafting",
  "smithing",
  "mining",
  "herblore",
  "agility",
  "thieving",
  "slayer",
  "farming",
  "runecrafting",
  "hunter",
  "construction",
];

export enum SkillNames {
  attack = "attack",
  defence = "defence",
  strength = "strength",
  hitpoints = "hitpoints",
  ranged = "ranged",
  prayer = "prayer",
  magic = "magic",
  cooking = "cooking",
  woodcutting = "woodcutting",
  fletching = "fletching",
  fishing = "fishing",
  firemaking = "firemaking",
  crafting = "crafting",
  smithing = "smithing",
  mining = "mining",
  herblore = "herblore",
  agility = "agility",
  thieving = "thieving",
  slayer = "slayer",
  farming = "farming",
  runecrafting = "runecrafting",
  hunter = "hunter",
  construction = "construction",
}

export const initialSkills: SkillsStats = {
  [SkillNames.attack]: Skill(0),
  [SkillNames.defence]: Skill(0),
  [SkillNames.strength]: Skill(0),
  [SkillNames.hitpoints]: Skill(1154),
  [SkillNames.ranged]: Skill(0),
  [SkillNames.prayer]: Skill(0),
  [SkillNames.magic]: Skill(0),
  [SkillNames.cooking]: Skill(0),
  [SkillNames.woodcutting]: Skill(0),
  [SkillNames.fletching]: Skill(0),
  [SkillNames.fishing]: Skill(0),
  [SkillNames.firemaking]: Skill(0),
  [SkillNames.crafting]: Skill(0),
  [SkillNames.smithing]: Skill(0),
  [SkillNames.mining]: Skill(0),
  [SkillNames.herblore]: Skill(0),
  [SkillNames.agility]: Skill(0),
  [SkillNames.thieving]: Skill(0),
  [SkillNames.slayer]: Skill(0),
  [SkillNames.farming]: Skill(0),
  [SkillNames.runecrafting]: Skill(0),
  [SkillNames.hunter]: Skill(0),
  [SkillNames.construction]: Skill(0),
};
/* eslint no-param-reassign: ["error", { "props": false }] */
const setLevels = (skills: SkillsStats, level = 99): SkillsStats => {
  Object.keys(skills).forEach((key) => {
    skills[key as SkillNames].level = level;
    skills[key as SkillNames].exp = levelToExp(level);
  });
  return skills;
};

const setExp = (skills: SkillsStats, exp = 132000000): SkillsStats => {
  Object.keys(skills).forEach((key) => {
    skills[key as SkillNames].level = expToLevel(exp);
    skills[key as SkillNames].exp = exp;
  });
  return skills;
};

export const Skills = (): SkillsStats => {
  let x = initialSkills;
  // Object.entries(x).forEach((key) => {
  //   console.log(key);
  // });
  x = setExp(x);
  return x;
};
