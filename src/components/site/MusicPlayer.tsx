"use client";

import { useRef, useState } from "react";
import { Music } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "暂停音乐" : "播放音乐"}
        title={playing ? "暂停音乐" : "播放音乐"}
        className="liquid-glass flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-rose-500 transition-transform hover:scale-105"
      >
        {playing ? (
          <span className="flex h-4 items-end gap-[3px]">
            <span className="animate-eq-1 h-full w-[3px] origin-bottom rounded-full bg-rose-500" />
            <span className="animate-eq-2 h-full w-[3px] origin-bottom rounded-full bg-rose-500" />
            <span className="animate-eq-3 h-full w-[3px] origin-bottom rounded-full bg-rose-500" />
          </span>
        ) : (
          <Music className="h-5 w-5" />
        )}
      </button>
      <audio ref={audioRef} src="/audio/bgm.mp3" loop preload="metadata" />
    </div>
  );
}
