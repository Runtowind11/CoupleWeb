import { Heart } from "lucide-react";
import LoveCounter from "./LoveCounter";
import { ANNIVERSARY_DATE } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 md:min-h-[70vh]">
      <div className="liquid-glass animate-float max-w-3xl space-y-6 rounded-3xl px-8 py-12 text-center md:px-12 md:py-14">
        <span className="group inline-block">
          <Heart className="mx-auto h-12 w-12 animate-heart-pulse text-rose-500 transition-transform group-hover:animate-heart-beat" />
        </span>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Our Story
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          始于 {ANNIVERSARY_DATE.replace(/-/g, ".")}
        </p>
        <LoveCounter anniversary={ANNIVERSARY_DATE} />
      </div>
    </section>
  );
}
