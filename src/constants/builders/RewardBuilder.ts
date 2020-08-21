import { ItemData, ExpReward } from "../../types/types";
import { nameToId } from "../../util/nameToId";

interface RewardOptions {
  exp: ExpReward[];
  items: ItemData[];
}

export class RewardBuilder {
  private exp: ExpReward[];
  private items: ItemData[];

  constructor() {
    this.exp = [];
    this.items = [];
  }

  /**
   * Exp reward for completing a task
   * @param expReward \{ skill: "cooking", amount: 30 }
   * @param multiplier how many times you give this reward
   */

  rewardExp = (expReward: ExpReward, multiplier: number): this => {
    const { skill, amount: baseAmount } = expReward;
    this.exp.push({ skill, amount: baseAmount * multiplier });
    return this;
  };

  /**
   * Item you get if you complete the task
   * @param itemData \{ item: 4151, amount: 3 }
   * @param multiplier how many times you give this reward
   */

  rewardItem = (itemData: ItemData, multiplier: number): this => {
    const { item, amount } = itemData;
    const id = nameToId(item);
    this.items.push({ item: id, amount: amount * multiplier });
    return this;
  };

  /**
   * finalises and returns a reward object, end the chain with this
   */

  finalise = (): RewardOptions => {
    const { exp, items } = this;
    return {
      exp,
      items,
    };
  };
}

const appendTest = (fixed: string) => {
  return (dynamic: string) => {
    return fixed + dynamic;
  };
};

const hello = appendTest("Hello");

console.log(hello(" world"));
console.log(hello(" everyone"));
