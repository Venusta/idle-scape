/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  takeEvery, all, put, select,
} from "redux-saga/effects";

import { RootState } from "src/redux-stuff";
import { addReward } from "./character";
import { handleActiveTask, TaskPayloadData } from "./task";
import { addMsg } from "./log";

export function* handleRewardRequest(action: { payload: TaskPayloadData }) {
  const { playerID, reward } = action.payload;
  console.log(action.payload);
  console.log("@@@@@@@@@@@@@@@@@@@@@");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const state: RootState = yield select();
  const playerName = state.characters.names[playerID];
  console.log("??????????????????????????????????????????????");

  yield put(addReward({ playerID, reward }));
  yield put(addMsg({ playerID, msg: "Task done :)" }));
}

export function* taskSagas() {
  yield all([
    takeEvery(handleActiveTask, handleRewardRequest),
  ]);
}

export function* rootSaga() {
  yield all([taskSagas()]);
}
