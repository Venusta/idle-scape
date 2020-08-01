import { SkillStats, EquipmentSlots } from "../types/types";
import Skill from "../model/Skill";

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
//     myStuff.set(b, { name: "", exp: 0, level: 0 });
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
