import { combineReducers } from "redux";

import LogsReducer from "@reducers/LogsReducer";
import ErrorReducer from "@reducers/ErrorReducer";
import LoaderReducer from "@reducers/LoaderReducer";
import VideoConfigurationReducer from "@reducers/VideoConfigurationReducer";

// TODO: enable typescript
const rootReducer = combineReducers({
  logs: LogsReducer,
  error: ErrorReducer,
  loader: LoaderReducer,
  videoConfiguration: VideoConfigurationReducer,
});

export default rootReducer;
