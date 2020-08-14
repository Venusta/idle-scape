/* eslint-disable max-len */
/* eslint-disable arrow-body-style */

import {
  TaskRequirements, EquipmentSlots, SkillsStats, EquipmentSlotName, ItemData, SkillData, SkillName, TaskEquipmentData,
} from "../../types/types";
import store from "../../redux-stuff";

export default class Requirements {
  private requirements: TaskRequirements;
  private playerEquipment: EquipmentSlots;
  private playerSkills: SkillsStats;
  private playerItems: ItemData[];
  private itemMultiplier: number;

  constructor(playerID: string, requirements: TaskRequirements, itemMultiplier = 1) {
    this.requirements = requirements;
    this.itemMultiplier = itemMultiplier;
    this.playerEquipment = store.getState().characters.equipment[playerID];
    this.playerSkills = store.getState().characters.skills[playerID];
    this.playerItems = store.getState().characters.banks[playerID];
  }

  haveSkills = (skills: SkillData[]): (boolean | SkillName)[][] => {
    return skills.map(({ skill, level }) => {
      if (this.playerSkills[skill].level < level) {
        console.log(`${skill} is too low`);
        return [false, skill];
      }
      console.log(`${skill} is high enough`);
      return [true, skill];
    });
  };

  haveEquipment(equipment: TaskEquipmentData[]): (boolean | EquipmentSlotName)[][] {
    return equipment.map(({ item, slot }) => {
      if (this.playerEquipment[slot] !== item) {
        console.log(`Missing item in ${slot} slot`);
        return [false, slot];
      }
      console.log(`Correct item in ${slot} slot`);
      return [true, slot];
    });
  }

  haveItems(items: ItemData[], amount: number): (boolean | number)[][] {
    return items.map(({ item, amount: taskAmount }) => {
      const newAmount = amount * taskAmount;
      const index = this.playerItems.find((element) => (item === element.item && element.amount >= newAmount));
      if (!index) {
        console.log(`Missing ${newAmount}x ${item} from bank`);
        return [false, item];
      }
      return [true, item];
    });
  }

  haveReqs = (): boolean => {
    const { requirements } = this;
    const { skills, equipment, items } = requirements;

    const hasSkillReq = this.haveSkills(skills);
    console.log(hasSkillReq);

    const hasEquipmentReq = this.haveEquipment(equipment);
    console.log(hasEquipmentReq);

    const hasItemsReq = this.haveItems(items, this.itemMultiplier);
    console.log(hasItemsReq);

    const checkReq = (req: (boolean | unknown)[][]) => req.every(([bool]) => bool);

    const checkAll = () => checkReq(hasEquipmentReq) && checkReq(hasSkillReq) && checkReq(hasItemsReq);

    return checkAll();
  };
}
