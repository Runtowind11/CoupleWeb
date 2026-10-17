"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Heart } from "lucide-react";
import LoveCounter from "./LoveCounter";

// 只使用 Emoji 1.0 字符，避免旧 Android / iOS 出现方框
const EMOJIS = ["❤️", "💖", "💗", "💕", "💓"];

// 单次点击生成的爱心数量、同屏上限（防止连点堆积）
const BURST_SIZE = 14;
const MAX_PARTICLES = 120;

// 出生点圆盘半径、方向扇形半角（度）、行程占视口高度的比例区间
const SPAWN_RADIUS = 110;
const FAN_ANGLE = 65;
const TRAVEL_MIN_RATIO = 0.3;
const TRAVEL_MAX_RATIO = 0.62;

// 超过这个位移或时长就判定为滑动 / 长按，不触发特效
const TAP_MOVE_TOLERANCE = 10;
const TAP_TIME_LIMIT = 250;

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  emoji: string;
  drift: number;
  rise: number;
  sway: number;
  rotation: number;
  duration: number;
  delay: number;
  fade: boolean;
}

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomOf<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export default function HeartBurstSign({
  anniversary,
}: {
  anniversary: string;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [beating, setBeating] = useState(false);
  const idRef = useRef(0);
  const pressRef = useRef<{ x: number; y: number; at: number } | null>(null);
  const beatTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (beatTimerRef.current !== null) {
        window.clearTimeout(beatTimerRef.current);
      }
    };
  }, []);

  const removeParticle = useCallback((id: number) => {
    setParticles((list) => list.filter((p) => p.id !== id));
  }, []);

  const burst = useCallback((x: number, y: number) => {
    // 系统开启“减弱动态效果”时退化为原地淡入淡出，不做位移
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // 横向行程上限：避免爱心过早飘出屏幕左右边缘
    const maxDrift = width * 0.45;

    const batch: Particle[] = Array.from(
      { length: reduced ? 4 : BURST_SIZE },
      () => {
        // 出生点：以点击点为圆心的圆盘内随机，避免一簇挤在一起
        const spawnAngle = random(0, Math.PI * 2);
        const spawnRadius = reduced ? 0 : random(0, SPAWN_RADIUS);
        // 方向：以“竖直向上”为中心的扇形，配合随机行程向外散开
        const fan = random(-FAN_ANGLE, FAN_ANGLE) * (Math.PI / 180);
        const travel = reduced
          ? 0
          : random(height * TRAVEL_MIN_RATIO, height * TRAVEL_MAX_RATIO);
        const drift = Math.max(
          -maxDrift,
          Math.min(maxDrift, Math.sin(fan) * travel),
        );
        return {
          id: (idRef.current += 1),
          left: x + Math.cos(spawnAngle) * spawnRadius,
          top: y + Math.sin(spawnAngle) * spawnRadius,
          size: reduced ? random(16, 26) : random(16, 40),
          emoji: randomOf(EMOJIS),
          drift,
          rise: -Math.cos(fan) * travel,
          sway: reduced ? 0 : random(-30, 30),
          rotation: reduced ? 0 : random(-90, 90),
          duration: reduced ? 1.1 : random(2.8, 4.8),
          delay: reduced ? 0 : random(0, 0.7),
          fade: reduced,
        };
      },
    );

    setParticles((list) => {
      const next = [...list, ...batch];
      return next.length > MAX_PARTICLES
        ? next.slice(next.length - MAX_PARTICLES)
        : next;
    });

    // 兜底回收：按该批实际最长存活时间计算，避免慢速粒子被提前删掉
    const ids = new Set(batch.map((p) => p.id));
    const longest = Math.max(...batch.map((p) => p.delay + p.duration));
    window.setTimeout(
      () => setParticles((list) => list.filter((p) => !ids.has(p.id))),
      (longest + 0.4) * 1000,
    );

    setBeating(true);
    if (beatTimerRef.current !== null) {
      window.clearTimeout(beatTimerRef.current);
    }
    beatTimerRef.current = window.setTimeout(() => setBeating(false), 900);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pressRef.current = { x: e.clientX, y: e.clientY, at: Date.now() };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const press = pressRef.current;
    pressRef.current = null;
    if (!press || !e.isPrimary) return;
    if (Math.hypot(e.clientX - press.x, e.clientY - press.y) > TAP_MOVE_TOLERANCE) {
      return;
    }
    if (Date.now() - press.at > TAP_TIME_LIMIT) return;
    burst(e.clientX, e.clientY);
  };

  const clearPress = () => {
    pressRef.current = null;
  };

  return (
    <>
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={clearPress}
        onPointerLeave={clearPress}
        className="liquid-glass animate-float max-w-3xl touch-manipulation space-y-6 rounded-3xl px-8 py-12 text-center select-none md:px-12 md:py-14"
      >
        <span className="group inline-block">
          <Heart
            className={
              beating
                ? "mx-auto h-12 w-12 animate-heart-beat text-rose-500"
                : "mx-auto h-12 w-12 animate-heart-pulse text-rose-500 transition-transform group-hover:animate-heart-beat"
            }
          />
        </span>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Our Story
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          始于 {anniversary.replace(/-/g, ".")}
        </p>
        <LoveCounter anniversary={anniversary} />
      </div>

      {particles.length > 0 &&
        createPortal(
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
          >
            {particles.map((p) => (
              <span
                key={p.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: p.left, top: p.top }}
              >
                <span
                  className="block leading-none"
                  style={
                    {
                      fontSize: p.size,
                      willChange: "transform, opacity",
                      animation: `${
                        p.fade ? "heart-burst-fade" : "heart-burst"
                      } ${p.duration}s ease-in-out ${p.delay}s forwards`,
                      "--burst-drift": `${p.drift}px`,
                      "--burst-rise": `${p.rise}px`,
                      "--burst-sway": `${p.sway}px`,
                      "--burst-rot": `${p.rotation}deg`,
                    } as React.CSSProperties
                  }
                  onAnimationEnd={() => removeParticle(p.id)}
                >
                  {p.emoji}
                </span>
              </span>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
