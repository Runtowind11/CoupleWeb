"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const ANCHORS: [number, number][] = [
  [0, 260],
  [7, 30],
  [12, 50],
  [20, 230],
  [24, 260],
];

function skyHue(now: Date): number {
  const t = now.getHours() + now.getMinutes() / 60;
  for (let i = 0; i < ANCHORS.length - 1; i++) {
    const [t1, h1] = ANCHORS[i];
    const [t2, h2] = ANCHORS[i + 1];
    if (t >= t1 && t <= t2) {
      const p = (t - t1) / (t2 - t1);
      return h1 + (h2 - h1) * p;
    }
  }
  return 260;
}

export default function SkyToneSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const apply = () => {
      const root = document.documentElement;
      if (resolvedTheme === "dark") {
        root.style.setProperty("--sky-hue", String(Math.round(skyHue(new Date()))));
      } else {
        root.style.removeProperty("--sky-hue");
      }
    };

    apply();
    const id = setInterval(apply, 60_000);
    return () => clearInterval(id);
  }, [resolvedTheme]);

  return null;
}
