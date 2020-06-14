import React from "react";
import { shallow, mount } from "enzyme";

import Spoiler from "@components/Spoiler/index";
import { mainCssClass } from "@components/Spoiler/Spoiler";

describe("Spoiler", () => {
  const setIsOpen = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setIsOpen]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  const label = "Some test label";

  it("renders without error", () => {
    shallow(<Spoiler label={label} />);
  });

  it("implements className prop", () => {
    const className = "test-spoiler";
    const wrapper = shallow(<Spoiler label={label} className={className} />);

    expect(wrapper.find(`.${mainCssClass}`).hasClass(className)).toBe(true);
  });

  it("implements label prop", () => {
    const wrapper = shallow(<Spoiler label={label} />);

    expect(wrapper.text().includes(label)).toBe(true);
  });

  it("toggles content", () => {
    const wrapper = mount(<Spoiler label={label} />);

    wrapper.find(`.${mainCssClass}__label`).simulate("click");

    expect(setIsOpen).toHaveBeenCalled();
  });
});
