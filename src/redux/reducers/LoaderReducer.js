import { handleActions } from "redux-actions";

import { loader } from "@actions/LoaderActions";

const initialState = false;

// TODO: enable typescript
const LoaderReducer = handleActions(
  {
    [loader.toggleLoader]: (state) => !state,
  },
  initialState
);

export default LoaderReducer;
