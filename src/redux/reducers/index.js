import { combineReducers } from "redux";

import LogsReducer from "@reducers/LogsReducer";
import ErrorReducer from "@reducers/ErrorReducer";
import LoaderReducer from "@reducers/./LoaderReducer";

// TODO: enable typescript
const rootReducer = combineReducers({
  logs: LogsReducer,
  error: ErrorReducer,
  loader: LoaderReducer,
});

export default rootReducer;
