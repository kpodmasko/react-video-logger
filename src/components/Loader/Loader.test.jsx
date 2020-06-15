import React from "react";
import { shallow } from "enzyme";

import Loader from "@components/Loader";
import { mainCssClass } from "@components/Loader/Loader";

describe("Loader", () => {
  it("renders without error", () => {
    shallow(<Loader />);
  });

  it("implements className prop", () => {
    const className = "test-class-name";
    const wrapper = shallow(<Loader className={className} />);

    expect(wrapper.find(`.${mainCssClass}`).hasClass(className)).toBe(true);
  });
});
