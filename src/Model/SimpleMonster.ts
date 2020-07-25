/* eslint-disable @typescript-eslint/no-unused-vars */
import { MonsterOptions, ItemBank } from "../types/types";
import Monster from "./Monster";
import Loot from "./Loot";
import DropTable from "./DropTable";

interface SimpleMonsterOptions extends MonsterOptions {
  dropTable: DropTable;
}

export default class SimpleMonster extends Monster {
  dropTable: DropTable;

  constructor(options: SimpleMonsterOptions) {
    super(options);
    this.dropTable = options.dropTable;
  }

  getLoot = (amount = 1, options?: any): ItemBank => {
    console.log(`Loot from ${amount}x ${this.name}`);
    const loot = new Loot();

    for (let index = 0; index < amount; index += 1) {
      loot.add(this.dropTable.generateDrop());
    }
    return loot.getLoot();
  };

  kill = (amount = 1, options: MonsterOptions) => {
    return "";
  };
}
