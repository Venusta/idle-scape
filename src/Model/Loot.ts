import { ItemData, ItemBank } from "../types/types";
import { addToItemBank } from "./Bank";

export default class Loot {
  loot:ItemBank = {};

  add = (itemData: ItemData | ItemData[]): void => {
    if (Array.isArray(itemData)) {
      itemData.forEach((singleItem) => {
        this.loot = addToItemBank(this.loot, singleItem);
      });
      return;
    }
    console.error("This happened, not sure why.");
    console.error(itemData);
    this.loot = addToItemBank(this.loot, itemData);
  };

  getLoot = (): ItemBank => this.loot;
}
