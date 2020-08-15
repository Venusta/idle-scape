import { combineReducers } from "@reduxjs/toolkit";
import { taskSlice } from "./task";
import { characterSlice } from "./character";

const reducer = combineReducers({
  tasks: taskSlice.reducer,
  characters: characterSlice.reducer,
});

export default reducer;
