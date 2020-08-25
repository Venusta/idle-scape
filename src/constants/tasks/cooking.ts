/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import { Skills } from "../../model/Skills";
import { store } from "../../redux-stuff";
import { addMsg } from "../../slices/log";
import { cooking } from "../taskData/cooking";
import { SkillNames } from "../data";
import { hasReqs } from "../../util/Requirements";
import {
  TaskRequirements, TaskReward, TaskFail, EquipmentSlots, ItemData, SkillName, TaskInputOptions, TaskOptions,
} from "../../types/types";
import { expToLevel, getRandomInt } from "../../util";
import { RewardBuilder } from "../builders/RewardBuilder";
import { LogMsgBuilder } from "../builders/LogMsgBuilder";
import { TaskDerpThing } from "../../slices/task";

export interface CookingTask extends TaskOptions {
  stopBurnLevel: number;
  stopBurnGauntlets: number;
}

interface CookingTaskData {
  tasks: Array<CookingTask>;
  id: SkillNames;
}

interface CharacterState {
  name: string;
  skills: Skills;
  equipment: EquipmentSlots;
  bank: ItemData[];
}

const selectTask = (taskData: CookingTaskData, taskName: string) => {
  return taskData.tasks.find((task) => task.name === taskName);
};

export const cookingTask = ({ playerID, taskName, amount }: TaskInputOptions): TaskDerpThing | false => {
  const character: CharacterState = {
    name: store.getState().characters.names[playerID],
    skills: store.getState().characters.skills[playerID],
    equipment: store.getState().characters.equipment[playerID],
    bank: store.getState().characters.banks[playerID],
  };

  const selectedTask = selectTask(cooking, taskName);
  const { name: playerName, skills } = character;

  const startingLevel = expToLevel(skills.cooking.exp);
  let cookingExp = skills.cooking.exp;

  if (!selectedTask) {
    console.error(`Cooking task not found: ${taskName}`);
    return false;
  }

  const {
    requirements, duration, rewards, stopBurnLevel,
  } = selectedTask;

  if (!hasReqs(character, requirements, amount)) { // todo get req msg
    console.log(`${playerName} sucks and misses reqs for ${taskName}`);
    store.dispatch(addMsg({ playerID, msg: `${playerName} sucks and misses reqs for ${taskName}` }));

    return false;
  }
  // todo remove the req items from bank and put it on the
  // todo task object so it can be returned if the task is cancelled

  // const findRewardSkill = (skillName: SkillName) => rewards.exp.find(({ skill }) => skill === skillName);
  //@ts-ignore
  const cookingXp = rewards.exp.get(SkillNames.cooking);
  if (!cookingXp) {
    console.error(`skillName not found: ${SkillNames.cooking}`);
    return false;
  }

  let cooked = 0;
  let burned = 0;
  for (let index = 0; index < amount; index += 1) {
    if (expToLevel(cookingExp) >= stopBurnLevel) {
      cooked += amount - index;
      cookingExp += cooked * cookingXp;
      break;
    }
    const rng = getRandomInt(1, 100);
    if (rng > stopBurnLevel - expToLevel(cookingExp)) {
      // console.log(`Level: ${expToLevel(cookingExp)}`);
      cookingExp += cookingXp;
      cooked += 1;
      // console.log(`${burned}x Burned food! ${rng} < ${stopBurnLevel - cooking.level}`);
    } else {
      burned += 1;
    }
  }
  console.log(`${burned + cooked === amount} ${burned}x burned ${cooked}x cooked food! level: ${expToLevel(cookingExp)}`);

  // const reward = new RewardBuilder()
  //   .rewardItem(selectedTask.rewards.items.[0], cooked)
  //   .rewardExp("cooking", selectedTask.rewards.exp.get("cooking"), cooked)
  //   // .rewardExp({ skill: "construction", amount: 93 }, cooked)
  //   // .rewardExp({ skill: "smithing", amount: 23 }, cooked)
  //   .rewardItem(selectedTask.fails.items[0], amount - cooked)
  //   .finalise();

  const totalDuration = amount * duration * 0.1; // TODO should be 1

  // todo return this in the task object
  let taskFinishMsg = `[Test] <orange#${playerName}> finished cooking <green#${amount} ${taskName}s>`;
  taskFinishMsg += ` and gained <cyan#${cookingXp * cooked}> cooking xp`;
  if (expToLevel(cookingExp) > startingLevel) { // todo make this universal maybe
    taskFinishMsg += ` their cooking level is now <cyan#${expToLevel(cookingExp)}>`;
  }
  taskFinishMsg += ".";
  // todo build the final string for the task complete, calc the level up and xp gain internally so we can display it from one place
  console.log(taskFinishMsg);
  store.dispatch(addMsg({ playerID, msg: taskFinishMsg }));

  const msg = new LogMsgBuilder()
    .finished(playerName, "cooking", amount, taskName)
    // .gaining(reward.exp)
    .toString();
  console.log(msg);

  const skill = SkillNames.cooking;
  const type = "cooking";
  const info = {
    name: taskName,
    amount,
  };

  const taskObj = {
    playerID,
    duration: totalDuration,
    type,
    info,
    skill,
    //@ts-ignore // TODO FIX THIS
    reward,
  };

  return taskObj;
};
