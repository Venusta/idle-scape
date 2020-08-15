import { combineReducers } from "@reduxjs/toolkit";
import { taskSlice } from "./task";
import { characterSlice } from "./character";
import { logSlice } from "./log";

const reducer = combineReducers({
  tasks: taskSlice.reducer,
  characters: characterSlice.reducer,
  log: logSlice.reducer,
});

export default reducer;
