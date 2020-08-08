/* eslint-disable arrow-body-style */
import * as startingSkills from "./Skills";
import { ItemBank, EquipmentSlots } from "../types/types";

export type IDsState = string[];

export interface ItemBankState {
  [x: string]: ItemBank
}

export interface NameState {
  [x: string]: string
}

export interface SkillsState {
  [x: string]: startingSkills.Skills;
}

export interface StateOptions {
  ids?: IDsState;
}

export interface EquipmentState {
  [x: string]: EquipmentSlots
}

interface PlayerState {
  ids: IDsState,
  banks: ItemBankState,
  skills: SkillsState,
  names: NameState,
  equipment: EquipmentState,
}

const startingIDs = ["3", "9"];

const startingNames = ["Maximus Decimus Meridius", "Marcus Aurelius"];

const startingItems: ItemBank = {
  995: 100000,
  50: 5,
  101: 300,
  201: 40,
  301: 50,
  401: 201,
  4151: 200,
  1031: 3,
  1033: 3,
  1035: 3,
  1037: 3,
  1038: 3,
  1040: 3,
  1042: 3,
  1044: 3,
  1046: 3,
  1048: 3,
  1050: 3,
  1052: 3,
  1053: 3,
  1055: 3,
  1057: 3,
  1059: 3,
  1061: 3,
  2619: 1,
  2615: 1,
  2617: 1,
  8845: 1,
  8846: 1,
  8847: 1,
  8848: 1,
  8849: 1,
  8850: 1,
  8851: 1,
  8852: 1,
  8853: 1,
  8855: 1,
  8856: 1,
  8857: 1,
  885: 1,
  8859: 1,
  8860: 1,
  8861: 1,
  8862: 1,
  8863: 1,
  8865: 1,
  8867: 1,
  8869: 1,
  8269: 1,
  8369: 1,
  8469: 1,
  8569: 1,
  2569: 1,
  2570: 1,
  2571: 1,
  2572: 1,
  2573: 1,
  24537: 1,
};

const startingEquipment: EquipmentSlots = {
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

const mapDataToId = (ids: string[], data: unknown) => {
  return ids.reduce((accum, id) => ({
    ...accum,
    [id]: data,
  }), {});
};

const charactersInitialState = ({ ids = startingIDs }: StateOptions): PlayerState => {
  console.log("Character State Remake!");

  const banks: ItemBankState = mapDataToId(ids, startingItems);
  const skills: SkillsState = mapDataToId(ids, startingSkills.default());
  const names: NameState = {
    [ids[0]]: startingNames[0],
    [ids[1]]: startingNames[1],
  };
  const equipment: EquipmentState = mapDataToId(ids, startingEquipment);

  return {
    ids,
    banks,
    skills,
    names,
    equipment,
  };
};

export default charactersInitialState;
