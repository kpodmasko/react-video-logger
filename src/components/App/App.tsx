import React, { FC, useCallback } from "react";

import Spoiler from "@components/Spoiler";
import VideoConfigurationForm from "@components/VideoConfigurationForm";

import "./App.scss";
import { IVideoConfiguration } from "@declarations/interfaces";

const App: FC = () => {
  const handleVideoConfigurationSubmit = useCallback(
    (videoConfiguration: IVideoConfiguration) => {
      const { videoUrl, logUrl } = videoConfiguration;

      console.log(">>> videoUrl", videoUrl);
      console.log(">>> logUrl", logUrl);
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
    </>
  );
};

export default App;
