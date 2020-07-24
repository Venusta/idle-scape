/* eslint-disable no-console */
import { addToLootTable } from "../util";
import { Drop, DropCollection } from "../types/types";

export default class Loot {
  loot:DropCollection = {};

  add = (itemData: Drop | Drop[]) => {
    if (Array.isArray(itemData)) {
      itemData.forEach((singleItem) => {
        addToLootTable(this.loot, singleItem);
      });
      return;
    }
    console.error("This happened, not sure why.");
    console.error(itemData);
    this.loot = addToLootTable(this.loot, itemData);
  };

  getLoot = () => this.loot;
}
