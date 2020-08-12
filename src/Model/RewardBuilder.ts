/* eslint-disable arrow-body-style */
import { TaskReward, ExpReward, ItemData } from "../types/types";

export default class RewardBuilder {
  private rewards: TaskReward;

  constructor(rewards: TaskReward) {
    this.rewards = rewards;
  }

  add = (quantity = 1) => {
    const { rewards: { exp: expReward, items: itemsReward } } = this;
  };

  /**
 * @param quantity reward multiplier, default: 1
 */

  amount = (quantity = 1): TaskReward => {
    const { rewards: { exp: expReward, items: itemsReward } } = this;

    const exp = expReward.map(({ skill, amount }: ExpReward) => {
      return { amount: amount * quantity, skill };
    });
    const items = itemsReward.map(({ item, amount }: ItemData) => {
      return { amount: amount * quantity, item };
    });

    return {
      exp,
      items,
    };
  };
}
