/* eslint-disable max-len */
import {
  SkillName, TaskReward, ItemMap, ExpMap, TaskRewardMap, ExpReward, ItemData,
} from "../../types/types";

export class RewardStore {
  private items: ItemMap;
  private exp: ExpMap;

  constructor() {
    this.items = new Map([]);
    this.exp = new Map([]);
  }

  /**
   * Adds a TaskReward to the RewardStore
   * @param rewardToAdd
   */

  addReward = (rewardToAdd: TaskRewardMap): this => {
    this.addExpReward(rewardToAdd.exp);
    this.addItemReward(rewardToAdd.items);
    return this;
  };

  addItemReward = (itemReward: ItemMap): this => {
    Array.from(itemReward).forEach(([key, amt]) => {
      this.items.set(key, (this.items.get(key) ?? 0) + amt);
    });
    return this;
  };

  addExpReward = (expReward: ExpMap): this => {
    Array.from(expReward).forEach(([key, amt]) => {
      this.exp.set(key, (this.exp.get(key) ?? 0) + amt);
    });
    return this;
  };

  /**
   * Returns all the items in the RewardStore as a Map Object
   */
  getItems = (): ItemMap => this.items;

  /**
   * Returns all skills exp in the RewardStore as a Map Object
   */
  getExp = (): ExpMap => this.exp;

  /**
   * Returns the skill exp or 0 if not found
   * @param skill
   */
  get = (skill: SkillName): number => this.exp.get(skill) ?? 0;

  /**
   * Returns the full RewardStore as an Object of Map Objects
   */
  getStore = (): TaskRewardMap => {
    const { items, exp } = this;
    return {
      items,
      exp,
    };
  };

  /**
   * Converts the Maps to a pure Object of Arrays for the reducer
   */

  toObject = (): TaskReward => {
    const exp: ExpReward[] = Array.from(this.exp.entries()).map(([skill, amount]) => ({ skill, amount }));
    const items: ItemData[] = Array.from(this.items.entries()).map(([item, amount]) => ({ item, amount }));
    return ({
      items,
      exp,
    });
  };
}
