import { takeEvery, put, delay, take, call } from "redux-saga/effects";
import { onIncrement } from "./app.action";

//worker
export function* onIncrementWorker() {
  yield console.log("I am incremented");
  //yield delay(2000);
  yield put(onIncrement());
}

//watcher
export function* incrementSaga() {
  yield take("INCREMENT");
  yield call(onIncrementWorker);
}
