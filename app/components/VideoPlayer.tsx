"use client";

import ReactPlayer from "react-player";
import { useRef, useState } from "react";
import { getNextVideo, listVideos } from "../data/videos";
import type { Video } from "../data/videos";

export default function VideoPlayer() {
  const ref = useRef(null);

  const firstVideo = listVideos()[0];

  const [playing, setPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video>(firstVideo);

  const playNextVideo = () => {
    const nextVideo = getNextVideo(currentVideo.url);
    setCurrentVideo(nextVideo);
  };

  return (
    <div className="flex flex-col flex-1 w-12/12 object-contain h-screen">
      {
        <ReactPlayer
          key={currentVideo.url}
          ref={ref}
          src={currentVideo.url}
          playing={playing}
          controls={false}
          width="100%"
          height="100%"
          onEnded={playNextVideo}
        />
      }

      <button
        onClick={() => setPlaying((prev) => !prev)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}
