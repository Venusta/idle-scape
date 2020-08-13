/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { SkillNames } from "../constants/data";
import {
  SkillName, TaskRequirements, SkillData, ExpReward, TaskReward,
} from "../types/types";

type BuilderItems = number | Array<[number, number?]> | [number, number];
type BuilderSkills = [SkillName, number] | Array<[SkillName, number]>;

interface TaskBuilder2Params {
  name: string
  type: string
  duration?: number
  reqSkills?: BuilderSkills
  reqItem?: BuilderItems
  // add reqEquipment
  rewardItem?: BuilderItems
  rewardExp?: BuilderSkills
  failItem?: BuilderItems
}

interface CookingTask {
  stopBurn: number
  stopBurnCG?: number
}

interface SomeOtherTask {
  stopDying: number
  stoplol?: number
}

type DoesThisWork = CookingTask | SomeOtherTask | undefined;

const arrayOfArrays = (array: unknown): array is Array<[SkillName, number]> => {
  if (Array.isArray(array)) return Array.isArray(array[0]);
  return false;
};
// function isArrayOfSkillReqs(x: readonly unknown[]): x is BuilderSkills {
//   return Array.isArray(x[0]);
// }
// function isArrayOfItemReqs(x: readonly unknown[]): x is Array<[number, number?]> | [number, number] {
//   return Array.isArray(x[0]);
// }

const skillExists = (skill: SkillName, arrayToSearch: Array<SkillData | ExpReward>): boolean => arrayToSearch.findIndex((obj) => obj.skill === skill) !== -1;

function newFunction(reqSkills: [SkillName, number] | [SkillName, number][] | undefined, subThing: Array<any>, keys: Array<string>) {
  if (reqSkills && reqSkills.length > 0) {
    if (arrayOfArrays(reqSkills)) {
      reqSkills.forEach(([skill, level]) => {
        console.log(keys);
        if (!skillExists(skill, subThing)) {
          subThing.push({ skill, [keys[1]]: level });
        }
      });
    } else {
      console.log(keys);

      const [skill, level] = reqSkills;
      if (!skillExists(skill, subThing)) {
        subThing.push({ skill, [keys[1]]: level });
      }
    }
  }
}

export const taskBuilder2 = (params: TaskBuilder2Params, taskSpecificParams: DoesThisWork = undefined) => {
  const {
    name, reqSkills, reqItem, rewardExp,
  } = params;
  const requirements: TaskRequirements = {
    skills: [],
    items: [],
    equipment: [],
  };
  const rewards = {
    exp: [],
    items: [],
  };
  const fails = {
    items: [],
  };
  const duration = params.duration ?? 0;

  newFunction(reqSkills, requirements.skills, ["skill", "level"]);
  newFunction(rewardExp, rewards.exp, ["skill", "amount"]);
  if (reqItem) {
    // console.log(reqItem);
    // console.log(arrayOfArrays(reqItem));
  }

  return {
    name,
    requirements,
    rewards,
    duration,
    fails,
    ...taskSpecificParams,
  };
};
