/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import {
  SkillName, EquipmentSlotName, TaskRequirements, TaskReward, TaskOptions, TaskFail,
} from "../../types/types";
import { nameToId } from "../../util/nameToId";

interface TaskBuilderOptions {
  name: string;
}

export class TaskBuilder {
  name: string;
  requirements: TaskRequirements;
  rewards: TaskReward;
  fails: TaskFail;

  constructor(options: TaskBuilderOptions) {
    this.name = options.name;
    this.requirements = {
      skills: new Map([]),
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
    this.requirements.skills.set(skill, level);
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
 * @param ticks how many ticks per task attempt (600ms per tick), default = 5
 */

  finalise = (ticks = 5): TaskOptions => {
    const duration = ticks * 600;

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
