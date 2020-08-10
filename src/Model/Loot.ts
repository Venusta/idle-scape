import { ItemData } from "../types/types";
import { addToItemBank } from "../util";

export default class Loot {
  loot: ItemData[] = [];

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

  getLoot = (): ItemData[] => this.loot;
}
