import { handleActions, Reducer } from "redux-actions";

import { getLogs } from "@actions/LogsActions";
import { LogInfo } from "@declarations/types";

const initialState: Array<LogInfo> = [];

const LogsReducer: Reducer<Array<LogInfo>, Array<LogInfo>> = handleActions(
  {
    [getLogs.success]: (
      state: Array<LogInfo>,
      { payload }: { payload: Array<LogInfo> }
    ): Array<LogInfo> => [...payload],
  },
  initialState
);

export default LogsReducer;
