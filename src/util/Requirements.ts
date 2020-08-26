/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import {
  TaskEquipmentData, ItemData, TaskRequirements, EquipmentSlots, SkillMap, ExpMap, SkillName,
} from "../types/types";
import { expToLevel } from ".";
import { Skills } from "../model/Skills";

interface CharacterState {
  name: string;
  skills: Skills;
  equipment: EquipmentSlots;
  bank: ItemData[];
}

export const hasSkillsOld = (characterSkills: Skills, skills: SkillMap, gainedExp: ExpMap = new Map([])): boolean => { // good for req msg
  return Array
    .from(skills)
    .map(([skill, level]) => expToLevel(characterSkills[skill].exp + (gainedExp.get(skill) ?? 0), characterSkills[skill].level) >= level)
    .every((b) => b);
};

export const hasSkills = (characterSkills: Skills, skills: SkillMap, gainedExp: ExpMap = new Map([])): boolean => {
  let reqs = true;
  skills.forEach((reqLevel, skill) => {
    if (expToLevel(characterSkills[skill].exp + (gainedExp.get(skill) ?? 0), characterSkills[skill].level) < reqLevel) { // <=?
      reqs = false;
    }
  });
  return reqs;
};

export const hasEquipment = (characterEquipment: EquipmentSlots, equipment: TaskEquipmentData[]): boolean => {
  return equipment.map(({ item, slot }) => characterEquipment[slot] === item).every((b) => b);
};

export const hasItems = (characterItems: ItemData[], items: ItemData[], amount: number): boolean => {
  return items.map(({ item, amount: amt }) => {
    const index = characterItems.find((element) => (item === element.item && element.amount >= amt * amount));
    if (!index) {
      return false;
    }
    return true;
  }).every((b) => b);
};

export const getItemFromBank = (characterItems: ItemData[], item: number): ItemData | undefined => {
  const index = characterItems.find((element) => (item === element.item && element.amount));
  return index;
};

export const hasReqs = (character: CharacterState, requirements: TaskRequirements, amount: number): boolean => {
  const { skills, equipment, bank } = character;
  const haveSkills = hasSkills(skills, requirements.skills);
  const haveEquipment = hasEquipment(equipment, requirements.equipment);
  const haveItems = hasItems(bank, requirements.items, amount);
  return haveSkills && haveEquipment && haveItems;
};
