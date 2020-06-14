import { createActions } from "redux-actions";

// TODO: enable typescript
const logsActionsMap = {
  GET_LOGS: {
    REQUEST: undefined,
    SUCCESS: undefined,
    FAILED: undefined,
  },
};

export const { getLogs } = createActions(logsActionsMap);
