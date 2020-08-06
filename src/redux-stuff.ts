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
import { SkillsStats } from "./types/types";
import player from "./model/Player";
import { decide } from "./model/Skill";

const playerInitialState = [

  player({ id: 0, name: "Maximus Decimus Meridius" }),
  player({ id: 1, name: "deletus" }),

];

export interface AddExp { // TODO move later
  payload: Herp
}

type Herp = {
  playerID: number
  skill: string
  expReward: number
};

const playerSlice = createSlice({
  name: "players",
  initialState: playerInitialState,
  reducers: {
    addExp: (state, { payload: { playerID, skill, expReward } }: AddExp) => {
      const { skills, name } = state[playerID];
      skills[skill as keyof SkillsStats].exp += expReward;
      console.log(`${name} gained ${expReward} ${skill} exp`);
      // TODO level up if needed
      // TODO support multiple skills
    },
  },
});

const taskInitialState: {busy: boolean, tasks: Array<TheActualPayloads>} = {
  busy: false,
  tasks: [],
};

export interface TaskPayload { // TODO move later
  payload: TheActualPayloads
}

type TheActualPayloads = {
  playerID: number
  duration: number
  skill: string
  expReward: number
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: taskInitialState,
  reducers: {
    // eslint-disable-next-line object-curly-newline
    task: ({ tasks, busy }, { payload: { playerID, duration, skill, expReward } }: TaskPayload) => {
      // if busy halt maybe
      const now = Date.now();
      let when;
      if (tasks.length === 0) {
        when = now + duration;
      } else {
        const wtf = tasks[tasks.length - 1].duration;
        when = wtf + duration;
      }

      tasks.push({
        duration: when, skill, expReward, playerID,
      });
      busy = true;
    },
    handleReward: ({ tasks, busy }, { payload }: TaskPayload) => {
      console.log(`${payload.skill} task finished.`);
      tasks.shift();
      if (tasks.length === 0) {
        busy = false;
      }
    },
  },
});

export const {
  task,
  handleReward,
} = taskSlice.actions;

export const {
  addExp,
} = playerSlice.actions;

export function* shiftTaskRequest(action: AddExp) {
  const { skill, expReward, playerID } = action.payload;
  yield put(addExp({ playerID, skill, expReward }));
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
  players: playerSlice.reducer,
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
