import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-2">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 px-8 py-10 md:px-12 md:py-12">

          {/* Decorative Dots */}

          <div className="absolute left-6 top-6 grid grid-cols-4 gap-2 opacity-20">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-white"
              />
            ))}
          </div>

          <div className="absolute right-6 bottom-6 grid grid-cols-4 gap-2 opacity-20">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-white"
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center justify-between gap-8 lg:flex-row">
  {/* Left */}
  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
    {/* Trophy */}
    <div className="flex h-14 w-14 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
      <Trophy className="h-7 w-7 sm:h-10 sm:w-10 text-yellow-400" />
    </div>

    {/* Text */}
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
        Your Story Could Be Next!
      </h2>

      <p className="mt-2 max-w-xl text-xs sm:text-sm text-blue-100 leading-5 sm:leading-6">
        Join hundreds of aspirants who achieved their dream teaching
        job with GTR Classes.
      </p>
    </div>
  </div>

  {/* Button */}
  <Link
    href="/courses"
    className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-blue-700 transition hover:scale-105 hover:bg-slate-100"
  >
    Explore Courses
    <ArrowRight size={18} />
  </Link>
</div>

        </div>
      </div>
    </section>
  );
}