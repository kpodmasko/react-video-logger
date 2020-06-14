import { handleActions } from "redux-actions";

import { error } from "@actions/ErrorActions";

const initialState = null;

// TODO: enable typescript
const ErrorReducer = handleActions(
  {
    [error.saveError]: (state, { payload }) => payload,
    [error.removeError]: () => null,
  },
  initialState
);

export default ErrorReducer;
