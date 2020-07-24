/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import Loot from "./Loot";

export default class Monster {
  constructor({ id, name, dropTable }) {
    this.id = id;
    this.name = name;
    this.dropTable = dropTable;
    // this.aliases = options.aliases ?? [];
    // this.data = monsterData[this.id];
  }

  getLoot = (amount = 1, options) => {
    console.log(`Loot from ${amount}x ${this.name}`);
    const loot = new Loot();

    for (let index = 0; index < amount; index += 1) {
      loot.add(this.dropTable.generateDrop());
    }
    return loot.getLoot();
  }

  kill = (amount = 1, options) => {

  }
}
