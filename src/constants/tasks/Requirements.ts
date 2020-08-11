/* eslint-disable arrow-body-style */

import {
  SkillName, EquipmentSlotName, EquipmentSlotNames, TaskRequirements, EquipmentSlots, SkillsStats,
} from "../../types/types";
import store from "../../redux-stuff";
import { SkillNames } from "../data";

const isValidSkill = (value: string): value is SkillName => value in SkillNames;

const isValidItemSlot = (value: string): value is EquipmentSlotName => value in EquipmentSlotNames;

export default class Requirements {
  private requirements: TaskRequirements;
  private playerEquipment: EquipmentSlots;
  private playerSkills: SkillsStats;
  // private missingReqs: TaskRequirements;

  constructor(playerID: string, requirements: TaskRequirements) {
    this.requirements = requirements;

    this.playerEquipment = store.getState().characters.equipment[playerID];
    this.playerSkills = store.getState().characters.skills[playerID];
    // this.missingReqs = {
    //   skills: [],
    //   items: [],
    //   equipment: [],
    // };
  }

  haveReqs = (): boolean => {
    const { requirements } = this;
    const { skills, equipment, items } = requirements;

    let hasReq = true;

    const hasSkillReq = skills.map(({ skill, level }) => {
      if (this.playerSkills[skill].level < level) {
        hasReq = false; // todo remove later prob
        console.log(`${skill} is too low`);
        return [skill, false];
      }
      console.log(`${skill} is high enough`);
      return [skill, true];
    });
    console.log(hasSkillReq);

    const hasEquipmentReq = equipment.map(({ item, slot }) => {
      if (this.playerEquipment[slot] !== item) {
        hasReq = false; // todo remove later prob
        console.log(`Missing item in ${slot} slot`);
        return [slot, false];
      }
      console.log(`Correct item in ${slot} slot`);
      return [slot, true];
    });
    console.log(hasEquipmentReq);

    if (items) {
      // todo ???
      // console.log(items);
    }

    return hasReq;
  };
}
