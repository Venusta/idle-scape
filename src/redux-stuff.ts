/* eslint-disable no-param-reassign */
import {
  combineReducers, configureStore, createSlice, getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {
  takeEvery, all, call, put, select,
} from "redux-saga/effects";
import logger from "redux-logger";
import { createFirstStats } from "./constants/data";
import Player from "./model/Player";
import { SkillsStats } from "./types/types";

// import nodeData from "./constants/data";
// import { eMinsTillNextSpawn } from "./utils";

// const nodeData: any[] = [];

// const nodesInitialState = nodeData.map((node) => node);

// const cardsSlice = createSlice({
//   name: "cards",
//   initialState: nodesInitialState,
//   reducers: {
//     filterJob: (state, { payload }) => state.filter((node) => node.job === payload), // TODO store which filters are active and fix this

//     // sort: (state) => state.sort((a, b) => eMinsTillNextSpawn(a.times, a.uptime) - eMinsTillNextSpawn(b.times, b.uptime)),
//   },
// });

// const uiInitialState = {
//   infobox: true,
// };

// const uiSlice = createSlice({
//   name: "ui",
//   initialState: uiInitialState,
//   reducers: {
//     toggleInfobox: (state) => {
//       state.infobox = !state.infobox;
//     },
//   },
// });

const playerInitialState = {
  ...new Player({ // unspread if multi character support
    id: 1,
    name: "yeetus",
    skills: createFirstStats(), // load from local storage
  }),
};

const playerSlice = createSlice({
  name: "player",
  initialState: playerInitialState,
  reducers: {
    addExp: ({ skills }, { payload: { skill, amount } }) => {
      skills[skill as keyof SkillsStats].exp += amount;
      console.log(`Gained ${amount} ${skill} exp`);
      // TODO saga to check for addExp and level up if needed
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
  duration: number
  skill: string
  exp: number
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: taskInitialState,
  reducers: {
    agilityTask: ({ tasks, busy }, { payload: { duration, skill, exp } }: TaskPayload) => {
      // if busy halt maybe
      const now = Date.now();
      let when;
      if (tasks.length === 0) {
        when = now + duration;
      } else {
        const wtf = tasks[tasks.length - 1].duration;
        when = wtf + duration;
      }

      tasks.push({ duration: when, skill, exp });
      busy = true;
    },
    handleReward: ({ tasks, busy }, payload) => {
      console.log("Task finished.");
      tasks.shift();
      if (tasks.length === 0) {
        busy = false;
      }
    },
  },
});

export const {
  agilityTask,
  handleReward,
} = taskSlice.actions;

export const {
  addExp,
} = playerSlice.actions;

export function* shiftTaskRequest(action: any) {
  const { skill, exp: amount } = action.payload;
  yield put(addExp({ skill, amount }));
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

// export const {
//   filterJob,
//   // sort: sortNodes,
// } = cardsSlice.actions;

// export const { toggleInfobox } = uiSlice.actions;

const reducer = combineReducers({
  tasks: taskSlice.reducer,
  // cards: cardsSlice.reducer,
  // ui: uiSlice.reducer,
  player: playerSlice.reducer,
});

// const middleware = [...getDefaultMiddleware()];
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware(), sagaMiddleware, logger];
const store = configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(rootSaga);
export default store;

export type RootState = ReturnType<typeof store.getState>;
