/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { getRandomInt, rollForOneIn } from "../utils";

export default class DropTable {
  constructor(options = {}) {
    this.alwaysItems = [];
    this.secondaryItems = [];
    this.tertiaryItems = [];
    this.oneInXItems = [];
    this.totalWeight = 0;
    this.limit = options.limit;
  }

  always = (item, amount = 1) => {
    this.alwaysItems.push({ item, amount });
    return this;
  }

  add = (item, amount, weight) => {
    if (Array.isArray(item)) {
      const multipleItems = item.map(([i, a]) => ({ item: i, amount: a }));

      this.secondaryItems.push({ item: multipleItems, amount, weight });
    } else {
      this.secondaryItems.push({ item, amount, weight });
    }

    this.totalWeight += weight;

    return this;
  }

  tertiary = (item, amount, chance) => { // put chance at end
    this.tertiaryItems.push({ item, amount, chance });
    return this;
  }

  oneInX = (item, amount, chance) => {
    this.oneInXItems.push({ item, amount, chance });
    return this;
  }

  generateDrop = () => {
    const roll = getRandomInt(1, this.limit || this.totalWeight);

    let randomIndex;
    let weightTally = 0;

    for (let index = 0; index < this.secondaryItems.length; index += 1) {
      const item = this.secondaryItems[index];

      weightTally += item.weight;

      if (roll <= weightTally) {
        randomIndex = index;
        break;
      }
    }
    const randomItem = this.secondaryItems[randomIndex];

    let drop = [];
    // 100% drops
    this.alwaysItems.forEach((item) => {
      drop = drop.concat(this.generateResultItem(item));
    });

    this.tertiaryItems.forEach((item) => {
      const { chance } = item;
      if (rollForOneIn(chance)) {
        drop = drop.concat(this.generateResultItem(item));
      }
    });

    for (let index = 0; index < this.oneInXItems.length; index += 1) {
      const item = this.oneInXItems[index];
      const { chance } = item;
      if (rollForOneIn(chance)) {
        drop = drop.concat(this.generateResultItem(item));
        return drop; // we want to return the drop if we roll it and nothing else
      }
    }

    // if nothing check
    if (randomItem !== undefined) {
      drop = drop.concat(this.generateResultItem(randomItem));
    }
    return drop;
  }

  generateResultItem = (itemData) => {
    const { item, amount: a } = itemData;
    const amount = this.determineAmount(a);

    if (item instanceof DropTable) {
      let items = [];

      for (let index = 0; index < amount; index += 1) {
        items = items.concat(
          item
            .generateDrop()
            .map((singleItem) => this.generateResultItem(singleItem))
            .flat(),
        );
      }

      return items;
    }

    if (Array.isArray(item)) {
      const items = [];

      item.forEach((singleItem) => {
        items.push(singleItem);
      });

      return items;
    }

    // return [{ item, amount }];
    return { item, amount };
  }

  determineAmount = (amount) => {
    if (Array.isArray(amount)) {
      const [min, max] = amount;
      return getRandomInt(min, max);
    }
    return amount;
  }
}
