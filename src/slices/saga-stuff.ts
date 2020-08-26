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
  const { characterId, reward } = action.payload;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const state: RootState = yield select();
  const characterName = state.characters.names[characterId];

  yield put(addReward({ characterId, reward }));
  const msg = format("CompletedTask", characterName, action.payload);

  yield put(addMsg({ characterId, msg }));
}

export function* newTaskMsg(action: { payload: QueuedTask }) {
  const { characterId } = action.payload;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const state: RootState = yield select();
  const characterName = state.characters.names[characterId];
  const msg = format("QueuedTask", characterName, action.payload);

  yield put(addMsg({ characterId, msg }));
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
