/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  characterId: string;
  msg: string;
}

const initialState: {
  items: InitialState[]
} = {
  items: [
    // "17:52:13 Marcus finished killing 50 Chickens and received 1245 attack and 348 hitpoints experience! More Details",
    // "17:55:34 Maximus finished woodcutting Magic Trees and received 24480 woodcutting experience!",
    // "17:55:35 Queued Cooking task (50 raw chickens) for Maximus",
    // "17:55:40 Queued Fishing task (1 hour of barbarian fishing) for Marcus",
  ],
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addMsg: ({ items }, { payload: { characterId, msg } }: {payload: InitialState }) => {
      if (items.length > 100) items.shift(); // 100 entires should be enough

      // this reducer should probably recieve the already built string
      // no idea how to handle this shit, save me please
      // const stringBuilder = `${when} player: ${characterId} finished ${type} ${amount} ${name} and gained ${reward.exp[0].amount} ${reward.exp[0].skill} exp`;
      items.push({ characterId, msg });
    },
  },
});

export const {
  addMsg,
} = logSlice.actions;
