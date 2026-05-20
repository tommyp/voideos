"use client";

import ReactPlayer from "react-player";
import { useRef, useState } from "react";

export default function VideoPlayer({ url }: { url: string }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex flex-col flex-1 w-12/12 object-contain h-screen">
      <ReactPlayer
        ref={ref}
        src={url}
        playing={playing}
        controls={false}
        width="100%"
        height="100%"
      />

      <button
        onClick={() => setPlaying((prev) => !prev)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}
