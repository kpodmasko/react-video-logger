import React from "react";
import { shallow, mount } from "enzyme";

import Error from "@components/Error";
import { mainCssClass } from "@components/Error/Error";

describe("Error", () => {
  const handleClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without error", () => {
    shallow(<Error />);
  });

  it("implements className prop", () => {
    const className = "test-class-name";
    const wrapper = shallow(<Error className={className} />);

    expect(wrapper.find(`.${mainCssClass}`).hasClass(className)).toBe(true);
  });

  it("renders error from children", () => {
    const errorText = "some error text";
    const wrapper = shallow(<Error>{errorText}</Error>);

    expect(wrapper.text().includes(errorText)).toBe(true);
  });

  it("renders close icon when onClose passed", () => {
    const wrapper = shallow(<Error onClose={handleClose} />);

    expect(wrapper.find(`.${mainCssClass}__close`).length).toBe(1);
  });

  it("calls onClose when close icon is clicked", () => {
    const wrapper = mount(<Error onClose={handleClose} />);
    const closeButton = wrapper.find(`.${mainCssClass}__close`);

    closeButton.simulate("click");

    expect(handleClose.mock.calls.length).toBe(1);
  });
});
