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
    addToLootTable(this.loot, itemData);
  };

  getLoot = () => this.loot;
}
