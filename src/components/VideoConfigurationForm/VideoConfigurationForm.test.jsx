import React from "react";
import { shallow, mount } from "enzyme";

import VideoConfigurationForm from "@components/VideoConfigurationForm";
import { mainCssClass } from "@components/VideoConfigurationForm/VideoConfigurationForm";

describe("VideoConfigurationForm", () => {
  const handleSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without error", () => {
    shallow(<VideoConfigurationForm onSubmit={handleSubmit} />);
  });

  it("implements className prop", () => {
    const className = "test-class-name";
    const wrapper = shallow(
      <VideoConfigurationForm onSubmit={handleSubmit} className={className} />
    );

    expect(wrapper.find(`.${mainCssClass}`).hasClass(className)).toBe(true);
  });

  it("skips submit when not full form", () => {
    const wrapper = mount(<VideoConfigurationForm onSubmit={handleSubmit} />);

    wrapper.find("button").simulate("submit");

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("submits when full form", () => {
    const wrapper = mount(<VideoConfigurationForm onSubmit={handleSubmit} />);

    wrapper.find("input").forEach((input) => {
      input.instance().value = "foo";
    });

    wrapper.find("button").simulate("submit");

    expect(handleSubmit).toHaveBeenCalled();
  });
});
