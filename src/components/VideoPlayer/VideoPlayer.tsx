import React, { FC, memo, useCallback, useRef } from "react";
import classNames from "classnames";

import { IBaseProps, IVideoPlayerInfo } from "@declarations/interfaces";
import { VideoURL } from "@declarations/types";

import "./VideoPlayer.scss";

interface IVideoPlayerProps extends IBaseProps {
  videoUrl: VideoURL;
  onTimeUpdate?: (videoPlayerInfo: IVideoPlayerInfo) => void;
  updateInterval?: number;
}

export const mainCssClass = "video-player";

const VideoPlayer: FC<IVideoPlayerProps> = (props: IVideoPlayerProps) => {
  const { videoUrl, className, updateInterval = 100, onTimeUpdate } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  // for time updating is not used native "timeupdate" event as need to set interval for updating
  const videoWatcher = useRef<NodeJS.Timer>(null);

  const classes: string = classNames(mainCssClass, className);

  const handlePlay = useCallback((): void => {
    videoWatcher.current = setInterval(() => {
      if (onTimeUpdate) {
        onTimeUpdate({
          time: videoRef.current.currentTime,
        });
      }

      return () => clearInterval(videoWatcher.current);
    }, updateInterval);
  }, [updateInterval, onTimeUpdate]);

  const handlePause = useCallback((): void => {
    clearInterval(videoWatcher.current);
  }, []);

  return (
    <div className={classes}>
      <video
        className={`${mainCssClass}__video`}
        controls={!!videoUrl}
        key={videoUrl}
        onPlay={handlePlay}
        onPause={handlePause}
        ref={videoRef}
      >
        <source src={videoUrl} />
        <track kind="captions" label="Video logger" />
      </video>
    </div>
  );
};

export default memo(VideoPlayer);
