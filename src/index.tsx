import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import store from "@store";
import App from "@components/App";

import "react-virtualized/styles.css";
import "./styles.scss";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
