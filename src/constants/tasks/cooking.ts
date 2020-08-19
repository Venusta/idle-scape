/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { addMsg } from "../../slices/log";
import { getRandomInt, expToLevel } from "../../util";
import { SkillName } from "../../types/types";
import { Cooking } from "../taskData/cooking";
import { store } from "../../redux-stuff";
import { SkillNames } from "../data";
import { hasReqs } from "../../util/Requirements";
import { TaskDerpThing } from "../../slices/task";
import { format } from "../../model/LogFormatter";
import { RewardBuilder } from "../builders/RewardBuilder";

interface LapOptions {
  playerID: string;
  taskName: string;
  amount: number
}

export class CookingTask {
  private playerID: string;
  private taskName: string;
  private amount: number;
  private playerName: string;
  private cookingExp: number;
  private startingLevel: number;

  constructor({ playerID, taskName, amount }: LapOptions) {
    this.playerID = playerID;
    this.taskName = taskName;
    this.amount = amount;
    this.playerName = store.getState().characters.names[playerID];
    this.cookingExp = store.getState().characters.skills[playerID].cooking.exp;
    this.startingLevel = expToLevel(this.cookingExp);
  }

  start = ():TaskDerpThing | false => {
    const {
      playerID, taskName, amount, playerName,
    } = this;

    const selectedTask = Cooking.cookables.find((taskType) => taskType.name === taskName);
    if (!selectedTask) {
      console.error(`Cooking task not found: ${taskName}`);
      return false;
    }

    const {
      name, requirements, duration, rewards, stopBurnLevel,
    } = selectedTask;

    // console.log(hasSkills(playerID, requirements.skills));
    // console.log(hasEquipment(playerID, requirements.equipment));
    // console.log(hasItems(playerID, requirements.items, amount));
    // console.log(hasReqs(playerID, requirements, amount));

    if (!hasReqs(playerID, requirements, amount)) { // todo get req msg
      console.log(`${playerName} sucks and misses reqs for ${name}`);
      store.dispatch(addMsg({ playerID, msg: `${playerName} sucks and misses reqs for ${name}` }));
      return false;
    }
    // todo remove the req items from bank and put it on the
    // todo task object so it can be returned if the task is cancelled

    // console.log(`${playerName} wants to cook ${amount}x ${name}`);

    const findRewardSkill = (skillName: SkillName) => rewards.exp.find((skill) => skill.skill === skillName);
    const cookingReward = findRewardSkill(SkillNames.cooking);
    if (!cookingReward) {
      console.error(`skillName not found: ${SkillNames.cooking}`);
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
        // console.log(`Level: ${expToLevel(this.cookingExp)}`);
        this.cookingExp += cookingReward.amount;
        cooked += 1;
        // console.log(`${burned}x Burned food! ${rng} < ${stopBurnLevel - cooking.level}`);
      } else {
        burned += 1;
      }
    }
    console.log(`${burned + cooked === this.amount} ${burned}x burned ${cooked}x cooked food! level: ${expToLevel(this.cookingExp)}`);

    const reward = new RewardBuilder()
      .rewardItem(selectedTask.rewards.items[0], cooked)
      .rewardExp(selectedTask.rewards.exp[0], cooked)
      .rewardItem(selectedTask.fails.items[0], this.amount - cooked)
      .finalise();

    const totalDuration = amount * duration * 0.01; // TODO should be 1

    // todo return this in the task object
    let taskFinishMsg = `[Test] <orange#${this.playerName}> finished cooking <green#${amount} ${name}s>`;
    taskFinishMsg += ` and gained <cyan#${cookingReward.amount * cooked}> cooking xp`;
    if (expToLevel(this.cookingExp) > this.startingLevel) { // todo make this universal maybe
      taskFinishMsg += ` their cooking level is now <cyan#${expToLevel(this.cookingExp)}>`;
    }
    taskFinishMsg += ".";
    // todo build the final string for the task complete, calc the level up and xp gain internally so we can display it from one place
    console.log(taskFinishMsg);
    store.dispatch(addMsg({ playerID, msg: format("None", this.playerID, { msg: taskFinishMsg }) }));

    const skill = SkillNames.cooking;
    const type = "cooking";
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
