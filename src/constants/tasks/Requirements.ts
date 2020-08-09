/* eslint-disable arrow-body-style */
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

const isValidSkill = (value: string): value is SkillName => value in SkillNames;

const isValidItemSlot = (value: string): value is EquipmentSlotName => value in EquipmentSlotNames;

export default class Requirements {
  private requirements: TaskRequirements;
  private playerEquipment: EquipmentSlots;
  private playerSkills: SkillsStats;
  private missingReqs: any;

  constructor(playerID: string, requirements: TaskRequirements) {
    this.requirements = requirements;

    this.playerEquipment = store.getState().characters.equipment[playerID];
    this.playerSkills = store.getState().characters.skills[playerID];
    this.missingReqs = {
      skills: { },
      equipment: { },
      items: { },
    };
  }

  // eslint-disable-next-line arrow-body-style
  missingReqsMsg = () => {
    const { missingReqs: { skills } } = this;
    console.log(skills);
    let msg = Object.entries(skills).reduce((accum, [skill, level]) => {
      return accum += `${skill}, `;
    }, "");
    msg += "levels are too low";
    console.log(msg);

    return msg;
  };

  haveReqs = (): boolean => {
    // eslint-disable-next-line object-curly-newline
    const { requirements, playerEquipment, playerSkills, missingReqs } = this;
    const { skills, equipment, items } = requirements;

    let hasReq = true;

    // const missingSkills: Array<[SkillName, number]> = [];

    if (skills) { // todo split?
      Object.entries(skills).forEach(([skill, reqLvl]) => {
        if (!isValidSkill(skill) || reqLvl === undefined) {
          throw new Error("SHIT FUCK OH NO AAAAA");
        }

        const { level, boost } = playerSkills[skill];

        if (level + boost < reqLvl) {
          hasReq = false;
          missingReqs.skills[skill] = reqLvl;
        }
      });
      // if (missingSkills.length > 0) missingReqs.skills = missingSkills;
    }
    // console.log(`${missingSkills} too low`);

    // const missingEquipment: Array<[EquipmentSlotName, number]> = [];

    if (equipment) {
      Object.entries(equipment).forEach(([itemSlot, itemId]) => {
        if (!isValidItemSlot(itemSlot) || itemId === undefined) {
          throw new Error("SHIT FUCK OH NO AAAAA");
        }
        if (playerEquipment[itemSlot] !== itemId) {
          hasReq = false;
          // missingEquipment.push([itemSlot, itemId]);
          missingReqs.equipment[itemSlot] = itemId;
        }
      });
    }
    // console.log(missingEquipment);

    if (items) {
      // todo ???
      console.log(items);
    }

    return hasReq;
  };
}
