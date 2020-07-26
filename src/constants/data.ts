/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
import { getRandomInt } from "../util";
import { Skills, Skill } from "../types/types";
import Player from "../model/Player";

const skillNames = [
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

// export const skillData = (): Partial<Skills> => {
// export const skillDataFUCK = ():Partial<Skills> => {
// eslint-disable-next-line max-len
// const fuck: Partial<Skills> = skillNames.reduce((accum: Record<string, Skill>, skill: string) => {
//     accum[skill] = {
//       xp: 0,
//       level: 0,
//     };
//     return accum;
//   }, {});
//   return fuck;
// };

// export const skillData2 = () => {
//   const KUT = skillNames.reduce((accum: {[skill: string]: number}, skill: string) => {
//     accum[skill as keyof Skills] = getRandomInt(0, 200000);
//     return accum;
//   }, {});
//   return new Player({
//     id: 1,
//     name: "yeetus",
//     skills: KUT,
//   });
// };

export const skillData = () : Skills => {
  const KUT = skillNames.reduce((accum: {[skill: string]: number}, skill: string) => {
    accum[skill] = getRandomInt(0, 200000);
    return accum;
  }, {});
  return KUT as unknown as Skills;
};

export const testFuck = {
  agility: 0,
  attack: 0,
  construction: 0,
  cooking: 0,
  crafting: 0,
  defence: 0,
  farming: 0,
  firemaking: 0,
  fishing: 0,
  fletching: 0,
  herblore: 0,
  hitpoints: 0,
  hunter: 0,
  magic: 0,
  mining: 0,
  prayer: 0,
  ranged: 0,
  runecrafting: 0,
  slayer: 0,
  smithing: 0,
  strength: 0,
  thieving: 0,
  woodcutting: 0,
};

// export const skillData2 = (derp: Skills): Skills => {
//   return derp;
// };

export default skillData;
