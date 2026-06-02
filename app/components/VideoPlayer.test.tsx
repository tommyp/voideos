import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoPlayer from "./VideoPlayer";
import { listVideos } from "../data/videos";

vi.mock("react-player", () => ({
  default: ({
    src,
    playing,
    onEnded,
  }: {
    src: string;
    playing: boolean;
    onEnded?: () => void;
  }) => (
    <div
      data-testid="mock-player"
      data-src={src}
      data-playing={String(playing)}
    >
      <button onClick={() => onEnded?.()}>end</button>
    </div>
  ),
}));

describe("VideoPlayer", () => {
  it("renders the first video and is playing by default", () => {
    render(<VideoPlayer />);
    const player = screen.getByTestId("mock-player");
    expect(player).toHaveAttribute("data-src", listVideos()[0].url);
    expect(player).toHaveAttribute("data-playing", "true");
    expect(screen.getByRole("button", { name: "Pause" })).toBeInTheDocument();
  });

  it("toggles play/pause when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<VideoPlayer />);

    await user.click(screen.getByRole("button", { name: "Pause" }));
    expect(screen.getByTestId("mock-player")).toHaveAttribute(
      "data-playing",
      "false",
    );
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Play" }));
    expect(screen.getByTestId("mock-player")).toHaveAttribute(
      "data-playing",
      "true",
    );
  });

  it("advances to the next video when the current one ends", async () => {
    const user = userEvent.setup();
    const videos = listVideos();
    render(<VideoPlayer />);

    await user.click(screen.getByRole("button", { name: "end" }));
    expect(screen.getByTestId("mock-player")).toHaveAttribute(
      "data-src",
      videos[1].url,
    );
  });
});
