import { all } from "redux-saga/effects";

import LogsSaga from "@sagas/LogsSaga";

// TODO: enable typescript
function* rootSaga() {
  yield all([LogsSaga()]);
}

export default rootSaga;
