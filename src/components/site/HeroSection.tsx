import HeartBurstSign from "./HeartBurstSign";
import { ANNIVERSARY_DATE } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 md:min-h-[70vh]">
      <HeartBurstSign anniversary={ANNIVERSARY_DATE} />
    </section>
  );
}
