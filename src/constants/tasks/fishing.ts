/* eslint-disable arrow-body-style */
/* eslint-disable max-len */

import { TaskDerpThing } from "../../slices/task";
import { store } from "../../redux-stuff";
import {
  TaskInputOptions, CharacterState, FishingTask, SkillName,
} from "../../types/types";
import { SkillNames } from "../data";
import { fishing, FishingTasks } from "../taskData/fishing";
import { expToLevel, randomRoll } from "../../util";
import {
  hasItems, hasSkills, getItemFromBank,
} from "../../util/Requirements";
import { addMsg } from "../../slices/log";
import { RewardStore } from "../builders/RewardStore";
import { SkillNames2 } from "../../types/playground";

interface FishingTaskData {
  tasks: Array<FishingTasks>;
  id: SkillNames;
}

const selectTask = (taskData: FishingTaskData, taskName: string) => taskData.tasks.find((task) => task.names.find((name) => name === taskName));

/**
   * * returns weight from a range based on level
   * @param level level
   * @param low level 1 weight
   * @param high level 99 weight
   */
const calculateWeight = (level: number, low: number, high: number) => {
  return low + ((level - 1) / 98) * (high - low); // divide by total weight to give chance
};

export const fishingTask = async ({ playerID, taskName, amount }: TaskInputOptions): Promise<TaskDerpThing | false> => {
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
    // return false;
  }

  /**
   * * check if the character has the right tool
   */
  if (!hasItems(bank, [tool], 1)) { // todo maybe check "hasOneOf" for a range of tools
    console.log("Fishing tool doesn't exist");
    return false;
  }
  /**
   * * if fishing spot requires bait, check how much we have
   */
  let baitAmount = 0;
  if (selectedFishSpot.bait) {
    baitAmount = getItemFromBank(bank, selectedFishSpot.bait)?.amount ?? 0;
    if (baitAmount === 0) { // id to name for msg
      store.dispatch(addMsg({ playerID, msg: `${playerName} doesn't have any ${selectedFishSpot.bait} for ${taskName}` }));
      return false;
    }
  }

  /**
   * * gets the skill level or returns 0 if it's undefined
   * @param map Map of skills
   * @param skill skillname to return the level for
   */
  const getSkillReqLevel = (map: Map<SkillName, number>, skill: SkillName): number => map.get(skill) || 0;

  /**
   * * Converts the fishingSpot Object to an Array and then sorts them from high to low based on the fishing level
   */
  const fishPool = names
    .reduce((accum: FishingTask[], fish) => [...accum, fishingSpot[fish]], [])
    .sort(
      (a, b) => getSkillReqLevel(a.requirements.skills, "fishing")
        + getSkillReqLevel(b.requirements.skills, "fishing"),
    );

  /**
   * * Target amount of the chosen fish to catch
   */
  const fishToCatch = amount;
  /**
 ** How many of the target fish we caught, total fish can be higher than this
 */
  let fishCaught = 0;

  /**
   ** no more than 6000 ticks (one hour)
   */
  const tickLimit = 6000;
  let tick = 0;

  /**
   * Get initial fishing level
   */
  let fishingLvl = skills.fishing.level;

  const rewardStore = new RewardStore();

  /**
   * * rolls a random number 0 - maxWeight-1 and checks if it's less than the calculated fish weight
   * * does this for all fish, +5 ticks for every attempt
   */
  console.time("start");
  while (fishCaught < fishToCatch && tick < tickLimit) {
    if (selectedFishSpot.bait && baitAmount === 0) {
      console.error("RAN OUT OF BAIT BRAH");
      break;
    }

    for (let index = 0; index < fishPool.length; index += 1) {
      const fish = fishPool[index];

      if (hasSkills(skills, fish.requirements.skills, rewardStore.getExp())) {
        const weight = calculateWeight(fishingLvl, fish.weight1, fish.weight99);
        if (randomRoll(maxWeight) < weight) {
          // Add xp and fish to the reward store
          rewardStore.addReward(fish.rewards);

          // Recalculate fishing level for a potential level-up after a successful catch
          fishingLvl = expToLevel(skills.fishing.exp + rewardStore.get("fishing"), fishingLvl);

          if (fish.name === taskName) {
            fishCaught += 1;
          }
          if (selectedFishSpot.bait) {
            baitAmount -= 1; // I think only 1 bait needed
          }
          // Break the for loop early when a fish is caught
          break;
        }
      }
    }
    // Increment tick counter by 5 for each catch attempt
    tick += 5;
  }

  console.table(rewardStore.getExp());
  console.table(rewardStore.getItems());

  console.timeEnd("start");

  console.log(rewardStore.getStore());

  // await new Promise(r => setTimeout(r, 2000));

  // console.time("hasSkills1");
  // for (let index = 0; index < 100000; index += 1) {
  //   hasSkills(skills, fishPool[2].requirements.skills, rewardStore.getExp());
  // }
  // console.timeEnd("hasSkills1");

  // await new Promise((r) => setTimeout(r, 5000));
  // console.time("hasSkills");
  // for (let index = 0; index < 100000; index += 1) {
  //   hasSkills(skills, fishPool[2].requirements.skills, rewardStore.getExp());
  // }
  // console.timeEnd("hasSkills");
  // await new Promise((r) => setTimeout(r, 5000));
  // console.time("hasSkills2");
  // for (let index = 0; index < 100000; index += 1) {
  //   hasSkills2(skills, fishPool[2].requirements.skills, rewardStore.getExp());
  // }
  // console.timeEnd("hasSkills2");


  // todo return the task object for the reducer

  return false;
};
