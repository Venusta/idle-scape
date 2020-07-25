import { PlayerOptions, ItemBank, ItemData } from "../types/types";
import {
  addToItemBank, addBankToBank, removeBankFromBank, removeFromItemBank,
} from "../util";

export default class Player {
  public id: number;
  public name: string;
  public skills = {
    attack: 0,
    defence: 0,
    strength: 0,
    hitpoints: 0,
    ranged: 0,
    prayer: 0,
    magic: 0,
    cooking: 0,
    woodcutting: 0,
    fletching: 0,
    fishing: 0,
    firemaking: 0,
    crafting: 0,
    smithing: 0,
    mining: 0,
    herblore: 0,
    agility: 0,
    thieving: 0,
    slayer: 0,
    farming: 0,
    runecrafting: 0,
    hunter: 0,
    construction: 0,
  };
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
    this.skills = skills;
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
