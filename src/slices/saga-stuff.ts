/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeEvery, all, put } from "redux-saga/effects";

import { addReward } from "./character";
import { handleActiveTask, TaskPayloadData } from "./task";
import { addMsg } from "./log";

export function* handleRewardRequest(action: { payload: TaskPayloadData }) {
  const { playerID, reward } = action.payload;
  console.log(action.payload);
  console.log("@@@@@@@@@@@@@@@@@@@@@");

  yield put(addReward({ playerID, reward }));
  yield put(addMsg({ ...action.payload }));
}

export function* taskSagas() {
  yield all([
    takeEvery(handleActiveTask, handleRewardRequest),
  ]);
}

export function* rootSaga() {
  yield all([taskSagas()]);
}
