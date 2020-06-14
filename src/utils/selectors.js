import { createSelector } from "reselect";

// TODO: enable typescript

const selectLogs = (state) => state.logs;

const selectError = (state) => state.error;

const selectLoader = (state) => state.loader;

const selectVideoConfiguration = (state) => state.videoConfiguration;

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
