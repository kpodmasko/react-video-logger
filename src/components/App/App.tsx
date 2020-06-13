import React, { FC, useCallback, useState } from "react";

import Spoiler from "@components/Spoiler";
import VideoConfigurationForm from "@components/VideoConfigurationForm";
import {
  IVideoConfiguration,
  IVideoPlayerInfo,
} from "@declarations/interfaces";
import { VideoURL } from "@declarations/types";
import Player from "@components/VideoPlayer/VideoPlayer";

import "./App.scss";

const App: FC = () => {
  const [videoUrl, setVideoUrl] = useState<VideoURL>("");

  const handleVideoConfigurationSubmit = useCallback(
    (videoConfiguration: IVideoConfiguration): void => {
      const { videoUrl, logUrl } = videoConfiguration;

      setVideoUrl(videoUrl);
      console.log(">>> videoUrl", videoUrl);
      console.log(">>> logUrl", logUrl);
    },
    []
  );

  const handleVideoPlayerTimeUpdate = useCallback(
    (videoPlayerInfo: IVideoPlayerInfo): void => {
      const { time } = videoPlayerInfo;

      console.log(">>> time", time);
    },
    []
  );

  return (
    <>
      <Spoiler
        label="Video configuration"
        className="video-configuration-spoiler"
      >
        <VideoConfigurationForm onSubmit={handleVideoConfigurationSubmit} />
      </Spoiler>
      <Player videoUrl={videoUrl} onTimeUpdate={handleVideoPlayerTimeUpdate} />
    </>
  );
};

export default App;
