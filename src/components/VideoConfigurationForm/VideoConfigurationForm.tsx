import React, { FC, useCallback, useRef, FormEvent, memo } from "react";
import classNames from "classnames";

import { IBaseProps, IVideoConfiguration } from "@declarations/interfaces";
import { LogURL, VideoURL } from "@declarations/types";

import "./VideoConfigurationForm.scss";

interface IVideoConfigurationFromProps extends IBaseProps {
  onSubmit: (videoConfiguration: IVideoConfiguration) => void;
}

export const mainCssClass = "video-configuration-form";

const VideoConfigurationForm: FC<IVideoConfigurationFromProps> = (
  props: IVideoConfigurationFromProps
) => {
  const { onSubmit, className } = props;

  const videoRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLInputElement>(null);

  const classes = classNames(mainCssClass, className);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const videoUrl: VideoURL = videoRef.current.value;
      const logUrl: LogURL = logRef.current.value;

      if (!videoUrl || !logUrl) {
        return;
      }

      const videoConfiguration: IVideoConfiguration = {
        videoUrl,
        logUrl,
      };

      if (onSubmit) {
        onSubmit(videoConfiguration);
      }

      videoRef.current.value = "";
      logRef.current.value = "";
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
        />
      </div>
      <div className={`${mainCssClass}__layout`}>
        <label className={`${mainCssClass}__label`} htmlFor="videoUrl">
          Type log url
        </label>
        <input className={`${mainCssClass}__input`} id="logUrl" ref={logRef} />
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
