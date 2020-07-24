/* eslint-disable no-console */
import { addToLootTable } from "../utils";

export default class Loot {
  loot = {};

  add = (itemData) => {
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
