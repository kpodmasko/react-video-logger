import { createActions } from "redux-actions";

// TODO: enable typescript
const errorActionsMap = {
  error: {
    SAVE_ERROR: undefined,
    REMOVE_ERROR: undefined,
  },
};

export const { error } = createActions(errorActionsMap);
