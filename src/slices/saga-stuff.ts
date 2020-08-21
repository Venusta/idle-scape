/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  takeEvery, all, put, select,
} from "redux-saga/effects";

import { RootState } from "src/redux-stuff";
import { addReward } from "./character";
import {
  handleActiveTask, TaskPayloadData, QueuedTask, newTask,
} from "./task";
import { addMsg } from "./log";
import { format } from "../model/LogFormatter";

export function* handleRewardRequest(action: { payload: TaskPayloadData }) {
  const { playerID, reward } = action.payload;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const state: RootState = yield select();
  const playerName = state.characters.names[playerID];

  yield put(addReward({ playerID, reward }));
  const msg = format("CompletedTask", playerName, action.payload);

  yield put(addMsg({ playerID, msg }));
}

export function* newTaskMsg(action: { payload: QueuedTask }) {
  const { playerID } = action.payload;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const state: RootState = yield select();
  const playerName = state.characters.names[playerID];
  const msg = format("QueuedTask", playerName, action.payload);

  yield put(addMsg({ playerID, msg }));
}

export function* taskSagas() {
  yield all([
    takeEvery(handleActiveTask, handleRewardRequest),
    takeEvery(newTask, newTaskMsg),
  ]);
}

export function* rootSaga() {
  yield all([taskSagas()]);
}
