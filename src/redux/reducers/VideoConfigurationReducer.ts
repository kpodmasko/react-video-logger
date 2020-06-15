import { handleActions, Reducer } from "redux-actions";

import { videoConfiguration } from "@actions/VideoConfigurationActions";
import { VideoConfiguration } from "@declarations/types";

const initialState: VideoConfiguration = {
  videoUrl:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  logsUrl: "https://www.mocky.io/v2/5e60c5f53300005fcc97bbdd",
  updateInterval: 10,
};

const VideoConfigurationReducer: Reducer<
  VideoConfiguration,
  VideoConfiguration
> = handleActions(
  {
    [videoConfiguration.setProps]: (
      state: VideoConfiguration,
      { payload }: { payload: VideoConfiguration }
    ) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);

export default VideoConfigurationReducer;
