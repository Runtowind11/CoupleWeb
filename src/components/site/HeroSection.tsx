import { Heart } from "lucide-react";
import LoveCounter from "./LoveCounter";

export default function HeroSection() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-linear-to-b from-rose-100 via-purple-50 to-white px-4 md:min-h-[70vh]">
      <div className="max-w-3xl space-y-6 text-center">
        <Heart className="mx-auto h-12 w-12 animate-heart-pulse text-rose-500" />
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Our Story
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          始于 2020.01.15
        </p>
        <LoveCounter anniversary="2020-01-15" />
      </div>
    </section>
  );
}
