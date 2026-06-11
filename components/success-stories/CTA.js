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

            <div className="flex items-center gap-6">

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <Trophy
                  size={42}
                  className="text-yellow-400"
                />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Your Story Could Be Next!
                </h2>

                <p className="mt-2 max-w-xl text-blue-100 text-sm">
                  Join hundreds of aspirants who achieved
                  their dream teaching job with GTR Classes.
                
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