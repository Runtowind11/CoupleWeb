"use client";

import { useState, useEffect } from "react";

interface LoveCounterProps {
  anniversary: string;
}

function calculateDays(anniversary: string) {
  const start = new Date(anniversary).getTime();
  const now = Date.now();
  return Math.floor((now - start) / 86400000);
}

export default function LoveCounter({ anniversary }: LoveCounterProps) {
  const [days, setDays] = useState(calculateDays(anniversary));

  useEffect(() => {
    const timer = setInterval(() => {
      setDays(calculateDays(anniversary));
    }, 1000);

    return () => clearInterval(timer);
  }, [anniversary]);

  return (
    <div className="text-center">
      <span className="text-5xl font-bold text-rose-500 md:text-7xl">
        {days}
      </span>
      <span className="mt-2 block text-lg text-muted-foreground">
        Days of Love
      </span>
    </div>
  );
}
