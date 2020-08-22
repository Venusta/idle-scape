/* eslint-disable arrow-body-style */
/* eslint-disable max-len */

import { TaskDerpThing } from "../../slices/task";
import { store } from "../../redux-stuff";
import {
  TaskInputOptions, CharacterState, FishingTask, SkillName,
} from "../../types/types";
import { SkillNames } from "../data";
import { fishing, FishingTasks } from "../taskData/fishing";
import { expToLevel, getRandomInt } from "../../util";
import {
  hasReqs, hasItems, hasSkills, getItemFromBank,
} from "../../util/Requirements";
import { addMsg } from "../../slices/log";
import { RewardBuilder } from "../builders/RewardBuilder";

interface FishingTaskData {
  tasks: Array<FishingTasks>;
  id: SkillNames;
}

const selectTask = (taskData: FishingTaskData, taskName: string) => taskData.tasks.find((task) => task.names.find((name) => name === taskName));

/**
   * * returns weight out of 255 for that level
   * @param level level
   * @param low level 1 weight 8/255
   * @param high level 99 weight 64/255
   */
const calculateWeight = (level: number, low: number, high: number) => {
  return low + ((level - 1) / 98) * (high - low); // divide by total weight to give chance
};

export const fishingTask = ({ playerID, taskName, amount }: TaskInputOptions): TaskDerpThing | false => {
  const character: CharacterState = {
    name: store.getState().characters.names[playerID],
    skills: store.getState().characters.skills[playerID],
    equipment: store.getState().characters.equipment[playerID],
    bank: store.getState().characters.banks[playerID],
  };
  const { name: playerName, skills, bank } = character;

  /**
   * * select the fishing spot
   */
  const selectedFishSpot = selectTask(fishing, taskName);

  /**
   * * check the fishing spot is valid
   */
  if (!selectedFishSpot) {
    console.error(`Fishing task not found: ${taskName}`);
    return false;
  }
  const {
    tool, fishingSpot, maxWeight, names,
  } = selectedFishSpot;
  console.log(selectedFishSpot);

  /**
   * * check if the character has reqs for the chosen fish from the fishing spot
   */
  if (!hasSkills(skills, fishingSpot[taskName].requirements.skills)) {
    console.log(`${playerName}'s fishing level is too low for ${taskName}`);
    store.dispatch(addMsg({ playerID, msg: `${playerName}'s fishing level is too low for ${taskName}` }));
    return false;
  }

  /**
   * * check if the character has the right tool
   */
  if (!hasItems(bank, [tool], 1)) {
    console.log("Fishing tool doesn't exist");
    return false;
  }
  /**
   * * if fishing spot requires bait, check how much we have
   */
  let baitAmount = 0;
  if (selectedFishSpot.bait) { // todo store bait higher up
    baitAmount = getItemFromBank(bank, selectedFishSpot.bait)?.amount ?? 0;
    if (baitAmount === 0) { // id to name for msg
      store.dispatch(addMsg({ playerID, msg: `${playerName} doesn't have any ${selectedFishSpot.bait} for ${taskName}` }));
      return false;
    }
  }

  /**
   * * set the characters fishing level based on it's exp
   */
  const startingLevel = expToLevel(skills.fishing.exp);

  /**
   * * local fishing exp, we update this when a fish is caught in the sim
   */
  let fishingExp = skills.fishing.exp;

  /**
   * * gets the skill level or returns 0 if it's undefined
   * @param map Map of skills
   * @param skill skillname to return the level for
   */
  const getSkillReqLevel = (map: Map<SkillName, number>, skill: SkillName): number => map.get(skill) || 0;

  /**
   * * the fish the character has reqs for, should be re-checked if the character levels up
   * * sorted by level, highest first
   */
  const fishPool = names.reduce((accum: FishingTask[], fish) => { // todo recalc on level maybe
    if (hasSkills(character.skills, fishingSpot[fish].requirements.skills)) {
      return [...accum, fishingSpot[fish]];
    }
    return accum;
  }, []).sort((a, b) => getSkillReqLevel(a.requirements.skills, "fishing") + getSkillReqLevel(b.requirements.skills, "fishing"));

  /**
   * * task amount or bait amount, whichever is lower
   */
  const fishToCatch = amount;
  /**
 ** where we store all the caught fishies
 */
  const fishBank: {[name: string] : { amount: number, exp: number}} = names.reduce((accum, name) => {
    return { ...accum, [name]: { amount: 0, exp: 0 } };
  }, {});

  let totalFishCaught = 0;

  /**
   ** no more than 6000 ticks (one hour)
   */
  const tickLimit = 6000;
  let tick = 0;

  /**
   * * rolls a random number 0 - maxWeight and checks if it's less than the calculated fish weight
   * * does this for all fish, if caught +5 ticks, if fail +1 tick for every attempt
   */
  while (totalFishCaught < fishToCatch && tick < tickLimit) {
    const roll = getRandomInt(0, maxWeight);

    for (let index = 0; index < fishPool.length; index += 1) {
      const fish = fishPool[index];
      const weight = calculateWeight(expToLevel(fishingExp), fish.weight1, fish.weight99);
      if (roll < weight) {
        fishingExp += fish.rewards.exp[0].amount; // todo loop all skills
        fishBank[fish.name].amount += 1;
        fishBank[fish.name].exp += fish.rewards.exp[0].amount; // todo award the proper exp
        totalFishCaught += 1;
        tick += 5; // +5 ticks because we caught a fish
        break;
      } else {
        tick += 1; // +1 cause failed to catch
      }
    }
  }

  console.log(`Caught ${totalFishCaught}/${fishToCatch} fish\nIt took ${tick * 0.6} seconds`);
  console.log(fishBank);

  const reward = new RewardBuilder() // temp
    .rewardExp(selectedFishSpot.fishingSpot.shrimp.rewards.exp[0], totalFishCaught)
    .finalise();

  console.log(reward);

  return false;
};
