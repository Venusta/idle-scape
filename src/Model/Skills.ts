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
  [SkillNames.attack]: new Skill(0),
  [SkillNames.defence]: new Skill(0),
  [SkillNames.strength]: new Skill(0),
  [SkillNames.hitpoints]: new Skill(1154),
  [SkillNames.ranged]: new Skill(0),
  [SkillNames.prayer]: new Skill(0),
  [SkillNames.magic]: new Skill(0),
  [SkillNames.cooking]: new Skill(0),
  [SkillNames.woodcutting]: new Skill(0),
  [SkillNames.fletching]: new Skill(0),
  [SkillNames.fishing]: new Skill(0),
  [SkillNames.firemaking]: new Skill(0),
  [SkillNames.crafting]: new Skill(0),
  [SkillNames.smithing]: new Skill(0),
  [SkillNames.mining]: new Skill(0),
  [SkillNames.herblore]: new Skill(0),
  [SkillNames.agility]: new Skill(0),
  [SkillNames.thieving]: new Skill(0),
  [SkillNames.slayer]: new Skill(0),
  [SkillNames.farming]: new Skill(0),
  [SkillNames.runecrafting]: new Skill(0),
  [SkillNames.hunter]: new Skill(0),
  [SkillNames.construction]: new Skill(0),
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

type MapOfSkills = Map<SkillNames, Skill>;

export const getSkillMap = (): MapOfSkills => {
  const x = new Map<SkillNames, Skill>();

  Object.values(SkillNames).forEach((key: SkillNames) => {
    x.set(key, new Skill(0));
  });

  x.set(SkillNames.hitpoints, new Skill(1154)); // 10 hp

  return x;
};

console.log(getSkillMap());
