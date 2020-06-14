import { createActions } from "redux-actions";

const videoConfigurationActionsMap = {
  videoConfiguration: {
    SET_PROP: undefined,
    SET_PROPS: undefined,
  },
};

export const { videoConfiguration } = createActions(
  videoConfigurationActionsMap
);
