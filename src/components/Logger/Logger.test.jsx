import React from "react";
import { shallow, mount } from "enzyme";

import Logger from "@components/Logger";
import { mainCssClass } from "@components/Logger/Logger";

describe("Logger", () => {
  it("renders without error", () => {
    shallow(<Logger />);
  });

  it("implements className prop", () => {
    const className = "test-class-name";
    const wrapper = shallow(<Logger className={className} />);

    expect(wrapper.find(`.${mainCssClass}`).hasClass(className)).toBe(true);
  });

  it("renders logs", () => {
    const testLogs = [
      {
        id: "1",
        zone: { top: 100, left: 100, width: 100, height: 100 },
      },
      {
        id: "2",
        zone: { top: 200, left: 200, width: 200, height: 200 },
      },
    ];
    const wrapper = mount(
      <Logger logs={testLogs}>
        <div style={{ width: "500px", height: "500px" }}>test div</div>
      </Logger>
    );

    const canvas = wrapper.find("canvas").instance();
    const context = canvas.getContext("2d");

    const path = context.__getPath();
    expect(path).toMatchSnapshot();
  });
});
