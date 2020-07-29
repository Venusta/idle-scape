import {
  PlayerOptions, ItemBank, SkillsStats,
} from "../types/types";
import { expToLevel } from "../util";

export default class Player {
  public id: number;
  public name: string;
  public skills: SkillsStats;
  public bank: ItemBank = {
    995: 100,
    4151: 1,
  };
  public inventory: ItemBank = {
    1024: 1,
  };

  constructor({ id, name, skills }: PlayerOptions) {
    this.id = id;
    this.name = name;
    // extract method when cba
    const formatedSkillData = Object.keys(skills).reduce((accum, skill) => {
      const { exp } = skills[skill as keyof SkillsStats];
      return {
        ...accum,
        [skill]: {
          exp,
          level: expToLevel(exp),
        },
      };
    }, {}) as SkillsStats;

    this.skills = formatedSkillData;
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
