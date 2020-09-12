import { itemSearchData } from "../../model/Items";
import { ItemData, ExpReward, SkillName } from "../../types/types";

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

  rewardExp = (skill: SkillName, amount = 0, multiplier: number): this => {
    this.exp.push({ skill, amount: amount * multiplier });
    return this;
  };

  /**
   * Item you get if you complete the task
   * @param itemData \{ item: 4151, amount: 3 }
   * @param multiplier how many times you give this reward
   */

  rewardItem = (itemData: ItemData, multiplier: number): this => {
    const { item, amount } = itemData;
    const id = itemSearchData.get(item);
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
