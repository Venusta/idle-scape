/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable class-methods-use-this */
import {
  ItemBank, SkillName, EquipmentSlots, EquipmentSlotName, EquipmentSlotNames, SkillsStats,
} from "../../types/types";
import store from "../../redux-stuff";
import { SkillNames } from "../data";

export type SkillReq = { [Key in SkillName]?: number; };

export interface TaskRequirements {
  skills?: SkillReq
  items?: ItemBank
  equipment?: Partial<EquipmentSlots>
}

export default class Requirements {
  private requirements: TaskRequirements;
  private playerEquipment: EquipmentSlots;
  private playerSkills: SkillsStats;

  constructor(playerID: string, requirements: TaskRequirements) {
    this.requirements = requirements;

    this.playerEquipment = store.getState().characters.equipment[playerID];
    this.playerSkills = store.getState().characters.skills[playerID];
  }

  hasReqs = (): boolean => {
    const { requirements, playerEquipment, playerSkills } = this;
    const { skills, equipment, items } = requirements;

    let hasReq = true;

    // console.log(requirements);

    const missingSkills: Array<[SkillName, number]> = [];

    if (skills) { // todo split?
      Object.entries(skills).forEach(([skill, reqLvl]) => {
        if (!this.isValidSkill(skill) || reqLvl === undefined) {
          throw new Error("SHIT FUCK OH NO AAAAA");
        }

        const { level, boost } = playerSkills[skill];

        if (level + boost < reqLvl) {
          hasReq = false;
          missingSkills.push([skill, reqLvl]);
        }
      });
    }
    // console.log(`${missingSkills} too low`);

    const missingEquipment: Array<[EquipmentSlotName, number]> = [];

    if (equipment) {
      Object.entries(equipment).forEach(([itemSlot, itemId]) => {
        if (!this.isValidItemSlot(itemSlot) || itemId === undefined) {
          throw new Error("SHIT FUCK OH NO AAAAA");
        }
        if (playerEquipment[itemSlot] !== itemId) {
          hasReq = false;
          missingEquipment.push([itemSlot, itemId]);
        }
      });
    }
    console.log(missingEquipment);

    if (items) {
      // todo ???
      console.log(items);
    }

    return hasReq;
  };

  isValidSkill(value: string): value is SkillName {
    return value in SkillNames;
  }

  isValidItemSlot(value: string): value is EquipmentSlotName {
    return value in EquipmentSlotNames;
  }
}
