import { handleActions } from "redux-actions";

import { getLogs } from "@actions/LogsActions";

const initialState = [];

// TODO: enable typescript
const LogsReducer = handleActions(
  {
    [getLogs.success]: (state, { payload }) => [...payload],
  },
  initialState
);

export default LogsReducer;
