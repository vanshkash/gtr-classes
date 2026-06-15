import Image from "next/image";
import Link from "next/link";
import TypingText from "./TypingText";


export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[560px] lg:grid-cols-2 items-center gap-8">
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
              Welcome to GTR Classes
            </span>

            <h1 className="mt-6 text-4xl sm:text-4xl lg:text-6xl font-bold leading-tight text-slate-900">
              Your <span className="text-blue-600">Success</span>
              <br />
              <TypingText />
            </h1>

            <p className="mt-4 max-w-xl text-base sm:text-lg text-slate-600">
              Best Online Platform for TGT, PGT, DSSSB, UGC NET and other
              teaching exams preparation.
            </p>

            <div className="mt-6  flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="rounded-xl bg-blue-600 px-5 py-3 sm:px-8 sm:py-4 font-medium text-white transition hover:bg-blue-700"
              >
                Explore Courses
              </Link>

              <Link
                href="/notes"
                className="rounded-xl border border-slate-300 px-5 py-3 sm:px-8 sm:py-4 font-medium text-slate-700 transition hover:bg-slate-50"
              >
                View Notes
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">
            {/* Main Circle */}
            <div className="absolute h-[500px] w-[500px] rounded-full bg-blue-50" />

            {/* Dots */}
            <div className="absolute right-12 top-16 grid grid-cols-4 gap-2">
              {[...Array(16)].map((_, i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-blue-300" />
              ))}
            </div>

            {/* Blue Circle */}
            <div className="absolute left-10 top-24 h-8 w-8 rounded-full bg-blue-600" />

            {/* Yellow Circle */}
            <div className="absolute bottom-40 left-0 h-10 w-10 rounded-full bg-yellow-400" />

            {/* Triangle */}
            <div className="absolute right-10 top-1/2 h-0 w-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[30px] border-b-blue-500" />

            {/* Yellow Shape */}
            <div className="absolute bottom-16 right-0 h-40 w-72 rounded-l-full bg-yellow-300 opacity-70" />

            {/* Student Image */}
            <Image
              src="/hero1.png"
              alt="Student"
              width={400}
              height={500}
              priority
              className="relative z-10 object-contain -mt-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
