import { createSelector } from "reselect";

// TODO: enable typescript

const selectLogs = (state) => state.logs;

const selectError = (state) => state.error;

const selectLoader = (state) => state.loader;

const selectAppState = createSelector(
  [selectLogs, selectError, selectLoader],
  (logs, error, loader) => ({ logs, error, loader })
);

export default selectAppState;
