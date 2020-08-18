/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import {
  SkillName, EquipmentSlotName, TaskRequirements, TaskEquipmentData, ItemData, SkillData, ExpReward, TaskReward, TaskOptions, TaskFail,
} from "../types/types";
import nameToId from "../util/nameToId";

interface TaskBuilderOptions {
  name: string;
}

const skillExists = (skill: SkillName, arrayToSearch: Array<SkillData | ExpReward>): boolean => {
  return arrayToSearch.findIndex((obj) => {
    return obj.skill === skill;
  }) !== -1;
};

const itemExists = (item: number, arrayToSearch: Array<ItemData>): boolean => {
  return arrayToSearch.findIndex((obj) => {
    return obj.item === item;
  }) !== -1;
};

const equipmentExists = (slot: EquipmentSlotName, arrayToSearch: Array<TaskEquipmentData>): boolean => {
  return arrayToSearch.findIndex((obj) => {
    return obj.slot === slot;
  }) !== -1;
};

export default class TaskBuilder {
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
    if (skillExists(skill, this.requirements.skills)) {
      console.error(`${skill} already exists as a requirement`);
      return this;
    }
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
    if (equipmentExists(slot, this.requirements.equipment)) {
      console.error(`${slot} already exists as a requirement`);
      return this;
    }
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
    if (itemExists(id, this.requirements.items)) {
      console.error(`${id} already exists as a requirement`);
      return this;
    }
    this.requirements.items.push({ item: id, amount });
    return this;
  };

  /**
   * Exp reward for completing a task
   * @param skill name of a skill e.g. "cooking"
   * @param amount how much exp to give
   */

  rewardExp = (skill: SkillName, amount: number): this => {
    if (skillExists(skill, this.rewards.exp)) {
      console.error(`${skill} already exists as a reward`);
      return this;
    }
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
    if (itemExists(id, this.rewards.items)) {
      console.error(`${id} already exists as a reward`);
      return this;
    }
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
    if (itemExists(id, this.fails.items)) {
      console.error(`${id} already exists as a fail`);
      return this;
    }
    this.fails.items.push({ item: id, amount });
    return this;
  };

  /**
 * finalises and returns a task
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
