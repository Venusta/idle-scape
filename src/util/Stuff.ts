/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import {
  SkillName, SkillData, ExpReward, ItemData, EquipmentSlotName, TaskEquipmentData,
} from "../types/types";

const skillExists = (skill: SkillName, arrayToSearch: Array<SkillData | ExpReward>): boolean => arrayToSearch.findIndex((obj) => obj.skill === skill) !== -1;

const itemExists = (item: number, arrayToSearch: Array<ItemData>): boolean => arrayToSearch.findIndex((obj) => obj.item === item) !== -1;

const equipmentExists = (slot: EquipmentSlotName, arrayToSearch: Array<TaskEquipmentData>): boolean => arrayToSearch.findIndex((obj) => obj.slot === slot) !== -1;
