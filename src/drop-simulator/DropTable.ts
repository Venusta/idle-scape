import { itemSearchData } from "../model/Items";
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

const resolveId = (drop: Drop | string) => (typeof drop === "string" ? itemSearchData.getId(drop) : drop);

export class DropTable {
  private alwaysItems: DropData[] = [];
  private secondaryItems: SecondaryDropData[] = [];
  private tertiaryItems: ChanceDropData[] = [];
  private oneInXItems: ChanceDropData[] = [];

  private totalWeight = 0;

  /**
   * Items with 100% drop rate (bones, ashes)
   * @param drop drop table or item id
   * @param amount number or range eg 5 or [5,10]
   */

  always = (drop: Drop | string, amount: Amount = 1): this => {
    this.alwaysItems.push({ drop: resolveId(drop), amount });
    return this;
  };

  /**
   * Secondary items, chance to get one of these (coins etc)
   * @param drop drop table or item id
   * @param weight how many times the drop appears in the drop table
   * @param amount number or range eg 5 or [5,10]
   */

  add = (drop: Drop | string, weight = 1, amount: Amount = 1): this => {
    this.secondaryItems.push({ drop: resolveId(drop), amount, weight });
    this.totalWeight += weight;
    return this;
  };

  /**
   * @param weight how many times the drop appears in the drop table
   */
  nothing = (weight: number): this => {
    this.totalWeight += weight;
    return this;
  };

  /**
   * Tertiary items, you can get one of each of these, possibly all
   * @param drop item id
   * @param chance one in X chance
   * @param amount number or range eg 5 or [5,10]
   */

  tertiary = (drop: number | string, chance: number, amount: Amount = 1): this => {
    this.tertiaryItems.push({ drop: resolveId(drop), amount, chance });
    return this;
  };

  /**
   * Rare drop, if you land on this you won't get additonal loot.
   * @param drop item id
   * @param chance one in X chance
   * @param amount number or range eg 5 or [5,10]
   */

  oneInX = (drop: number | string, chance: number, amount: Amount = 1): this => {
    this.oneInXItems.push({ drop: resolveId(drop), amount, chance });
    return this;
  };

  /**
   * Run the sim
   */
  simulate = (): ItemData[] => {
    const loot: ItemData[] = [];

    this.alwaysItems.forEach((dropData) => {
      loot.push(...this.getLoot(dropData));
    });

    this.tertiaryItems.forEach((dropData) => {
      if (rollForOneIn(dropData.chance)) {
        loot.push(...this.getLoot(dropData));
      }
    });

    for (let index = 0; index < this.oneInXItems.length; index += 1) {
      /**
       * sorted so it rolls the rarest item first
       */
      const sorted = this.oneInXItems.sort((a, b) => b.chance - a.chance);
      const dropData = sorted[index];

      if (rollForOneIn(dropData.chance)) {
        loot.push(...this.getLoot(dropData));
        return loot; // return because it should be the only loot
      }
    }

    const roll = getRandomInt(1, this.totalWeight);
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
