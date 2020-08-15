/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeEvery, all, put } from "redux-saga/effects";

import { addReward } from "./character";
import { handleReward } from "./task";
import { TaskReward } from "../types/types";

interface RewardPayload {
  payload: {
    playerID: string,
    reward: TaskReward,
  }
}

export function* handleRewardRequest(action: RewardPayload) {
  const { playerID, reward } = action.payload;
  yield put(addReward({ playerID, reward }));
}

export function* taskSagas() {
  yield all([
    takeEvery(handleReward, handleRewardRequest),
  ]);
}

export function* rootSaga() {
  yield all([taskSagas()]);
}
