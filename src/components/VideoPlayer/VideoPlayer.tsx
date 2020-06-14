import React, { FC, memo, useCallback, useEffect, useRef } from "react";
import classNames from "classnames";

import { IBaseProps } from "@declarations/interfaces";
import { VideoURL, VideoPlayerInfo, Time, Classes } from "@declarations/types";
import { DEFAULT_UPDATE_INTERVAL } from "@utils/constants";

import "./VideoPlayer.scss";

interface IVideoPlayerProps extends IBaseProps {
  videoUrl: VideoURL;
  onTimeUpdate?: (videoPlayerInfo: VideoPlayerInfo) => void;
  updateInterval?: Time;
  directCurrentTime?: Time;
}

export const mainCssClass = "video-player";

const VideoPlayer: FC<IVideoPlayerProps> = (props: IVideoPlayerProps) => {
  const {
    videoUrl,
    className,
    updateInterval = DEFAULT_UPDATE_INTERVAL,
    onTimeUpdate,
    directCurrentTime,
  } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  // for time updating is not used native "timeupdate" event as need to set interval for updating
  const videoWatcher = useRef<NodeJS.Timer>(null);

  const classes: Classes = classNames(mainCssClass, className);

  const triggerTimeUpdate = useCallback((): void => {
    if (onTimeUpdate) {
      onTimeUpdate({
        time: videoRef.current.currentTime,
      });
    }
  }, [onTimeUpdate]);

  const stopVideoWatcher = useCallback((): void => {
    clearInterval(videoWatcher.current);
    videoWatcher.current = null;
  }, []);

  const handlePlay = useCallback((): void => {
    videoWatcher.current = setInterval(() => {
      triggerTimeUpdate();
    }, updateInterval);
  }, [updateInterval, triggerTimeUpdate]);

  const handlePause = useCallback((): void => {
    stopVideoWatcher();
  }, [stopVideoWatcher]);

  const handleTimeUpdate = useCallback((): void => {
    // trigger when video is paused and time changed
    if (!videoWatcher.current) {
      triggerTimeUpdate();
    }
  }, [triggerTimeUpdate]);

  useEffect((): void => {
    if (directCurrentTime) {
      videoRef.current.currentTime = directCurrentTime;
    }
  }, [directCurrentTime]);

  return (
    <div className={classes}>
      <video
        controls={!!videoUrl}
        // remount video when videoUrl is changed
        key={videoUrl}
        onTimeUpdate={handleTimeUpdate}
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
