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

const playerInitialState = ({ ids = startingIDs }: StateOptions): PlayerState => {
  console.log("State Remake!");

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

export default playerInitialState;
