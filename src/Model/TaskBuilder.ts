/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import {
  SkillName, EquipmentSlotName, TaskRequirements, TaskEquipmentData, ItemData, SkillData, ExpReward, TaskReward, TaskOptions,
} from "../types/types";

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
  private name: string;
  public requirements: TaskRequirements;
  private rewards: TaskReward;

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
  }

  reqSkill = (skill: SkillName, level: number): this => {
    if (skillExists(skill, this.requirements.skills)) {
      console.error(`${skill} already exists as a requirement`);
      return this;
    }
    this.requirements.skills.push({ skill, level });
    return this;
  };

  reqEquip = (slot: EquipmentSlotName, item: number, amount = 1): this => {
    if (equipmentExists(slot, this.requirements.equipment)) {
      console.error(`${slot} already exists as a requirement`);
      return this;
    }
    this.requirements.equipment.push({ slot, item, amount });
    return this;
  };

  reqItem = (item: number, amount = 1): this => {
    if (itemExists(item, this.requirements.items)) {
      console.error(`${item} already exists as a requirement`);
      return this;
    }
    this.requirements.items.push({ item, amount });
    return this;
  };

  rewardExp = (skill: SkillName, amount: number): this => {
    if (skillExists(skill, this.rewards.exp)) {
      console.error(`${skill} already exists as a reward`);
      return this;
    }
    this.rewards.exp.push({ skill, amount });
    return this;
  };

  rewardItem = (item: number, amount = 1): this => {
    if (itemExists(item, this.rewards.items)) {
      console.error(`${item} already exists as a reward`);
      return this;
    }
    this.rewards.items.push({ item, amount });
    return this;
  };

  /**
 * finalises and returns a task
 * @param time how long the task should take in seconds
 */

  finalise = (duration = 0): TaskOptions => {
    const {
      name, requirements, rewards,
    } = this;

    return {
      name,
      requirements,
      rewards,
      duration,
    };
  };
}
