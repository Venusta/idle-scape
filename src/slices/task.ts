/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
import { createSlice } from "@reduxjs/toolkit";
import { TaskReward, SkillName } from "../types/types";

export type QueuedTask = {
  playerID: string
  taskType: string
  taskName: string
  amount: number
};

export interface TaskInfo {
  name: string,
  amount?: number
}

type ProcessQueueTaskPayload = {
  payload: {
    playerID: string
    task: TaskDerpThing | false
  }
};

type NewTaskPayload = {
  payload: QueuedTask
};

interface HandleRewardPayload {
  payload: {
    playerID: string,
    reward: TaskReward,
    type: string,
  }
}

export interface TaskDerpThing {
  playerID: string
  duration: number
  type: string
  info: TaskInfo
  skill: SkillName
  reward: TaskReward
}
export interface TaskDerpThingWithWhen extends TaskDerpThing {
  when: number
}

export type TaskState = {
  [characterID: string]: {
    queue: Array<QueuedTask>
    active: boolean
    activeTask: TaskDerpThingWithWhen | false;
  }
};

const taskInitialState: TaskState = { // todo auto generate based on character ids / save
  3: {
    queue: [],
    active: false,
    activeTask: false,
  },
  9: {
    queue: [],
    active: false,
    activeTask: false,
  },
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState: taskInitialState,
  reducers: {
    newTask: (state, { payload: { playerID, taskType, taskName, amount } }: NewTaskPayload) => {
      const { queue } = state[playerID];
      queue.push({ playerID, taskType, taskName, amount });
    },

    processQueue: (state, { payload: { playerID, task } }: ProcessQueueTaskPayload) => {
      const { queue, active } = state[playerID];

      if (task === false) {
        console.log("Task doesn't exist or reqs not met");
        state[playerID].activeTask = false;
        queue.shift();
        return;
      }

      if (active === true) {
        console.error("This really shouldn't happen ever, what the fuck did you do?!");
        state[playerID].activeTask = false;
        queue.shift();
        return;
      }

      const { duration } = task;
      const now = Date.now();
      const when = now + duration;

      console.log(`Setting character ${playerID}'s queue to active`);
      state[playerID].active = true;
      state[playerID].activeTask = {
        when,
        ...task,
      };
      queue.shift();
    },
    handleReward: (state, { payload: { playerID, reward, type } }: HandleRewardPayload) => {
      console.log("reward:");
      console.log(reward);

      console.log(`${type} task finished.`);
      state[playerID].active = false;
      const { queue } = state[playerID];
      if (queue.length === 0) state[playerID].activeTask = false; // may cause issues
    },
  },
});

export const {
  handleReward,
  newTask,
  processQueue,
} = taskSlice.actions;
