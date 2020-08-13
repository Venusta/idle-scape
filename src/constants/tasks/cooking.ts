/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-len */
import { getRandomInt, expToLevel } from "../../util";
import { CookingTaskOptions, SkillName, TaskReward } from "../../types/types";
import Cooking from "../skills/cooking";
import store, { TaskInfo, TaskDerpThing } from "../../redux-stuff";
import { SkillNames } from "../data";
import Requirements from "./Requirements";

interface LapOptions {
  playerID: string;
  taskName: string;
  amount: number
}

export default class CookingTask {
  private playerID: string;
  private taskName: string;
  private amount: number;
  private playerName: string;
  private cookingExp: number;

  constructor({ playerID, taskName, amount }: LapOptions) {
    this.playerID = playerID;
    this.taskName = taskName;
    this.amount = amount;
    this.playerName = store.getState().characters.names[playerID];
    this.cookingExp = store.getState().characters.skills[playerID].cooking.exp;
  }

  start = ():TaskDerpThing | false => {
    const {
      playerID, taskName, amount, playerName,
    } = this;

    const selectedTask: CookingTaskOptions | undefined = Cooking.cookables.find((taskType) => taskType.name === taskName);
    if (!selectedTask) {
      console.log("Cooking task not found");
      return false;
    }

    const {
      name, requirements, duration, rewards, stopBurnLevel,

    } = selectedTask;

    console.log(selectedTask);

    const doesPlayer = new Requirements(playerID, requirements);

    if (!doesPlayer.haveReqs()) {
      console.log(`${playerName} sucks and misses reqs for ${name}`);
      return false;
    }

    console.log(`${playerName} wants to cook ${amount}x ${name}`);

    const findReward = (skillName: SkillName) => rewards.exp.find((skill) => skill.skill === skillName);
    const cookingReward = findReward(SkillNames.cooking);
    if (!cookingReward) {
      console.error("somehow you fucked up");
      return false;
    }

    let cooked = 0;
    let burned = 0;
    for (let index = 0; index < this.amount; index += 1) {
      if (expToLevel(this.cookingExp) >= stopBurnLevel) {
        cooked += this.amount - index;
        this.cookingExp += cooked * cookingReward.amount;
        break;
      }
      const rng = getRandomInt(1, 100);
      if (rng > stopBurnLevel - expToLevel(this.cookingExp)) {
        console.log(`Level: ${expToLevel(this.cookingExp)}`);
        this.cookingExp += cookingReward.amount;
        cooked += 1;
        // console.log(`${burned}x Burned food! ${rng} < ${stopBurnLevel - cooking.level}`);
      } else {
        burned += 1;
      }
    }
    console.log(`${burned + cooked === this.amount} ${burned}x burned ${cooked}x cooked food! level: ${expToLevel(this.cookingExp)}`);

    // const reward = new RewardBuilder(rewards).amount(amount);
    const reward = {
      exp: [
        { skill: SkillNames.cooking, amount: cookingReward.amount * cooked },
      ],
      items: [
        { item: selectedTask.rewards.items[0].item, amount: cooked },
        { item: selectedTask.fails.items[0].item, amount: this.amount - cooked },
      ], // todo reward builder this
    };

    const totalDuration = amount * duration * 100; // TODO should be 1000

    const skill = SkillNames.cooking;
    const type = "CookingTask";
    const info = {
      name,
      amount,
    };

    const taskObj = {
      playerID,
      duration: totalDuration,
      type,
      info,
      skill,
      reward,
    };

    return taskObj;
  };
}
