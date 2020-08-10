/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import {
  combineReducers, configureStore, createSlice, getDefaultMiddleware, AnyAction, Dispatch,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { takeEvery, all, put } from "redux-saga/effects";
import logger from "redux-logger";
import { useDispatch } from "react-redux";
import { SkillsStats, ItemData, SkillName } from "./types/types";
import charactersInitialState from "./model/OhGodWhy";
import { addBankToBank } from "./util";

export type QueuedTask = {
  playerID: string
  when: number
  duration: number
  type: string
  info: TaskInfo
  skill: SkillName
  reward: TaskReward
};

interface RewardPayload {
  payload: {
    playerID: string,
    reward: TaskReward,
    type: string,
  }
}

type ExpReward = { [Key in SkillName]?: number; };

export interface TaskReward {
  exp?: ExpReward
  items?: ItemData[]
}

interface TaskInfo {
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

export type TaskState = {[characterID: string]:{ queue: Array<QueuedTask>} };

const characterSlice = createSlice({
  name: "characters",
  initialState: charactersInitialState({}),
  reducers: { // todo maybe handle all rewards
    addReward: (state, { payload: { playerID, reward } }: RewardPayload) => {
      const skills = state.skills[playerID];
      const name = state.names[playerID];
      const bank = state.banks[playerID];

      const { exp, items } = reward;

      if (exp) {
        let expMsg = `${name} gained `;
        Object.entries(exp).forEach((expReward) => {
          const [skill, amount = 0] = expReward;
          skills[skill as keyof SkillsStats].exp += amount;
          expMsg = expMsg.concat(`${amount} ${skill}, `);
        });
        console.log(`${expMsg.trim().slice(0, -1)} exp`);
      }

      if (items) {
        state.banks[playerID] = addBankToBank(items, bank);
        console.log(items);
      }
    },
    // changeName: (state, { payload: { playerID, newName } }: { payload: { playerID: number, newName: string } }) => {
    //   const { name } = state[playerID];
    //   state[playerID].name = newName;
    //   console.log(`${name} changed to ${newName}`);
    // },
  },
});

const taskInitialState: TaskState = { // todo auto generate based on character ids / save
  3: { queue: [] },
  9: { queue: [] },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: taskInitialState,
  reducers: {
    // eslint-disable-next-line object-curly-newline
    task: (state, { payload: { playerID, duration, type, info, skill, reward } }: TaskPayload) => {
      if (!state[playerID]) {
        console.error("FUCK, Something went wrong!");
        return;
      }

      const { queue } = state[playerID];

      const now = Date.now();
      let when = 0;
      if (queue.length === 0) {
        when = now + duration;
      } else {
        const lastQueueWhen = queue[queue.length - 1].when;
        when = lastQueueWhen + duration;
      }

      /*
      * push task to queue { duration, type, info, reward, playerID }
      * the queue itself then calculates when the next task is done
      * queue can process one task per playerID
      * ability to cancel tasks by clicking them (can confirm)
      * reodering the task list will recalculate when the tasks finish
      * active tasks can't be re-ordered
      */
      const qObj: QueuedTask = {
        playerID,
        duration,
        skill,
        type,
        info,
        reward,
        when,
      };
      queue.push(qObj);
    },
    handleReward: (state, { payload: { playerID, reward, type } }: RewardPayload) => {
      const { queue } = state[playerID];

      console.log("reward:");
      console.log(reward);

      console.log(`${type} task finished.`);
      queue.shift();
    },
  },
});

export const {
  task,
  handleReward,
} = taskSlice.actions;

export const {
  addReward,
  // changeName,
} = characterSlice.actions;

export function* shiftTaskRequest(action: RewardPayload) {
  const { playerID, reward, type } = action.payload;
  yield put(addReward({ playerID, reward, type }));
}

export function* taskSagas() {
  yield all([
    takeEvery(handleReward, shiftTaskRequest),
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
