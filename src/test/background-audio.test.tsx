import { fireEvent, render, waitFor, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BackgroundAudio } from "@/components/BackgroundAudio";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("Background audio", () => {
  it("attempts playback when the visitor enters", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    render(<BackgroundAudio />);
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
  });

  it("retries blocked autoplay on a click, but never restarts after playback and pause", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValueOnce(new Error("NotAllowedError")).mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    const { container } = render(<BackgroundAudio />);
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
    await new Promise(resolve => setTimeout(resolve, 0));
    fireEvent.click(document.body);
    await waitFor(() => expect(play).toHaveBeenCalledTimes(2));
    const audio = container.querySelector("audio");
    if (!audio) throw new Error("Missing audio");
    fireEvent.play(audio);
    fireEvent.pause(audio);
    fireEvent.click(document.body);
    expect(play).toHaveBeenCalledTimes(2);
  });
});