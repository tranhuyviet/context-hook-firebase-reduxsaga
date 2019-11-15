// import { takeEvery, put } from "redux-saga/effects";
// import { IMAGES } from "../constants";

// //worker saga
// function* handleImagesLoad() {
//   console.log("Fetching images from unsplash");
// }

// //watcher saga
// function* rootSaga() {
//   yield takeEvery(IMAGES.LOAD, handleImagesLoad);
// }

import { all } from "redux-saga/effects";

import imagesSaga from "./imagesSaga";
import statsSaga from "./statsSaga";

function* rootSaga() {
  yield all([imagesSaga(), statsSaga()]);
}

//watcher saga -> actions -> worker saga
export default rootSaga;
