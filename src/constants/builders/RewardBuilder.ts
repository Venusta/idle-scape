/* eslint-disable max-len */
import {
  ItemData, ExpReward,
} from "../../types/types";
import nameToId from "../../util/nameToId";

interface RewardOptions {
  exp: ExpReward[];
  items: ItemData[];
  // remove: TaskRemoveItem;
}

interface TaskRemoveItem {
  items: ItemData[];
}

export class RewardBuilder {
  // private rewards: TaskReward;
  private exp: ExpReward[];
  private items: ItemData[];
  // private remove: TaskRemoveItem;

  constructor() {
    this.exp = [];
    this.items = [];
    // this.remove = {
    //   items: [],
    // };
  }

  /**
   * Exp reward for completing a task
   * @param skill name of a skill e.g. "cooking"
   * @param baseExp how much exp one task gives
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
   * @param amount reward amount for one task, default 1
   * @param multiplier how many times you give this reward
   */

  rewardItem = (itemData: ItemData, multiplier: number): this => {
    const { item, amount } = itemData;
    const id = nameToId(item);
    this.items.push({ item: id, amount: amount * multiplier });
    return this;
  };

  // /**
  //  * item to delete
  //  * @param item id or name. 4151 or "Abyssal whip"
  //  * @param amount required amount for one task, default 1
  //  * @param multiplier how many times you give this reward
  //  */

  // removeItem = (itemData: ItemData, multiplier: number): this => {
  //   const { item, amount } = itemData;
  //   const id = nameToId(item);
  //   this.remove.items.push({ item: id, amount: amount * multiplier });
  //   return this;
  // };

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
