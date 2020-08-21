/* eslint-disable arrow-body-style */
/* eslint-disable max-len */

import { TaskDerpThing } from "../../slices/task";
import { store } from "../../redux-stuff";
import {
  TaskInputOptions, CharacterState,
} from "../../types/types";
import { SkillNames } from "../data";
import { fishing, FishingTasks } from "../taskData/fishing";
import { expToLevel, getRandomInt } from "../../util";
import { hasReqs, hasItems, hasSkills } from "../../util/Requirements";
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

  const selectedFishSpot = selectTask(fishing, taskName);
  const { name: playerName, skills, bank } = character;

  const startingLevel = expToLevel(skills.fishing.exp);
  let fishingExp = skills.fishing.exp;

  console.log(`checking reqs for ${taskName}`);

  if (!selectedFishSpot) {
    console.error(`Fishing task not found: ${taskName}`);
    return false;
  }
  const {
    tool, fishingSpot, totalWeight, names,
  } = selectedFishSpot;
  console.log(selectedFishSpot);

  if (!hasReqs(character, fishingSpot[taskName].requirements, 1)) {
    console.log(`${playerName}'s fishing level is too low for ${taskName}`);
    store.dispatch(addMsg({ playerID, msg: `${playerName}'s fishing level is too low for ${taskName}` }));
    return false;
  }

  if (!hasItems(bank, [tool], 1)) {
    console.log("Fishing tool doesn't exist");
    return false;
  }
  // todo get amount of bait, use all if below amount, return false if 0

  // const findRewardSkill = (skillName: SkillName) => rewards.exp.find((skill) => skill.skill === skillName);
  // const fishingReward = findRewardSkill(SkillNames.fishing);
  // if (!fishingReward) {
  //   console.error(`skillName not found: ${SkillNames.fishing}`);
  //   return false;
  // }
  const possibleFish: { fish: string; hm: any; }[] = []; // todo duno
  names.forEach((fish) => {
    console.log(fishingSpot[fish].requirements);
    if (hasSkills(character.skills, fishingSpot[fish].requirements.skills)) {
      possibleFish.push({ fish, hm: fishingSpot[fish] });
    }
  });
  console.log(possibleFish);

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

  console.log("yeet");

  const fishToCatch = amount; // or bait amount, whichever is lower
  let tick = 0;
  // for (let index = 0; index < fishToCatch; index += 1) {
  // const element = array[index];
  const {
    weight1, weight99, rewards,
  } = selectedFishSpot.fishingSpot.shrimp;
  const { skill, amount: amt } = rewards.exp[0];
  console.log(fishToCatch);

  let fishCaught = 0;

  // todo sort fish by level, roll for the weight starting with highest level first

  while (fishCaught < fishToCatch && tick < 6000) {
    const idk = weight(expToLevel(fishingExp), weight1, weight99);
    // console.log(`Level: ${expToLevel(fishingExp)} Weight: ${idk}`);

    const roll = getRandomInt(0, totalWeight);
    if (roll < idk) {
      console.log("Fish caught");
      fishingExp += amt;
      fishCaught += 1;
      tick += 4;
    }
    tick += 1;
  }
  console.log(`Caught ${fishCaught}/${fishToCatch} ${taskName}\nIt took ${tick * 0.6} seconds`);

  return false;
};
