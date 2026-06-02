import { describe, it, expect } from "vitest";
import { getNextVideo, listVideos } from "./videos";

describe("getNextVideo", () => {
  it("advances to the next video", () => {
    const videos = listVideos();
    const next = getNextVideo(videos[0].url);
    expect(next).toEqual(videos[1]);
  });

  it("wraps from the last video back to the first", () => {
    const videos = listVideos();
    const next = getNextVideo(videos[videos.length - 1].url);
    expect(next).toEqual(videos[0]);
  });

  it("returns the first video when the url is unknown", () => {
    const videos = listVideos();
    expect(getNextVideo("https://not-in-list.example/x")).toEqual(videos[0]);
  });
});
