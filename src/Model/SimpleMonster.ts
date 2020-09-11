/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MonsterOptions, ItemData, ExpReward, StyleExperience,
} from "../types/types";
import { Monster } from "./Monster";
import { Loot } from "./Loot";
import { DropTable } from "./DropTable";

interface SimpleMonsterOptions extends MonsterOptions {
  dropTable: DropTable;
}

export class SimpleMonster extends Monster {
  dropTable: DropTable;

  constructor(options: SimpleMonsterOptions) {
    super(options);
    this.dropTable = options.dropTable;
  }

  getLoot = (amount = 1, options?: any): ItemData[] => {
    console.log(`Loot from ${amount}x ${this.name}`);
    const loot = new Loot();

    for (let index = 0; index < amount; index += 1) {
      loot.add(this.dropTable.generateDrop());
    }
    return loot.getLoot();
  };

  getExperience = (amount = 1, styleExp: StyleExperience): ExpReward[] => {
    const { hitpoints } = this.data;

    switch (styleExp) {
      case "shared":
        return [
          { skill: "hitpoints", amount: hitpoints * 1.33 * amount },
          { skill: "attack", amount: hitpoints * 1.33 * amount },
          { skill: "strength", amount: hitpoints * 1.33 * amount },
          { skill: "defence", amount: hitpoints * 1.33 * amount },
        ];
      case "ranged and defence":
        return [
          { skill: "hitpoints", amount: hitpoints * 1.33 * amount },
          { skill: "ranged", amount: hitpoints * 2 * amount },
          { skill: "defence", amount: hitpoints * 2 * amount },
        ];
      case "magic and defence":
        return [
          { skill: "hitpoints", amount: hitpoints * 1.33 * amount },
          { skill: "magic", amount: hitpoints * 2 * amount },
          { skill: "defence", amount: hitpoints * 2 * amount },
        ];
      default:
        return [
          { skill: "hitpoints", amount: hitpoints * 1.33 * amount },
          { skill: styleExp, amount: hitpoints * 4 * amount },
        ];
    }
  };
}
