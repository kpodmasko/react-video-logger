import React from "react";
import { shallow } from "enzyme";

import App from "@components/App/index";

describe("App", () => {
  it("renders without error", () => {
    shallow(<App />);
  });
});
