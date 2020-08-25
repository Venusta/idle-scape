import { SkillName } from "../../types/types";

type IdMap = Map<number, number>;
type ExpMap = Map<SkillName, number>;

interface RewardObject {
  items: IdMap
  exp: ExpMap
}
/**
 * Reward data that gets passed to the reducer
 */
export class RewardStore {
  private items: IdMap;
  private exp: ExpMap;

  constructor() {
    this.items = new Map([]);
    this.exp = new Map([]);
  }
  /**
   * Adds a full RewardObject to the RewardStore
   * @param rewardToAdd
   */

  addReward = (rewardToAdd: RewardObject): this => {
    this.addExpReward(rewardToAdd.exp);
    this.addItemReward(rewardToAdd.items);
    return this;
  };

  addItemReward = (itemReward: IdMap): this => {
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
  getItems = (): IdMap => this.items;

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
  getStore = (): RewardObject => {
    const { items, exp } = this;
    return {
      items,
      exp,
    };
  };
}
