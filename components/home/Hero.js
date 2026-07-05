import Image from "next/image";
import Link from "next/link";
import TypingText from "./TypingText";
import HeroSlider from "./HeroSlider";
import { GraduationCap, BookOpen, PlayCircle, Trophy } from "lucide-react";

export default function Hero() {
  const banners = [
    {
      desktop: "/banners/desktop-banner1.webp",
      mobile: "/banners/mobile1.webp",
    },
    {
      desktop: "/banners/desktop-banner2222.webp",
      mobile: "/banners/mobile2.webp",
    },
    {
      desktop: "/banners/desktop3.webp",
      mobile: "/banners/mobile3.webp",
    },
  ];

  return (
    <section className="bg-white">
      {/* Banner Slider */}

      <HeroSlider banners={banners} />

      {/* Result Bar */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-evenly px-6 md:py-2 py-2 text-sm font-medium md:justify-center md:gap-8 md:text-base">
          <span className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            <span className="hidden md:inline">200+ Selections</span>
          </span>

          <span className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className="hidden md:inline">Premium Notes</span>
          </span>

          <span className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5" />
            <span className="hidden md:inline">Recorded Lectures</span>
          </span>

          <span className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <span className="hidden md:inline">Trusted by Aspirants</span>
          </span>
        </div>
      </div>

      {/* Hero Content */}

      <div className="mx-auto max-w-7xl px-4 py-3 md:py-6">
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
          {/* Left Content */}

          <div className="max-w-3xl">
            <h1 className="mt-6 text-4xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
              Your <span className="text-blue-600">Success</span>
              <br />
              <span className="block min-h-[45px] md:min-h-[60px]">
                <TypingText />
              </span>
            </h1>

            <p className="mt-6 max-w-2xl sm:text-lg text-base leading-relaxed text-slate-600">
              Best Online Platform for TGT, PGT, DSSSB, UGC NET and other
              teaching exams preparation.
            </p>

            {/* CTA */}

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm md:px-8 md:py-4 md:text-base font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-blue-700"
              >
                Explore Courses →
              </Link>

              <Link
                href="/notes"
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm md:px-8 md:py-4 md:text-base font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Notes
              </Link>
            </div>

            {/* Small Stats */}

            <div className="mt-8 flex w-full justify-evenly text-center text-xs md:gap-8 md:text-2xl">
              <div>
                <p className="text-2xl font-bold text-blue-600">200+</p>
                <p className="text-slate-600">Selections</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-blue-600">100+</p>
                <p className="text-slate-600">Lectures</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-blue-600">500+</p>
                <p className="text-slate-600">Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">25+</p>
                <p className="text-slate-600">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right Image */}

          <div className="relative hidden md:flex items-center justify-center">
            {/* Background Circle */}
            <div className="absolute h-[400px] w-[400px] rounded-full bg-blue-50 mr-30"></div>

            {/* Decorative Dot */}
            <div className="absolute left-0 top-20 h-8 w-8 rounded-full bg-blue-600"></div>

            {/* Decorative Dot */}
            <div className="absolute left-60 bottom-32 h-10 w-10 rounded-full bg-yellow-400"></div>

            {/* Student Image */}
            <Image
              src="/hero1.webp"
              alt="GTR Classes Student"
              width={280}
              height={280}
              priority
              className="relative z-10 h-auto w-[260px] object-contain mr-25"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
