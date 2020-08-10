/* eslint-disable arrow-body-style */
import { EquipmentSlots, SkillName, EquipmentSlotName } from "../types/types";
import { SkillReq } from "../constants/tasks/Requirements";

interface TaskOptions {
  name: string;
}

interface NewItemBank {
  id: number,
  amount: number,
}

interface Requirements {
  skills: SkillReq
  items: NewItemBank[]
  equipment: Partial<EquipmentSlots>
}

type ExpReward = { [Key in SkillName]?: number; };

interface Reward {
  exp: ExpReward
  items: NewItemBank[]
}

interface Finalise {
  name: string;
  requirements: Requirements;
  rewards: Reward;
  duration: number;
}

export default class Task {
  name: string;
  requirements: Requirements;
  rewards: Reward;
  duration: number;

  constructor(options: TaskOptions) {
    this.name = options.name;
    this.requirements = {
      skills: {},
      items: [],
      equipment: {},
    };
    this.rewards = {
      exp: {},
      items: [],
    };
    this.duration = 0;
  }

  reqSkill = (skill: SkillName, level: number): this => {
    this.requirements.skills[skill] = level;
    return this;
  };

  reqEquip = (slot: EquipmentSlotName, itemId: number): this => {
    this.requirements.equipment[slot] = itemId;
    return this;
  };

  reqItem = (itemId: number, amount = 1): this => {
    this.requirements.items.push({ id: itemId, amount });
    return this;
  };

  rewardSkill = (skill: SkillName, exp: number): this => {
    this.rewards.exp[skill] = exp;
    return this;
  };

  rewardItem = (itemId: number, amount = 1): this => {
    this.rewards.items.push({ id: itemId, amount });
    return this;
  };

  /**
 * finalises and returns a task
 * @param time how long the task should take in seconds
 */

  finalise = (time = 0): Finalise => {
    this.duration = time;

    const {
      name, requirements, rewards, duration,
    } = this;

    // console.log(name, requirements, rewards, duration);
    return {
      name,
      requirements,
      rewards,
      duration,
    };
  };
}
