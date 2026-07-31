"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause, Play, X } from "lucide-react";

function formatTime(t: number) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
    moved: false,
    dragging: false,
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrent(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

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

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * duration;
    setCurrent(audio.currentTime);
  }

  function onPointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const base = pos ?? {
      x: Math.max(window.innerWidth - rect.width - 24, 8),
      y: Math.max(window.innerHeight - rect.height - 24, 8),
    };
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: base.x,
      baseY: base.y,
      moved: false,
      dragging: true,
    };
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag.dragging) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
    drag.moved = true;

    const x = Math.min(Math.max(drag.baseX + dx, 8), window.innerWidth - 56);
    const y = Math.min(Math.max(drag.baseY + dy, 8), window.innerHeight - 56);
    setPos({ x, y });
  }

  function onPointerUp() {
    dragRef.current.dragging = false;
  }

  function handleClick() {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }
    setOpen(true);
  }

  if (!open) {
    return (
      <div
        className="fixed z-50"
        style={pos ? { left: pos.x, top: pos.y } : { right: 24, bottom: 24 }}
      >
        <button
          type="button"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onClick={handleClick}
          aria-label="打开音乐播放器"
          title="打开音乐播放器"
          className="liquid-glass flex h-12 w-12 cursor-grab touch-none items-center justify-center rounded-full text-rose-500 transition-transform active:cursor-grabbing hover:scale-105"
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

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <div className="liquid-glass w-72 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 shrink-0 text-rose-500" />
          <span className="truncate text-sm font-medium">背景音乐</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="收起播放器"
            title="收起播放器"
            className="ml-auto flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/30 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          role="slider"
          aria-label="播放进度"
          aria-valuemin={0}
          aria-valuemax={duration || 0}
          aria-valuenow={current}
          onClick={seek}
          className="group mt-3 cursor-pointer py-1"
        >
          <div className="h-1.5 overflow-hidden rounded-full bg-white/30">
            <div
              className="h-full rounded-full bg-rose-500 transition-[width] duration-150"
              style={{ width: duration ? `${(current / duration) * 100}%` : "0%" }}
            />
          </div>
        </div>

        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(current)}</span>
          <span>{duration ? formatTime(duration) : "--:--"}</span>
        </div>

        <div className="mt-2 flex justify-center">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "暂停" : "播放"}
            title={playing ? "暂停" : "播放"}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-rose-500 text-white transition-transform hover:scale-105"
          >
            {playing ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="ml-0.5 h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <audio ref={audioRef} src="/audio/bgm.mp3" loop preload="metadata" />
    </div>
  );
}
