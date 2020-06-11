import React from "react";
import { shallow } from "enzyme";

import App from "@components/App";

describe("init test", () => {
  it("works fine", () => {
    shallow(<App />);

    expect(true).toBe(true);
  });
});
