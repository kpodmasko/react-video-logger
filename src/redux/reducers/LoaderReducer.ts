import { handleActions, Reducer } from "redux-actions";

import { Loader } from "@declarations/types";
import { loader } from "@actions/LoaderActions";

const initialState: Loader = false;

const LoaderReducer: Reducer<Loader, never> = handleActions(
  {
    [loader.toggleLoader]: (state: Loader): Loader => !state,
  },
  initialState
);

export default LoaderReducer;
