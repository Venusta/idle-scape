/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import {
  SkillData, TaskEquipmentData, ItemData, TaskRequirements, EquipmentSlots, SkillMap,
} from "../types/types";
import { Skills } from "../model/Skills";

interface CharacterState {
  name: string;
  skills: Skills;
  equipment: EquipmentSlots;
  bank: ItemData[];
}

export const hasSkills = (characterSkills: Skills, skills: SkillMap): boolean => {
  return Array.from(skills).map(([skill, level]) => characterSkills[skill].level >= level).every((b) => b);
};

export const hasEquipment = (characterEquipment: EquipmentSlots, equipment: TaskEquipmentData[]): boolean => {
  return equipment.map(({ item, slot }) => characterEquipment[slot] === item).every((b) => b);
};

export const hasItems = (playerItems: ItemData[], items: ItemData[], amount: number): boolean => {
  return items.map(({ item, amount: amt }) => {
    const index = playerItems.find((element) => (item === element.item && element.amount >= amt * amount));
    if (!index) {
      return false;
    }
    return true;
  }).every((b) => b);
};

export const getItemFromBank = (playerItems: ItemData[], item: number): ItemData | undefined => {
  const index = playerItems.find((element) => (item === element.item && element.amount));
  return index;
};

export const hasReqs = (character: CharacterState, requirements: TaskRequirements, amount: number): boolean => {
  const { skills, equipment, bank } = character;
  const haveSkills = hasSkills(skills, requirements.skills);
  const haveEquipment = hasEquipment(equipment, requirements.equipment);
  const haveItems = hasItems(bank, requirements.items, amount);
  return haveSkills && haveEquipment && haveItems;
};
