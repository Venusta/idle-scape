/* eslint-disable max-len */
import {
  SkillName, EquipmentSlotName, TaskRequirements, TaskReward, TaskOptions, TaskFail,
} from "../../types/types";
import { nameToId } from "../../util/nameToId";

interface TaskBuilderOptions {
  name: string;
}

export class TaskBuilder {
  public name: string;
  public requirements: TaskRequirements;
  public rewards: TaskReward;
  public fails: TaskFail;

  constructor(options: TaskBuilderOptions) {
    this.name = options.name;
    this.requirements = {
      skills: [],
      items: [],
      equipment: [],
    };
    this.rewards = {
      exp: [],
      items: [],
    };
    this.fails = {
      items: [],
    };
  }

  /**
   * Required skill level for a task
   * @param skill name of a skill e.g. "cooking"
   * @param level required level for the task
   */

  reqSkill = (skill: SkillName, level: number): this => {
    this.requirements.skills.push({ skill, level });
    return this;
  };

  /**
   * Required equipment
   * @param slot item slot such e.g. "weapon"
   * @param item id or name. 4151 or "Abyssal whip"
   * @param amount required amount for one task, default 1
   */

  reqEquip = (slot: EquipmentSlotName, item: number | string, amount = 1): this => {
    const id = nameToId(item);
    this.requirements.equipment.push({ slot, item: id, amount });
    return this;
  };

  /**
   * Required item for task
   * @param item id or name. 4151 or "Abyssal whip"
   * @param amount required amount for one task, default 1
   */

  reqItem = (item: number | string, amount = 1): this => {
    const id = nameToId(item);
    this.requirements.items.push({ item: id, amount });
    return this;
  };

  /**
   * Exp reward for completing a task
   * @param skill name of a skill e.g. "cooking"
   * @param amount how much exp to give
   */

  rewardExp = (skill: SkillName, amount: number): this => {
    this.rewards.exp.push({ skill, amount });
    return this;
  };

  /**
   * Item you get if you complete the task
   * @param item id or name. 4151 or "Abyssal whip"
   * @param amount reward amount for one task, default 1
   */

  rewardItem = (item: number | string, amount = 1): this => {
    const id = nameToId(item);
    this.rewards.items.push({ item: id, amount });
    return this;
  };

  /**
   * Item you get if you fail a task such as burnt food
   * @param item id or name. 4151 or "Abyssal whip"
   * @param amount required amount for one task, default 1
   */

  failItem = (item: number | string, amount = 1): this => {
    const id = nameToId(item);
    this.fails.items.push({ item: id, amount });
    return this;
  };

  /**
 * finalises and returns a task object
 * @param duration how long the task should take in seconds
 */

  finalise = (duration = 0): TaskOptions => {
    const {
      name, requirements, rewards, fails,
    } = this;

    return {
      name,
      requirements,
      rewards,
      duration,
      fails,
    };
  };
}
