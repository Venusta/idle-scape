/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable max-len */
import {
  combineReducers, configureStore, createSlice, getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
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

export const {
  filterJob,
  // sort: sortNodes,
} = cardsSlice.actions;

export const { toggleInfobox } = uiSlice.actions;

const reducer = combineReducers({
  cards: cardsSlice.reducer,
  ui: uiSlice.reducer,
});

const middleware = [...getDefaultMiddleware(), logger];
export default configureStore({
  reducer,
  middleware,
});
