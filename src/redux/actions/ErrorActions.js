import { createActions } from "redux-actions";

const errorActionsMap = {
  error: {
    SAVE_ERROR: undefined,
    REMOVE_ERROR: undefined,
  },
};

export const { error } = createActions(errorActionsMap);
