/* eslint-disable no-restricted-properties */
/* eslint-disable no-return-assign */
/* eslint-disable arrow-body-style */
/* eslint-disable no-param-reassign */
import { getRandomInt } from "../util";
import { Skills, Skill } from "../types/types";

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

export const expTable = [
  0,
  83,
  174,
  276,
  388,
  512,
  650,
  801,
  969,
  1154,
  1358,
  1584,
  1833,
  2107,
  2411,
  2746,
  3115,
  3523,
  3973,
  4470,
  5018,
  5624,
  6291,
  7028,
  7842,
  8740,
  9730,
  10824,
  12031,
  13363,
  14833,
  16456,
  18247,
  20224,
  22406,
  24815,
  27473,
  30408,
  33648,
  37224,
  41171,
  45529,
  50339,
  55649,
  61512,
  67983,
  75127,
  83014,
  91721,
  101333,
  111945,
  123660,
  136594,
  150872,
  166636,
  184040,
  203254,
  224466,
  247886,
  273742,
  302288,
  333804,
  368599,
  407015,
  449428,
  496254,
  547953,
  605032,
  668051,
  737627,
  814445,
  899257,
  992895,
  1096278,
  1210421,
  1336443,
  1475581,
  1629200,
  1798808,
  1986068,
  2192818,
  2421087,
  2673114,
  2951373,
  3258594,
  3597792,
  3972294,
  4385776,
  4842295,
  5346332,
  5902831,
  6517253,
  7195629,
  7944614,
  8771558,
  9684577,
  10692629,
  11805606,
  13034431,
];

const sk = {
  exp: 200,
};

export const saveObject = {
  agility: sk,
  attack: sk,
  construction: sk,
  cooking: sk,
  crafting: sk,
  defence: sk,
  farming: sk,
  firemaking: sk,
  fishing: sk,
  fletching: sk,
  herblore: sk,
  hitpoints: sk,
  hunter: sk,
  magic: sk,
  mining: sk,
  prayer: sk,
  ranged: sk,
  runecrafting: sk,
  slayer: sk,
  smithing: sk,
  strength: sk,
  thieving: sk,
  woodcutting: sk,
};

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

export const derp = () => { // diff file
  const ahhhh:{[skill: string]: number} = {};
  const herp = skillNames.forEach((skill) => {
    ahhhh[skill] = 0;
  }, {});
  return ahhhh;
};

export const skillData = () : Skills => { // diff file
  const KUT = skillNames.reduce((accum: {[skill: string]: number}, skill: string) => {
    accum[skill] = getRandomInt(0, 200000);
    return accum;
  }, {});
  return KUT as unknown as Skills;
};

// Greenchill's magical example

// Give them string values so they don't default to the stupid numerical ones
// This is important when iterating an enum cause if you iterate keys that have numerical values
// you will get both named keys and numerical keys
enum MySkills {
  woodcutting = "woodcutting",
  gathering = "gathering",
  eating = "eating",
}

// type SkillMap = Map<MySkills, Skill>;

// export const getSkillMap = (): SkillMap => {
//   const myStuff = new Map<MySkills, Skill>();

//   Object.entries(MySkills).forEach((entry) => {
//     const [a, b] = entry;
//     myStuff.set(b, getRandomInt(0, 200000));
//   });

//   return myStuff;
// };

type SkillObject = { [key in MySkills]: number };

export const getSkillObject = (): SkillObject => {
  const stuff = Object.keys(MySkills)
    .map((key) => {
      return {
        [key]: 0,
      };
    })
    .reduce((prev, next) => ({ ...prev, ...next }));

  return stuff as SkillObject;
};

// export const skillData2 = (derp: Skills): Skills => {
//   return derp;
// };

export default skillData;
