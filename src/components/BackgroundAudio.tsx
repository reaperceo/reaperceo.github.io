import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import track from "@/assets/full-metal-force.mp3.asset.json";

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let active = true;
    let attempting = false;
    const stopListening = () => {
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("keydown", onInteraction);
    };
    const attempt = async () => {
      if (!active || attempting) return;
      attempting = true;
      audio.volume = 0.35;
      try {
        await audio.play();
        if (active) stopListening();
      } catch {
        // Sound autoplay may be blocked; retry only after a visitor gesture.
      } finally {
        attempting = false;
      }
    };
    function onInteraction(event: Event) {
      if (event.target instanceof Element && event.target.closest(".audio-widget")) return;
      void attempt();
    }
    document.addEventListener("click", onInteraction);
    document.addEventListener("keydown", onInteraction);
    audio.addEventListener("play", stopListening);
    void attempt();
    return () => { active = false; stopListening(); audio.removeEventListener("play", stopListening); audio.pause(); };
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio || pending) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    setPending(true);
    setError(false);
    audio.volume = 0.35;
    try {
      await audio.play();
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <aside aria-label="Musique d'ambiance" className="audio-widget fixed z-40 flex items-center gap-3 rounded-lg border border-primary/50 bg-background p-2 text-foreground social-relief">
      <audio ref={audioRef} src={track.url} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setPending(false); setError(true); }} />
      <Button variant="outline" size="icon" onClick={toggle} disabled={pending} aria-label={playing ? "Mettre la musique en pause" : "Lancer la musique"} aria-pressed={playing} title={playing ? "Mettre la musique en pause" : "Lancer la musique"} className="h-10 w-10 shrink-0 rounded-lg border-primary/50 text-primary-glow">
        {playing ? <Pause /> : <Play />}
      </Button>
      <div className="min-w-0 pr-2">
        <p className="font-mono text-[9px] text-primary-glow" aria-live="polite">AUDIO / {error ? "RÉESSAYER" : pending ? "CHARGEMENT" : playing ? "ON" : "OFF"}</p>
        <p className="text-xs text-muted-foreground">Full Metal Force</p>
      </div>
    </aside>
  );
}