import {
  configureStore, getDefaultMiddleware, AnyAction, Dispatch,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { useDispatch } from "react-redux";

import reducer from "./slices/index";
import { rootSaga } from "./slices/saga-stuff";

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware(),
  sagaMiddleware,
  logger,
];
const store = configureStore({
  reducer,
  middleware,
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): Dispatch<AnyAction> => useDispatch<AppDispatch>();
// Export a hook that can be reused to resolve types

export default store;
