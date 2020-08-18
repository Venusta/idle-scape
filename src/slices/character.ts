/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice } from "@reduxjs/toolkit";
import charactersInitialState from "../model/CharacterBuilder";
import { addBankToBank } from "../util";
import { TaskReward } from "../types/types";

interface RewardPayload {
  payload: {
    playerID: string,
    reward: TaskReward,
  }
}

export const characterSlice = createSlice({
  name: "characters",
  initialState: charactersInitialState({}),
  reducers: {
    addReward: (state, { payload: { playerID, reward } }: RewardPayload) => {
      const skills = state.skills[playerID];
      const bank = state.banks[playerID];
      const { exp, items } = reward;
      if (exp.length > 0) {
        exp.forEach((expReward) => {
          const { skill, amount } = expReward;
          skills[skill].exp += amount;
        });
      }

      if (items.length > 0) {
        state.banks[playerID] = addBankToBank(bank, items);
      }
    },
  },
});

export const {
  addReward,
} = characterSlice.actions;
