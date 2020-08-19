/* eslint-disable arrow-body-style */

import { TaskPayloadData } from "src/slices/task";
import { SkillName } from "src/types/types";

interface LogPayload {
  [key: string]: any
}

type Derp = LogPayload | TaskPayloadData;

/*
{
  "playerID": "3",
  "taskType": "Cooking",
  "taskName": "chicken",
  "amount": 3
}
*/

export const format = (type: string, playerName: string, payload: LogPayload): string => {
  if (type === "QueuedTask") {
    const {
      taskType, taskName, amount,
    } = payload;
    return `<orange#${playerName}> queued a ${taskType} task of <green#${amount}x ${taskName}s>`;
  }
  if (type === "CompletedTask") {
    const { info: { amount: taskAmount, name }, reward: { exp }, type: taskType } = payload;
    console.log(payload);

    let expMsg = "";
    if (exp.length > 0) {
      expMsg = "and gained ";
      exp.forEach((expReward: { skill: SkillName; amount: number; }) => {
        const { skill, amount } = expReward;
        expMsg = expMsg.concat(`<cyan#${amount}> ${skill}, `);
      });
    }

    return `<orange#${playerName}> finished their ${taskType} task of <green#${taskAmount}x ${name}s> ${expMsg.trim().slice(0, -1)} exp`;
  }
  if (type === "None") {
    return payload.msg;
  }
  return "false";
};
