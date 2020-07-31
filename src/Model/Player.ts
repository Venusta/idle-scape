import {
  PlayerOptions, ItemBank, SkillsStats, EquipmentSlots,
} from "../types/types";
import { expToLevel } from "../util";
import { skillsSaveObject } from "../constants/data";

export default class Player { // TODO this entire class needs to be made into an object
  public id: number;
  public name: string;
  public skills: SkillsStats;
  public bank: ItemBank = {
    995: 100000,
    4151: 1,
  };
  public inventory: ItemBank = {
    1024: 1,
  };

  public equipment: EquipmentSlots;

  constructor({
    id, name, skills, equipment,
  }: PlayerOptions) {
    this.id = id;
    this.name = name;
    // extract method when cba
    const formatedSkillData: SkillsStats = Object.keys(skills).reduce((accum, skill) => {
      const { exp } = skills[skill as keyof SkillsStats];
      return {
        ...accum,
        [skill]: {
          exp,
          level: expToLevel(exp),
          boost: 0,
        },
      };
    }, { ...skillsSaveObject });

    this.skills = formatedSkillData;
    this.equipment = equipment;
  }

  // addToItemBank = (item: ItemData): void => {
  //   console.log(item);
  //   this.bank = addToItemBank(this.bank, item);
  // };

  // addBankToBank = (bank: ItemBank): void => {
  //   this.bank = addBankToBank(this.bank, bank);
  // };

  // removeFromItemBank = (item: ItemData): void => {
  //   this.bank = removeFromItemBank(this.bank, item);
  // };

  // removeBankFromBank = (bank: ItemBank): void => {
  //   this.bank = removeBankFromBank(this.bank, bank);
  // };

  // getBank = (): ItemBank => this.bank;
}
