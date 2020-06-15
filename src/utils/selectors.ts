import { createSelector } from "reselect";

import { StoreState } from "@declarations/types";

const selectLogs = (state: StoreState) => state.logs;

const selectError = (state: StoreState) => state.error;

const selectLoader = (state: StoreState) => state.loader;

const selectVideoConfiguration = (state: StoreState) =>
  state.videoConfiguration;

const selectAppState = createSelector(
  [selectLogs, selectError, selectLoader, selectVideoConfiguration],
  (logs, error, loader, videoConfiguration) => ({
    logs,
    error,
    loader,
    videoConfiguration,
  })
);

export default selectAppState;
