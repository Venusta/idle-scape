/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { getRandomInt, expToLevel } from "../../util";
import { SkillName } from "../../types/types";
import Cooking from "../skills/cooking";
import store, { TaskDerpThing } from "../../redux-stuff";
import { SkillNames } from "../data";
import { hasReqs } from "../../util/Requirements";

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

    const selectedTask = Cooking.cookables.find((taskType) => taskType.name === taskName);
    if (!selectedTask) {
      console.log("Cooking task not found");
      return false;
    }

    // todo fix item req amounts
    const {
      name, requirements, duration, rewards, stopBurnLevel,
    } = selectedTask;

    // console.log(hasSkills(playerID, requirements.skills));
    // console.log(hasEquipment(playerID, requirements.equipment));
    // console.log(hasItems(playerID, requirements.items, amount));
    console.log(hasReqs(playerID, requirements, amount));

    if (!hasReqs(playerID, requirements, amount)) {
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
