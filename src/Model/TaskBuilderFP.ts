/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import {
  SkillName, ItemData,
} from "../types/types";
import { store } from "../redux-stuff";
import { Skills } from "./Skills";
// todo trash
type SkillArray = [SkillName, number];
type ItemArray = [number, number];
type BuilderItems = ItemArray | Array<ItemArray>;
type BuilderSkills = SkillArray | Array<SkillArray>;

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

// function isArrayOfSkillReqs(x: readonly unknown[]): x is BuilderSkills {
//   return Array.isArray(x[0]);
// }
// function isArrayOfItemReqs(x: readonly unknown[]): x is Array<[number, number?]> | [number, number] {
//   return Array.isArray(x[0]);
// }

// const skillExists = (skill: SkillName, arrayToSearch: Array<SkillData | ExpReward>): boolean => arrayToSearch.findIndex((obj) => obj.skill === skill) !== -1;

// function ohGod(reqSkills: [SkillName, number] | [SkillName, number][] | undefined, subThing: Array<any>, keys: Array<string>) {
//   if (reqSkills && reqSkills.length > 0) {
//     if (arrayOfSkillReqs(reqSkills)) {
//       reqSkills.forEach(([skill, level]) => {
//         if (!skillExists(skill, subThing)) {
//           subThing.push({ skill, [keys[1]]: level });
//         }
//       });
//     } else {
//       const [skill, level] = reqSkills;
//       if (!skillExists(skill, subThing)) {
//         subThing.push({ skill, [keys[1]]: level });
//       }
//     }
//   }
// }

const arrayOfArrays = (array: unknown): array is Array<SkillArray> | Array<ItemArray> => {
  if (Array.isArray(array)) return Array.isArray(array[0]);
  return false;
};

const checkOneSkillReq = (reqSkill: [SkillName, number], playerSkills: Skills): [boolean, SkillName] => {
  const [skill, reqLevel] = reqSkill;
  if (playerSkills[skill].level < reqLevel) {
    return [false, skill];
  }
  return [true, skill];
};

const checkSkillReqs = (reqSkills: BuilderSkills = []): [boolean, SkillName][] | [] => {
  const playerSkills = store.getState().characters.skills["3"];
  const reqs = [];
  if (reqSkills.length === 0) return [];
  if (arrayOfArrays(reqSkills)) {
    reqSkills.forEach((reqSkill) => {
      reqs.push(checkOneSkillReq(reqSkill, playerSkills));
    });
  } else {
    reqs.push(checkOneSkillReq(reqSkills, playerSkills));
  }
  return reqs;
};

const checkOneItemReq = (reqItem: [number, number], playerItems: ItemData[]): [boolean, number, number] => {
  const [item, amount] = reqItem;
  if (amount < 1) {
    console.error(`NEED AT LEAST ONE OF ${item}`);
    return [false, item, amount];
  }
  const searchBank = playerItems.find((element) => (item === element.item && element.amount >= amount));
  if (searchBank) {
    return [true, item, amount];
  }
  return [false, item, amount];
};

const checkItemReqs = (reqItems: BuilderItems = []): [boolean, number, number][] => {
  const playerItems = store.getState().characters.banks["3"];
  const reqs: [boolean, number, number][] = [];
  if (reqItems.length === 0) return [];

  if (arrayOfArrays(reqItems)) {
    reqItems.forEach((reqItem) => {
      reqs.push(checkOneItemReq(reqItem, playerItems));
    });
  } else {
    reqs.push(checkOneItemReq(reqItems, playerItems));
  }
  return reqs;
};

export const taskBuilder2 = (params: TaskBuilder2Params, taskSpecificParams: DoesThisWork = undefined) => {
  const {
    name, reqSkills, reqItem, rewardExp,
  } = params;
  const requirements = {
    skills: reqSkills || [],
    items: reqItem || [],
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

  const y = checkSkillReqs(reqSkills);
  const passAllReqs = y.every(([bool]) => bool);
  console.log(y);
  if (passAllReqs === true) {
    console.log("Skill reqs passed");
  }

  const z = checkItemReqs(reqItem);
  const passAllItem = z.every(([bool]) => bool);
  console.log(z);
  if (passAllItem === true) {
    console.log("Item reqs passed");
  }
  console.log("---------------------");

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
