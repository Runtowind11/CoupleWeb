"use client";

import { useState, useEffect } from "react";
import { ANNIVERSARY_DATE } from "@/lib/constants";

export default function RunningDays() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const start = new Date(ANNIVERSARY_DATE).getTime();
    const now = Date.now();
    setDays(Math.floor((now - start) / 86400000));
  }, []);

  return <span className="text-3xl font-bold">{days}</span>;
}
