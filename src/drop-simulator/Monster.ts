import { itemSearchData } from "../model/Items";
/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
import { DropTable } from "./dropTable";
import { DropSimulator } from "./DropSimulator";
import { ItemData } from "../types/types";

interface MonsterOptions {
  // id: number;
  name: string;
  dropTable: DropTable;
}

export class Monster {
  dropTable: DropTable;

  constructor(options: MonsterOptions) {
    this.dropTable = options.dropTable;
  }

  kill = (amount = 1): ItemData[] => {
    const sim = new DropSimulator(this.dropTable);
    const loot = sim.getDrops(amount);
    return loot;
  };

  // todo remove later, only for debug
  resultToNames = (amount = 1) => this.kill(amount).map((drop) => {
    const { item, amount } = drop;
    const name = itemSearchData.getName(item);
    return { name, amount };
  }, {});
}
