/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice } from "@reduxjs/toolkit";
import { TaskPayloadData } from "./task";

const initialState = {
  items: [
    "17:52:13 Marcus finished killing 50 Chickens and received 1245 attack and 348 hitpoints experience! More Details",
    // "17:55:34 Maximus finished woodcutting Magic Trees and received 24480 woodcutting experience!",
    // "17:55:35 Queued Cooking task (50 raw chickens) for Maximus",
    // "17:55:40 Queued Fishing task (1 hour of barbarian fishing) for Marcus",
  ],
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addMsg: (state, {
      payload: {
        playerID, when, info: { name, amount }, type, reward,
      },
    }: { payload: TaskPayloadData }) => {
      console.log("hmmm");
      const stringBuilder = `${when} player: ${playerID} finished ${type} ${amount} ${name} and gained ${reward.exp[0].amount} ${reward.exp[0].skill} exp`;
      state.items.push(stringBuilder);
    },
  },
});

export const {
  addMsg,
} = logSlice.actions;
