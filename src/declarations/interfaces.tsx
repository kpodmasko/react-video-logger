import { LogURL, ReactNode, VideoURL } from "@declarations/types";

export interface IBaseProps {
  className?: string;
  children?: ReactNode;
}

export interface IVideoConfiguration {
  videoUrl: VideoURL;
  logUrl: LogURL;
}

export interface IVideoPlayerInfo {
  time: number;
}
