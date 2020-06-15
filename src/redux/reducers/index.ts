import { combineReducers, Reducer } from "redux";

import LogsReducer from "@reducers/LogsReducer";
import ErrorReducer from "@reducers/ErrorReducer";
import LoaderReducer from "@reducers/LoaderReducer";
import VideoConfigurationReducer from "@reducers/VideoConfigurationReducer";
import { StoreState } from "@declarations/types";

const rootReducer: Reducer<StoreState, never> = combineReducers({
  logs: LogsReducer,
  error: ErrorReducer,
  loader: LoaderReducer,
  videoConfiguration: VideoConfigurationReducer,
});

export default rootReducer;
