import React, { FC, useCallback, useRef, FormEvent, memo } from "react";
import classNames from "classnames";

import { IBaseProps } from "@declarations/interfaces";
import {
  LogsURL,
  VideoURL,
  VideoConfiguration,
  Time,
  Classes,
} from "@declarations/types";
import { DEFAULT_UPDATE_INTERVAL } from "@utils/constants";

import "./VideoConfigurationForm.scss";

interface IVideoConfigurationFromProps extends IBaseProps {
  onSubmit: (videoConfiguration: VideoConfiguration) => void;
  videoConfiguration?: VideoConfiguration;
}

export const mainCssClass = "video-configuration-form";

const VideoConfigurationForm: FC<IVideoConfigurationFromProps> = (
  props: IVideoConfigurationFromProps
) => {
  const { onSubmit, className, videoConfiguration } = props;
  const {
    videoUrl = "",
    logsUrl = "",
    updateInterval = DEFAULT_UPDATE_INTERVAL,
  } = videoConfiguration || {};

  const videoRef = useRef<HTMLInputElement>(null);
  const logsRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<HTMLInputElement>(null);

  const classes: Classes = classNames(mainCssClass, className);

  const handleSubmit = useCallback(
    (event: FormEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      const videoUrl: VideoURL = videoRef.current.value;
      const logsUrl: LogsURL = logsRef.current.value;
      const updateInterval: Time = parseInt(intervalRef.current.value, 10);

      if (!videoUrl || !logsUrl) {
        return;
      }

      const videoConfiguration: VideoConfiguration = {
        videoUrl,
        logsUrl,
        updateInterval,
      };

      if (onSubmit) {
        onSubmit(videoConfiguration);
      }
    },
    [onSubmit]
  );

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <div className={`${mainCssClass}__layout`}>
        <label className={`${mainCssClass}__label`} htmlFor="videoUrl">
          Type video url
        </label>
        <input
          className={`${mainCssClass}__input`}
          id="videoUrl"
          ref={videoRef}
          defaultValue={videoUrl}
        />
      </div>
      <div className={`${mainCssClass}__layout`}>
        <label className={`${mainCssClass}__label`} htmlFor="logsUrl">
          Type logs url
        </label>
        <input
          className={`${mainCssClass}__input`}
          id="logsUrl"
          ref={logsRef}
          defaultValue={logsUrl}
        />
      </div>
      <div className={`${mainCssClass}__layout`}>
        <label className={`${mainCssClass}__label`} htmlFor="videoInterval">
          Type interval for video logs update
        </label>
        <input
          min="10"
          step="10"
          type="number"
          className={`${mainCssClass}__input`}
          id="videoInterval"
          ref={intervalRef}
          defaultValue={updateInterval}
        />
      </div>
      <div className={`${mainCssClass}__layout`}>
        <button className={`${mainCssClass}__submit`} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default memo(VideoConfigurationForm);
