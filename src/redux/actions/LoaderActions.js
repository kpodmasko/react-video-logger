import { createActions } from "redux-actions";

const loaderActionsMap = {
  loader: {
    TOGGLE_LOADER: undefined,
  },
};

export const { loader } = createActions(loaderActionsMap);
