import React from "react";
import { mount } from "enzyme";

import VideoPlayer from "@components/VideoPlayer";
import { mainCssClass } from "@components/VideoPlayer/VideoPlayer";

describe("VideoPlayer", () => {
  const handleUpdate = jest.fn();
  const videoUrl =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without error", () => {
    mount(<VideoPlayer videoUrl={videoUrl} />);
  });

  it("implements className prop", () => {
    const className = "test-class-name";
    const wrapper = mount(
      <VideoPlayer videoUrl={videoUrl} className={className} />
    );

    expect(wrapper.find(`.${mainCssClass}`).hasClass(className)).toBe(true);
  });

  it("calls update when video is being played", async () => {
    const wrapper = mount(
      <VideoPlayer
        videoUrl={videoUrl}
        onTimeUpdate={handleUpdate}
        updateInterval={100}
      />
    );

    wrapper.find("video").simulate("play");

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });

    wrapper.find("video").simulate("pause");

    expect(handleUpdate).toHaveBeenCalled();
  });

  it("stops update when video is being stopped", async () => {
    const wrapper = mount(
      <VideoPlayer
        videoUrl={videoUrl}
        onTimeUpdate={handleUpdate}
        updateInterval={100}
      />
    );

    wrapper.find("video").simulate("play");
    wrapper.find("video").simulate("pause");

    const updatesLength = handleUpdate.mock.calls.length;

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });

    expect(updatesLength).toBe(handleUpdate.mock.calls.length);
  });
});
