/* eslint-disable no-param-reassign */
import {
  combineReducers, configureStore, createSlice, getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { createFirstStats } from "./constants/data";
import Player from "./model/Player";
import { SkillsStats } from "./types/types";

// import nodeData from "./constants/data";
// import { eMinsTillNextSpawn } from "./utils";

const nodeData: any[] = [];

const nodesInitialState = nodeData.map((node) => node);

const cardsSlice = createSlice({
  name: "cards",
  initialState: nodesInitialState,
  reducers: {
    filterJob: (state, { payload }) => state.filter((node) => node.job === payload), // TODO store which filters are active and fix this

    // sort: (state) => state.sort((a, b) => eMinsTillNextSpawn(a.times, a.uptime) - eMinsTillNextSpawn(b.times, b.uptime)),
  },
});

const uiInitialState = {
  infobox: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    toggleInfobox: (state) => {
      state.infobox = !state.infobox;
    },
  },
});

const playerInitialState = {
  ...new Player({
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
    },
  },
});

const taskInitialState: {busy: boolean, tasks: Array<Record<string, number>>} = {
  busy: false,
  tasks: [],
};

export interface TaskPayload { // TODO move later
  payload: TheActualPayloads
}

type TheActualPayloads = {
  duration: number
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: taskInitialState,
  reducers: {
    pushTask: ({ tasks, busy }, { payload: { duration } }: TaskPayload) => {
      const now = Date.now();
      let when;
      if (tasks.length === 0) {
        when = now + duration;
      } else {
        const wtf = tasks[tasks.length - 1].when;
        when = wtf + duration;
      }

      tasks.push({ when });
      busy = true;
    },
    shiftTask: ({ tasks, busy }) => {
      tasks.shift();
      if (tasks.length === 0) {
        busy = false;
      }
    },
  },
});

export const {
  pushTask,
  shiftTask,
} = taskSlice.actions;

export const {
  addExp,
} = playerSlice.actions;

export const {
  filterJob,
  // sort: sortNodes,
} = cardsSlice.actions;

export const { toggleInfobox } = uiSlice.actions;

const reducer = combineReducers({
  tasks: taskSlice.reducer,
  cards: cardsSlice.reducer,
  ui: uiSlice.reducer,
  player: playerSlice.reducer,
});

// const middleware = [...getDefaultMiddleware()];
const middleware = [...getDefaultMiddleware(), logger];
const store = configureStore({
  reducer,
  middleware,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
