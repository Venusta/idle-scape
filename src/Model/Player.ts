import {
  PlayerOptions, ItemBank, ItemData, Skills,
} from "../types/types";
import {
  addToItemBank, addBankToBank, removeBankFromBank, removeFromItemBank, levelToExp, expToLevel,
} from "../util";

export default class Player {
  private id: number;
  private name: string;
  private skills: Skills;
  // private skills: {[name: string]: Skill};
  private bank: ItemBank = {
    995: 100,
    4151: 1,
  };
  private inventory: ItemBank = {
    1024: 1,
  };

  constructor({ id, name, skills }: PlayerOptions) {
    this.id = id;
    this.name = name;
    // extract method when cba
    const formatedSkillData = Object.keys(skills).reduce((accum, skill) => {
      const { exp } = skills[skill as keyof Skills];
      return {
        ...accum,
        [skill]: {
          exp,
          level: expToLevel(exp),
        },
      };
    }, {}) as Skills;

    this.skills = formatedSkillData;
  }

  addToItemBank = (item: ItemData): void => {
    console.log(item);
    this.bank = addToItemBank(this.bank, item);
  };

  addBankToBank = (bank: ItemBank): void => {
    this.bank = addBankToBank(this.bank, bank);
  };

  removeFromItemBank = (item: ItemData): void => {
    this.bank = removeFromItemBank(this.bank, item);
  };

  removeBankFromBank = (bank: ItemBank): void => {
    this.bank = removeBankFromBank(this.bank, bank);
  };

  getBank = (): ItemBank => this.bank;
}
