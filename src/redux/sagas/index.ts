import { Effect } from "redux-saga/effects";
import { all } from "redux-saga/effects";

import LogsSaga from "@sagas/LogsSaga";

function* rootSaga(): Generator<Effect> {
  yield all([LogsSaga()]);
}

export default rootSaga;
