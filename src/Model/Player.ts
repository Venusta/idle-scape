import { PlayerOptions, ItemBank, ItemData } from "../types/types";
import { addToItemBank, addBankToBank } from "./Bank";

export default class Player {
  public id: number;
  public name: string;
  public bank: ItemBank = {
    995: 100,
    4151: 1,
  };

  constructor({ id, name }: PlayerOptions) {
    this.id = id;
    this.name = name;
  }

  addToBank = (item: ItemData): void => {
    console.log(item);
    this.bank = addToItemBank(this.bank, item);
  };

  // addLootToBank = (loot: DropCollection) => {
  //   this.bank = addLootToBank(this.bank, loot);
  // };

  addBankToBank = (bank: ItemBank): void => {
    this.bank = addBankToBank(this.bank, bank);
  };

  getBank = (): ItemBank => this.bank;
}
