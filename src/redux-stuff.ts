/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import {
  combineReducers, configureStore, createSlice, getDefaultMiddleware, AnyAction, Dispatch,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { takeEvery, all, put } from "redux-saga/effects";
import logger from "redux-logger";
import { useDispatch } from "react-redux";
import { SkillName, TaskReward } from "./types/types";
import charactersInitialState from "./model/CharacterBuilder";
import { addBankToBank } from "./util";

interface RewardPayload {
  payload: {
    playerID: string,
    reward: TaskReward,
  }
}
interface HandleRewardPayload {
  payload: {
    playerID: string,
    reward: TaskReward,
    type: string,
  }
}

export interface TaskInfo {
  name: string,
  amount?: number
}

type TaskPayload = {
  payload: {
    playerID: string
    duration: number
    type: string
    info: TaskInfo
    skill: SkillName
    reward: TaskReward
  }
};

export type TaskState = {
  [characterID: string]: {
    queue: Array<QueuedTask>
    active: boolean
    activeTask: TaskDerpThingWithWhen | false;
  }
};

const characterSlice = createSlice({
  name: "characters",
  initialState: charactersInitialState({}),
  reducers: {
    addReward: (state, { payload: { playerID, reward } }: RewardPayload) => {
      const skills = state.skills[playerID];
      const name = state.names[playerID];
      const bank = state.banks[playerID];
      const { exp, items } = reward;
      if (exp.length > 0) {
        let expMsg = `${name} gained `;
        exp.forEach((expReward) => {
          const { skill, amount } = expReward;
          skills[skill].exp += amount;
          expMsg = expMsg.concat(`${amount} ${skill}, `);
        });
        console.log(`${expMsg.trim().slice(0, -1)} exp`);
      }

      if (items.length > 0) {
        state.banks[playerID] = addBankToBank(bank, items);
      }
    },
  },
});

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

type NewTaskPayload = {
  payload: {
    playerID: string
    taskType: string
    taskName: string
    amount: number
  }
};

export type QueuedTask = {
  playerID: string
  taskType: string
  taskName: string
  amount: number
};

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

type ProcessQueueTaskPayload = {
  payload: {
    playerID: string
    task: TaskDerpThing | false
  }
};

const taskSlice = createSlice({
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
        queue.shift();
        return;
      }

      if (active === true) {
        console.error("This really shouldn't happen ever, what the fuck did you do?!");
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

export const {
  addReward,
} = characterSlice.actions;

export function* handleRewardRequest(action: RewardPayload) {
  const { playerID, reward } = action.payload;
  yield put(addReward({ playerID, reward }));
}

export function* taskSagas() {
  yield all([
    takeEvery(handleReward, handleRewardRequest),
  ]);
}

// SAGA SHIT
export function* rootSaga() {
  yield all([taskSagas()]);
}

const reducer = combineReducers({
  tasks: taskSlice.reducer,
  characters: characterSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware(), sagaMiddleware, logger];
const store = configureStore({
  reducer,
  middleware,
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): Dispatch<AnyAction> => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
