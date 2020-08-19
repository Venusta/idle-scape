/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import {
  SkillData, TaskEquipmentData, ItemData, TaskRequirements,
} from "../types/types";
import { store } from "../redux-stuff";

// export const haveSkills = (playerID: string, skills: SkillData[]): (boolean | SkillName)[][] => {
//   const playerSkills = store.getState().characters.skills[playerID];

//   return skills.map(({ skill, level }) => {
//     if (playerSkills[skill].level < level) {
//       return [false, skill];
//     }
//     return [true, skill];
//   });
// };

// export const haveEquipment = (playerID: string, equipment: TaskEquipmentData[]): (boolean | EquipmentSlotName)[][] => {
//   const playerEquipment = store.getState().characters.equipment[playerID];

//   return equipment.map(({ item, slot }) => {
//     if (playerEquipment[slot] !== item) {
//       return [false, slot];
//     }
//     return [true, slot];
//   });
// };

// export const haveItems = (playerID: string, items: ItemData[], amount: number): (boolean | number)[][] => {
//   const playerItems = store.getState().characters.banks[playerID];

//   return items.map(({ item, amount: amt }) => {
//     const newAmount = amount * amt;
//     const index = playerItems.find((element) => (item === element.item && element.amount >= newAmount));
//     if (!index) {
//       return [false, item];
//     }
//     return [true, item];
//   });
// };

export const hasSkills = (playerID: string, skills: SkillData[]): boolean => {
  const playerSkills = store.getState().characters.skills[playerID];
  return skills.map(({ skill, level }) => playerSkills[skill].level >= level).every((b) => b);
};

export const hasEquipment = (playerID: string, equipment: TaskEquipmentData[]): boolean => {
  const playerEquipment = store.getState().characters.equipment[playerID];
  return equipment.map(({ item, slot }) => playerEquipment[slot] === item).every((b) => b);
};

export const hasItems = (playerID: string, items: ItemData[], amount: number): boolean => {
  const playerItems = store.getState().characters.banks[playerID];
  return items.map(({ item, amount: amt }) => {
    const index = playerItems.find((element) => (item === element.item && element.amount >= amt * amount));
    if (!index) {
      return false;
    }
    return true;
  }).every((b) => b);
};

export const hasReqs = (playerID: string, requirements: TaskRequirements, amount: number): boolean => {
  const haveSkills = hasSkills(playerID, requirements.skills);
  const haveEquipment = hasEquipment(playerID, requirements.equipment);
  const haveItems = hasItems(playerID, requirements.items, amount);
  return haveSkills && haveEquipment && haveItems;
};
