/* eslint-disable arrow-body-style */
/* eslint-disable max-len */

import { TaskDerpThing } from "../../slices/task";
import { store } from "../../redux-stuff";
import {
  TaskInputOptions, CharacterState, TaskOptions, SkillName,
} from "../../types/types";
import { SkillNames } from "../data";
import { fishing, FishingTasks } from "../taskData/fishing";
import { expToLevel } from "../../util";
import { hasReqs, hasItems } from "../../util/Requirements";
import { addMsg } from "../../slices/log";

interface FishingTaskData {
  tasks: Array<FishingTasks>;
  id: SkillNames;
}

const selectTask = (taskData: FishingTaskData, taskName: string) => taskData.tasks.find((task) => task.names.find((name) => name === taskName));

export const FishingTask = ({ playerID, taskName, amount }: TaskInputOptions): TaskDerpThing | false => {
  const character: CharacterState = {
    name: store.getState().characters.names[playerID],
    skills: store.getState().characters.skills[playerID],
    equipment: store.getState().characters.equipment[playerID],
    bank: store.getState().characters.banks[playerID],
  };


  const selectedTask = selectTask(fishing, taskName);
  const { name: playerName, skills, bank } = character;

  const startingLevel = expToLevel(skills.fishing.exp);
  const fishingExp = skills.fishing.exp;

  console.log(`checking reqs for ${taskName}`);

  if (!selectedTask) {
    console.error(`Fishing task not found: ${taskName}`);
    return false;
  }
  const { names, tool, fish } = selectedTask;
  console.log(selectedTask);

  if (!hasReqs(character, fish[taskName].requirements, 1)) {
    console.log(`Fishing level is too low for ${taskName}`);
    return false;
  }

  if (!hasItems(bank, [tool], 1)) {
    console.log("Fishing tool doesn't exist");
    return false;
  }

  // if (!hasReqs(character, requirements, amount)) { // todo get req msg
  //   console.log(`${playerName} sucks and misses reqs for ${taskName}`);
  //   store.dispatch(addMsg({ playerID, msg: `${playerName} sucks and misses reqs for ${taskName}` }));

  //   return false;
  // }

  // const findRewardSkill = (skillName: SkillName) => rewards.exp.find((skill) => skill.skill === skillName);
  // const fishingReward = findRewardSkill(SkillNames.fishing);
  // if (!fishingReward) {
  //   console.error(`skillName not found: ${SkillNames.fishing}`);
  //   return false;
  // }
  const percent = (level: number, low: number, high: number, remainder: number) => {
    return ((low + ((level - 1) / 98) * (high - low)) * 100) / remainder;
  };

  /**
   * * returns weight out of 255 for that level
   * @param level level
   * @param low level 1 weight 8/255
   * @param high level 99 weight 64/255
   */
  const weight = (level: number, low: number, high: number) => {
    return low + ((level - 1) / 98) * (high - low); // divide by total weight to give chance
  };

  // every 5 ticks (3s) roll for a chance to catch a fish

  // console.log(weight(99, 8, 64));
  // console.log(weight(99, 16, 96));
  // console.log(weight(99, 32, 192));

  return false;
};
