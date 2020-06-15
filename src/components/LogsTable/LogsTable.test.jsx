import React from "react";
import { shallow } from "enzyme";

import LogsTable from "@components/LogsTable";
import { mainCssClass } from "@components/LogsTable/LogsTable";

describe("LogsTable", () => {
  it("renders without error", () => {
    shallow(<LogsTable />);
  });

  it("implements className prop", () => {
    const className = "test-class-name";
    const wrapper = shallow(<LogsTable className={className} />);

    expect(wrapper.find(`.${mainCssClass}`).hasClass(className)).toBe(true);
  });
});
