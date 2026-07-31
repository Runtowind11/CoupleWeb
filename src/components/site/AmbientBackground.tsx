"use client";

import { useEffect, useRef } from "react";

const WELCOME_TEXT = "执子之手，与子偕老";

const PETALS = [
  { left: "3%", size: 14, delay: 0, duration: 19, opacity: 0.38, drift: "7vw" },
  { left: "9%", size: 10, delay: 5, duration: 22, opacity: 0.3, drift: "-5vw" },
  { left: "16%", size: 12, delay: 9, duration: 17, opacity: 0.35, drift: "9vw" },
  { left: "22%", size: 9, delay: 2, duration: 24, opacity: 0.28, drift: "-6vw" },
  { left: "28%", size: 13, delay: 12, duration: 20, opacity: 0.33, drift: "5vw" },
  { left: "35%", size: 10, delay: 6, duration: 18, opacity: 0.36, drift: "-8vw" },
  { left: "41%", size: 15, delay: 15, duration: 23, opacity: 0.3, drift: "6vw" },
  { left: "48%", size: 11, delay: 1, duration: 21, opacity: 0.38, drift: "-4vw" },
  { left: "54%", size: 9, delay: 8, duration: 16, opacity: 0.3, drift: "8vw" },
  { left: "60%", size: 13, delay: 11, duration: 25, opacity: 0.33, drift: "-7vw" },
  { left: "66%", size: 12, delay: 3, duration: 20, opacity: 0.35, drift: "6vw" },
  { left: "72%", size: 10, delay: 14, duration: 22, opacity: 0.3, drift: "-5vw" },
  { left: "78%", size: 14, delay: 7, duration: 18, opacity: 0.36, drift: "7vw" },
  { left: "84%", size: 11, delay: 16, duration: 24, opacity: 0.32, drift: "-6vw" },
  { left: "90%", size: 9, delay: 4, duration: 17, opacity: 0.3, drift: "8vw" },
  { left: "96%", size: 13, delay: 10, duration: 21, opacity: 0.34, drift: "-4vw" },
];

const STARS = [
  { left: "8%", top: "18%", size: 10, delay: 0, duration: 2.6 },
  { left: "18%", top: "62%", size: 7, delay: 1.2, duration: 3.4 },
  { left: "30%", top: "30%", size: 9, delay: 0.5, duration: 2.2 },
  { left: "46%", top: "70%", size: 8, delay: 2, duration: 3.1 },
  { left: "58%", top: "24%", size: 12, delay: 0.8, duration: 2.8 },
  { left: "70%", top: "66%", size: 7, delay: 1.6, duration: 2.4 },
  { left: "84%", top: "34%", size: 10, delay: 2.4, duration: 3.6 },
  { left: "94%", top: "60%", size: 8, delay: 0.3, duration: 2.9 },
];

export default function AmbientBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let raf = 0;
    let cx = 50;
    let cy = 50;
    let tx = 50;
    let ty = 50;

    const onMove = (e: MouseEvent) => {
      cx = (e.clientX / window.innerWidth) * 100;
      cy = (e.clientY / window.innerHeight) * 100;
    };

    const tick = () => {
      tx += (cx - tx) * 0.06;
      ty += (cy - ty) * 0.06;
      el.style.setProperty("--mx", `${tx}%`);
      el.style.setProperty("--my", `${ty}%`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div ref={glowRef} className="ambient-glow absolute inset-0" />

      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal absolute -top-8 rounded-full"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size * 1.35,
              background:
                "linear-gradient(135deg, rgb(236 72 153 / 0.75), rgb(251 113 133 / 0.55))",
              animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
              "--petal-drift": p.drift,
              "--petal-opacity": p.opacity,
            } as React.CSSProperties
          }
        />
      ))}

      {STARS.map((s, i) => (
        <span
          key={i}
          className="star absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background:
              "radial-gradient(circle, rgb(255 228 238 / 0.95), rgb(255 182 205 / 0.35) 55%, transparent 75%)",
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-[14vh]">
        <p
          className="font-handwriting text-rose-500/8 leading-none whitespace-nowrap select-none"
          style={{
            fontSize: `clamp(1.25rem, calc(100vw / ${WELCOME_TEXT.length} * 0.92), 5rem)`,
          }}
        >
          {WELCOME_TEXT}
        </p>
      </div>
    </div>
  );
}
