import { FormattedTime, Timestamp, Time } from "@declarations/types";

export const msToSeconds = (timestamp: Timestamp): Time => timestamp / 1000.0;

export const formatTime = (timestamp: Timestamp): FormattedTime => {
  const milliseconds = (timestamp % 1000).toString().padEnd(3, "0");
  const seconds = Math.floor((timestamp / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timestamp / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");

  return [minutes, seconds, milliseconds].join(":");
};
