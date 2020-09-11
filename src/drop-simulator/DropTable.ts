import { getRandomIntInclusive, getRandomInt, rollForOneIn } from "../util";

type Drop = number | DropTable;
type Amount = number | [number, number];

interface DropData {
  drop: Drop;
  amount: Amount;
}

interface SecondaryDropData extends DropData {
  weight: number
}

interface ChanceDropData extends DropData {
  chance: number
}

interface ItemData {
  drop: number;
  amount: number;
}

interface DropTableOptions {
  weightLimit?: number;
}

export class DropTable {
  private alwaysItems: DropData[];
  private secondaryItems: SecondaryDropData[];
  private tertiaryItems: ChanceDropData[];
  private oneInXItems: ChanceDropData[];

  private totalWeight: number;
  private weightLimit?: number;

  constructor(options: DropTableOptions = {}) {
    this.alwaysItems = [];
    this.secondaryItems = [];
    this.tertiaryItems = [];
    this.oneInXItems = [];
    this.totalWeight = 0;
    this.weightLimit = options.weightLimit;
  }

  /**
   * Items with 100% drop rate (bones, ashes)
   * @param drop drop table or item id
   * @param amount number or range eg 5 or [5,10]
   */

  always = (drop: Drop, amount: Amount = 1): this => {
    this.alwaysItems.push({ drop, amount });
    return this;
  };

  /**
   * Secondary items, chance to get one of these (coins etc)
   * @param drop drop table or item id
   * @param weight how many times the drop appears in the drop table
   * @param amount number or range eg 5 or [5,10]
   */

  add = (drop: Drop, weight = 1, amount: Amount = 1): this => {
    this.secondaryItems.push({ drop, amount, weight });
    this.totalWeight += weight;
    return this;
  };

  /**
   * Tertiary items, you can get one of each of these, possibly all
   * @param drop item id
   * @param chance one in X chance
   * @param amount number or range eg 5 or [5,10]
   */

  tertiary = (drop: number, chance: number, amount: Amount = 1): this => {
    this.tertiaryItems.push({ drop, amount, chance });
    return this;
  };

  /**
   * Rare drop, if you land on this you won't get additonal loot.
   * @param drop item id
   * @param chance one in X chance
   * @param amount number or range eg 5 or [5,10]
   */

  oneInX = (drop: number, chance: number, amount: Amount = 1): this => {
    this.oneInXItems.push({ drop, amount, chance });
    return this;
  };

  /**
   * Run the sim
   */

  simulate = (): ItemData[] => {
    console.log(`weight: ${this.totalWeight}`);

    const loot: ItemData[] = [];

    this.alwaysItems.forEach((dropData) => {
      loot.push(...this.getLoot(dropData));
    });

    const roll = getRandomInt(1, this.weightLimit || this.totalWeight);
    let lootIndex = 0;
    let weightTally = 0;

    for (let index = 0; index < this.secondaryItems.length; index += 1) {
      const item = this.secondaryItems[index];

      weightTally += item.weight;

      if (roll <= weightTally) {
        lootIndex = index;
        break;
      }
    }

    this.tertiaryItems.forEach((dropData) => {
      if (rollForOneIn(dropData.chance)) {
        loot.push(...this.getLoot(dropData));
      }
    });

    for (let index = 0; index < this.oneInXItems.length; index += 1) {
      const sorted = this.oneInXItems.sort((a, b) => b.chance - a.chance);
      const dropData = sorted[index];
      if (rollForOneIn(dropData.chance)) {
        loot.push(...this.getLoot(dropData));
        return loot; // return this drop if we roll it and no randomItem
      }
    }

    const randomItem = this.secondaryItems[lootIndex];
    if (randomItem !== undefined) {
      loot.push(...this.getLoot(randomItem));
    }

    return loot;
  };

  private getLoot = (dropData: DropData): ItemData[] => {
    const { drop, amount: a } = dropData;
    const amount = this.getAmount(a);
    const items: ItemData[] = [];

    if (drop instanceof DropTable) {
      for (let index = 0; index < amount; index += 1) {
        items.push(...drop.simulate()
          .map((item) => this.getLoot(item))
          .flat());
      }
      return items;
    }

    items.push({ drop, amount });

    return items;
  };

  private getAmount = (amount: Amount): number => {
    if (Array.isArray(amount)) {
      const [min, max] = amount;
      return getRandomIntInclusive(min, max);
    }
    return amount;
  };
}
