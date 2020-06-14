import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

import { getLogs } from "@actions/LogsActions";
import { error } from "@actions/ErrorActions";
import { loader } from "@actions/LoaderActions";
import { formatTime, msToSeconds } from "@utils/time";

// TODO: enable typescript
function* getLogsSaga({ payload }) {
  try {
    yield put(getLogs.success([]));
    yield put(loader.toggleLoader());

    const response = yield axios(payload);
    const logs = response.data.map((log) => {
      const { timestamp, duration } = log;

      const begin = msToSeconds(timestamp);
      const end = msToSeconds(timestamp + duration);
      const formattedBegin = formatTime(timestamp);
      const formattedEnd = formatTime(timestamp + duration);

      return { ...log, begin, end, formattedBegin, formattedEnd };
    });

    yield put(getLogs.success(logs));
  } catch (e) {
    yield put(error.saveError(e.message));
  } finally {
    yield put(loader.toggleLoader());
  }

  yield true;
}

function* LogsFlow() {
  yield takeLatest(getLogs.request, getLogsSaga);
}

export default LogsFlow;
