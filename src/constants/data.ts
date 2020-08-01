import { levelToExp, expToLevel } from "../util";
import {
  SkillsStats, SkillStats, EquipmentSlots, EquipmentSlotNames,
} from "../types/types";

export const skillNames = [
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

const bleh = {
  exp: 0,
  level: 0,
  boost: 0,
};

export const skillsSaveObject: SkillsStats = {
  attack: bleh,
  defence: bleh,
  strength: bleh,
  hitpoints: bleh,
  ranged: bleh,
  prayer: bleh,
  magic: bleh,
  cooking: bleh,
  woodcutting: bleh,
  fletching: bleh,
  fishing: bleh,
  firemaking: bleh,
  crafting: bleh,
  smithing: bleh,
  mining: bleh,
  herblore: bleh,
  agility: bleh,
  thieving: bleh,
  slayer: bleh,
  farming: bleh,
  runecrafting: bleh,
  hunter: bleh,
  construction: bleh,
};

const playerSave = {
  skills: skillsSaveObject,
};

export const save = (thingToSave: SkillsStats): void => {
  localStorage.setItem("testSave", JSON.stringify(thingToSave));
};

export const loadSave = ():SkillsStats => {
  const test = localStorage.getItem("testSave");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (test) { return JSON.parse(test); }
  return playerSave.skills;
};

export const wipeSave = () => {
  localStorage.removeItem("testSave");
};

// Lazy
export enum SkillNames {
  Attack = "attack",
  Agility = "agility",
  Hitpoints = "hitpoints",
}

export const createFirstStats = (): SkillsStats => skillNames.reduce((accum, skill) => {
  let exp = levelToExp(80);
  if (skill === SkillNames.Hitpoints) {
    exp = levelToExp(80); // 10
  }
  return {
    ...accum,
    [skill]: {
      exp,
      level: expToLevel(exp),
      boost: 0,
    },
  };
}, { ...skillsSaveObject });

// Creates object consisting of item slots as described by enum EquipmentSlots
// as key and item id as value
// export const createItemSlots = (): EquipmentSlots => Object.values(EquipmentSlotNames)
//   .reduce((accum, slot) => ({
//     ...accum,
//     [slot]: 4151,
//   }), {} as EquipmentSlots);

const testGear = {
  head: 2619,
  body: 2615,
  legs: 2617,
  feet: -2,
  hands: -2,
  cape: -2,
  weapon: 4151,
  shield: 8845,
  ammo: -2,
  ring: -2,
  neck: -2,
};

export const createItemSlots = (): EquipmentSlots => testGear as EquipmentSlots;

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

// export const derp = () => { // diff file
//   const ahhhh:{[skill: string]: number} = {};
//   const herp = skillNames.forEach((skill) => {
//     ahhhh[skill] = 0;
//   }, {});
//   return ahhhh;
// };

// export const skillData = () : SkillsStats => { // diff file
//   const KUT = skillNames.reduce((accum: {[skill: string]: number}, skill: string) => {
//     accum[skill] = getRandomInt(0, 200000);
//     return accum;
//   }, {});
//   return KUT as unknown as SkillsStats;
// };

// Greenchill's magical example

// Give them string values so they don't default to the stupid numerical ones
// This is important when iterating an enum cause if you iterate keys that have numerical values
// you will get both named keys and numerical keys
enum MySkills {
  attack = "attack",
  strength = "strength",
  defence = "defence",
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

type SkillObject = { [key in MySkills]: SkillStats };

export const getSkillObject = (): SkillObject => {
  const stuff = Object.keys(MySkills)
    .map((key) => ({
      [key]: {
        // exp: skillObject[key].exp,
      },
    }))
    .reduce((prev, next) => ({ ...prev, ...next }));

  return stuff as SkillObject;
};

// export const skillData2 = (derp: Skills): Skills => {
//   return derp;
// };
