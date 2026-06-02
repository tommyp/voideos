"use client";

import { useState } from "react";
import Landing from "./components/Landing";
import VideoPlayer from "./components/VideoPlayer";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="">
      {started ? <VideoPlayer /> : <Landing onStart={() => setStarted(true)} />}
    </main>
  );
}
