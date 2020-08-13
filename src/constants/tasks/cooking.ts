/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-len */
import { getRandomInt, expToLevel } from "../../util";
import { CookingTaskOptions, SkillName, TaskReward } from "../../types/types";
import Cooking from "../skills/cooking";
import store, { task } from "../../redux-stuff";
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

  public calculateRewards = (): TaskReward => {
    console.log("REWARDS RECALCULATED");
    console.log(`Cooking from level ${expToLevel(this.cookingExp)} instead of 1!!!`);

    const selectedTask: CookingTaskOptions | undefined = Cooking.cookables.find((taskType) => taskType.name === this.taskName);
    if (!selectedTask) {
      console.log("Cooking task not found");
      return { exp: [], items: [] };
    }

    const {
      rewards, stopBurnLevel,
    } = selectedTask;

    const findReward = (skillName: SkillName) => rewards.exp.find((skill) => skill.skill === skillName);
    const cookingReward = findReward(SkillNames.cooking);
    if (!cookingReward) {
      console.error("somehow you fucked up");
      return { exp: [], items: [] };
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
    console.log(reward);

    return reward;
  };

  start = ():void => {
    const {
      playerID, taskName, amount, playerName,
    } = this;

    const selectedTask: CookingTaskOptions | undefined = Cooking.cookables.find((taskType) => taskType.name === taskName);
    if (!selectedTask) {
      console.log("Cooking task not found");
      return;
    }

    const {
      name, requirements, duration,
    } = selectedTask;

    console.log(selectedTask);

    const doesPlayer = new Requirements(playerID, requirements);

    if (!doesPlayer.haveReqs()) {
      console.log(`${playerName} sucks and misses reqs for ${name}`);
      return;
    }

    console.log(`${playerName} wants to cook ${amount}x ${name}`);

    const totalDuration = amount * duration * 10; // TODO should be 1000

    const skill = SkillNames.cooking;
    const type = "CookingTask";
    const info = {
      name,
      amount,
    };
    const reward = this.calculateRewards();

    const taskObj = {
      playerID,
      duration: totalDuration,
      type,
      info,
      skill,
      reward,
    };

    store.dispatch(task(taskObj));
  };
}
