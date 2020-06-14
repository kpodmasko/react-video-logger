import React from "react";
import { Provider } from "react-redux";
import { shallow } from "enzyme";

import store from "@store";
import App from "@components/App";

describe("App", () => {
  it("renders without error", () => {
    shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
