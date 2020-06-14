import { handleActions } from "redux-actions";

import { videoConfiguration } from "@actions/VideoConfigurationActions";

const initialState = {
  videoUrl:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  logsUrl: "https://www.mocky.io/v2/5e60c5f53300005fcc97bbdd",
  updateInterval: 10,
};

const VideoConfigurationReducer = handleActions(
  {
    [videoConfiguration.setProp]: (state, { payload }) => ({
      ...state,
      [payload.name]: payload.value,
    }),
    [videoConfiguration.setProps]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);

export default VideoConfigurationReducer;
