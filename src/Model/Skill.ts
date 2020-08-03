/* eslint-disable max-len */
import { expToLevel } from "../util";

export interface Skill {
  exp: number;
  level: number;
  boost: number;
}

const skill = (exp = 0, boost = 0): Skill => ({
  exp,
  level: expToLevel(exp),
  boost,
});

const didWeLevel = (lvl: number, newLvl: number): boolean => newLvl > lvl;

export const gainExp = (skillData: Skill, amount: number): Skill => {
  const { exp, level } = skillData;
  const newExp = exp + amount;
  if (didWeLevel(level, expToLevel(newExp))) {
    console.log("level up!");
  }
  return { ...skillData, exp: newExp, level: expToLevel(newExp) };
};

export const decide = (payload: { playerID: number; duration: number; skill: string; expReward: number; }): void => {
  console.log(payload);
  console.log("yeeeeeeeeet");
};

export default skill;
