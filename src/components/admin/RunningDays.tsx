"use client";

import { useState } from "react";
import { ANNIVERSARY_DATE } from "@/lib/constants";

export default function RunningDays() {
  const [days] = useState(() => {
    const start = new Date(ANNIVERSARY_DATE).getTime();
    return Math.floor((Date.now() - start) / 86400000);
  });

  return <span className="text-3xl font-bold">{days}</span>;
}
