import { createActions } from "redux-actions";

// TODO: enable typescript
const loaderActionsMap = {
  loader: {
    TOGGLE_LOADER: undefined,
  },
};

export const { loader } = createActions(loaderActionsMap);
