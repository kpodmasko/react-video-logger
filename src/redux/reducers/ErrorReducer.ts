import { handleActions, Reducer } from "redux-actions";

import { Error } from "@declarations/types";
import { error } from "@actions/ErrorActions";

const initialState: Error = null;

const ErrorReducer: Reducer<Error, Error> = handleActions(
  {
    [error.saveError]: (state: Error, { payload }: { payload: Error }): Error =>
      payload,
    [error.removeError]: (): Error => null,
  },
  initialState
);

export default ErrorReducer;
