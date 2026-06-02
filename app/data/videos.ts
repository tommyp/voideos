import videoJSON from "./videos.json";
import * as z from "zod";

const Video = z.object({
  title: z.string(),
  url: z.url(),
});

const Videos = z.array(Video);

const videos = Videos.parse(videoJSON);

const getNextVideo = (currentVideoUrl: string) => {
  const currentIndex = videos.findIndex(
    (video) => video.url === currentVideoUrl,
  );
  return videos[(currentIndex + 1) % videos.length];
};

const listVideos = () => videos;

export { listVideos, getNextVideo };
export type Video = z.infer<typeof Video>;
