import { ReactChild, ReactFragment, ReactPortal } from "react";

export type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | Element
  | boolean
  | null;

export type VideoURL = string;
export type LogURL = string;
