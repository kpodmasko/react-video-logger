import { createActions } from "redux-actions";

const logsActionsMap = {
  GET_LOGS: {
    REQUEST: undefined,
    SUCCESS: undefined,
    FAILED: undefined,
  },
};

export const { getLogs } = createActions(logsActionsMap);
