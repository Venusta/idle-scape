/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import {
  combineReducers, configureStore, createSlice, getDefaultMiddleware, AnyAction, Dispatch,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { takeEvery, all, put } from "redux-saga/effects";
import logger from "redux-logger";
import { useDispatch } from "react-redux";
import { SkillsStats, ItemBank, SkillName } from "./types/types";
import charactersInitialState from "./model/OhGodWhy";
import { SkillNames } from "./constants/data";

export interface AddExp { // TODO remove / fix
  payload: AddExpPayload
}

type AddExpPayload = {
  playerID: string
  expReward: ExpReward
};

const characterSlice = createSlice({
  name: "characters",
  initialState: charactersInitialState({}),
  reducers: {
    addExp: (state, { payload: { playerID, reward, type } }: RewardPayload) => { // todo loop over expReward
      // const { skills, name } = state[playerID];
      const skills = state.skills[playerID];
      const name = state.names[playerID];
      // skills[skill as keyof SkillName].exp += expReward;
      console.log(`${name} gained FIX ME exp `);
      console.log(reward);
      // TODO level up if needed
      // TODO support multiple skills
    },
    // changeName: (state, { payload: { playerID, newName } }: { payload: { playerID: number, newName: string } }) => {
    //   const { name } = state[playerID];
    //   state[playerID].name = newName;
    //   console.log(`${name} changed to ${newName}`);
    // },
  },
});

export type NewQueuePayload = { // todo remove / fix
  playerID: string
  when: number
  duration: number
  type: string
  info: NewTaskInfo
  skill: SkillName
  reward: NewTaskReward
};

export interface RewardPayload { // TODO move later
  payload: {
    playerID: string,
    reward: NewTaskReward,
    type: string,
  }
}

const taskInitialState: {[characterID: string]:{ queue: Array<NewQueuePayload>} } = {
  3: { queue: [] },
};

type ExpReward = { [Key in SkillName]?: number; };

interface NewTaskReward {
  exp?: ExpReward
  items?: ItemBank
}

interface NewTaskInfo {
  name: string,
  amount?: number
}

type NewTaskPayload = {
  playerID: string
  duration: number
  type: string
  info: NewTaskInfo
  skill: SkillName
  reward: NewTaskReward
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: taskInitialState,
  reducers: {
    // eslint-disable-next-line object-curly-newline
    task: (state, { payload: { playerID, duration, type, info, skill, reward } }: {payload: NewTaskPayload}) => {
      if (!state[playerID]) {
        console.log("FUCK");
        state[playerID].queue = [];
        return;
      }

      const { queue } = state[playerID];
      // if busy halt maybe
      // todo fix reward
      const now = Date.now();
      let when = 0;
      if (queue.length === 0) {
        when = now + duration;
      } else {
        const wtf = queue[queue.length - 1].when;
        when = wtf + duration;
      }

      /*
      * push task to queue { duration, type, info, reward, playerID }
      * the queue itself then calculates when the next task is done
      * queue can process one task per playerID
      * ability to cancel tasks by clicking them (can confirm)
      * reodering the task list will recalculate when the tasks finish
      * active tasks can't be re-ordered
      */
      const qObj: NewQueuePayload = {
        playerID,
        duration,
        skill,
        type: "Agility-Laps",
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
  addExp,
  // changeName,
} = characterSlice.actions;

export function* shiftTaskRequest(action: RewardPayload) {
  const { playerID, reward, type } = action.payload;
  yield put(addExp({ playerID, reward, type }));
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
