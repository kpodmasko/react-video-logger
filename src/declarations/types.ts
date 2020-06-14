import { ReactChild, ReactFragment, ReactPortal } from "react";

export type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | Element
  | boolean
  | null;

export type Classes = string;

export type VideoURL = string;

export type LogsURL = string;

export type Timestamp = number;

export type Time = number;

export type FormattedTime = string;

export type Position = number;

export type Size = number;

export type LogId = string | number;

export type VideoConfiguration = {
  videoUrl: VideoURL;
  logsUrl: LogsURL;
  updateInterval: Time;
};

export type VideoPlayerInfo = {
  time: Time;
};

export type LogInfoZone = {
  left: Position;
  top: Position;
  width: Size;
  height: Size;
};

export type LogInfo = {
  id: LogId;
  timestamp: Timestamp;
  duration: Timestamp;
  zone: LogInfoZone;
  begin: Time;
  end: Time;
  formattedBegin: FormattedTime;
  formattedEnd: FormattedTime;
};

export type LogsTableKey = string;
