import { ItemData } from "../types/types";
import { getRandomIntInclusive, getRandomInt, rollForOneIn } from "../util";
import {
  DropData, SecondaryDropData, ChanceDropData, Amount, DropTable,
} from "./dropTable";

export class DropSimulator {
  private alwaysItems: DropData[];
  private secondaryItems: SecondaryDropData[];
  private tertiaryItems: ChanceDropData[];
  private oneInXItems: ChanceDropData[];
  private totalWeight: number;

  constructor({
    alwaysItems, secondaryItems, tertiaryItems, oneInXItems, totalWeight,
  }: DropTable) {
    this.alwaysItems = alwaysItems;
    this.secondaryItems = secondaryItems;
    this.tertiaryItems = tertiaryItems;
    this.oneInXItems = oneInXItems;
    this.totalWeight = totalWeight;
  }

  getIndividualDrops = (amount = 1): ItemData[][] => {
    const loot = [];

    for (let index = 0; index < amount; index += 1) {
      loot.push(this.run());
    }
    return loot;
  };

  getDrops = (amount = 1): ItemData[] => {
    const loot = this.getIndividualDrops(amount).flat();

    const result: ItemData[] = [];
    loot.forEach((currentDrop) => {
      const { item, amount: amt } = currentDrop;

      const index = result.findIndex((drop) => drop.item === item);

      if (index === -1) {
        result.push({ ...currentDrop });
      } else {
        result[index].amount += amt;
      }
    });
    return result;
  };

  private run = (): ItemData[] => {
    const loot: ItemData[] = [];

    this.alwaysItems.forEach((dropData) => {
      loot.push(...this.getDrop(dropData));
    });

    this.tertiaryItems.forEach((dropData) => {
      if (rollForOneIn(dropData.chance)) {
        loot.push(...this.getDrop(dropData));
      }
    });

    for (let index = 0; index < this.oneInXItems.length; index += 1) {
      /**
       * sorted so it rolls the rarest item first
       */
      const sorted = this.oneInXItems.sort((a, b) => b.chance - a.chance);
      const dropData = sorted[index];

      if (rollForOneIn(dropData.chance)) {
        loot.push(...this.getDrop(dropData));
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
      loot.push(...this.getDrop(randomItem));
    }

    return loot;
  };

  private getDrop = (dropData: DropData): ItemData[] => {
    const { item, amount: a } = dropData;
    const amount = this.getAmount(a);
    const items: ItemData[] = [];

    if (item instanceof DropTable) {
      const sim = new DropSimulator(item);
      for (let index = 0; index < amount; index += 1) {
        items.push(...sim.run()
          .map((drop) => this.getDrop(drop))
          .flat());
      }
      return items;
    }

    items.push({ item, amount });

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
