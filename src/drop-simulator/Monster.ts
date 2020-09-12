import { itemSearchData } from "../model/Items";
/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
import { DropTable } from "./dropTable";

interface MonsterOptions {
  // id: number;
  name: string;
  dropTable: DropTable;
}

interface ItemData {
  drop: number;
  amount: number;
}

export class Monster {
  dropTable: DropTable;

  constructor(options: MonsterOptions) {
    this.dropTable = options.dropTable;
  }

  test = (amount = 1): void => {
    const loot = [];
    console.log(`test: ${amount}`);

    for (let index = 0; index < 100; index += 1) {
      loot.push(this.dropTable.simulate());
    }
    console.table(loot);
    console.log(loot.flat());

    const result: ItemData[] = [];
    loot.flat().forEach((currentDrop) => {
      const { drop, amount } = currentDrop;

      const index = result.findIndex((item) => item.drop === drop);

      if (index === -1) {
        result.push({ ...currentDrop });
      } else {
        result[index].amount += amount;
      }
    });
    console.log(result);

    const resultToNames = result.map((item) => {
      const { drop, amount } = item;
      const name = itemSearchData.getName(drop);
      return { name, amount };
    }, {});
    console.table(resultToNames);
  };
}
