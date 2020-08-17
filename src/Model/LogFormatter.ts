/* eslint-disable arrow-body-style */

interface LogPayload {
  [key: string]: string | number
}

/*
{
  "playerID": "3",
  "taskType": "Cooking",
  "taskName": "chicken",
  "amount": 3
}
*/

const format = (type: string, playerName: string, payload: LogPayload) => {
  if (type === "QueuedTask") {
    const {
      taskType, taskName, amount,
    } = payload;
    return `<orange#${playerName}> queued a ${taskType} task of <green#${amount}x ${taskName}s> some text <cyan#after> just in case`;
  }
  return "false";
};

export default format;
