import Image from "next/image";
import {
  GraduationCap,
  PlayCircle,
  FileText,
  Trophy,
} from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Hero Grid */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">

          {/* Left Content */}
          <div className="relative z-20">

            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
              About GTR Classes
            </span>

            <h1 className="mt-6 text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Guiding Aspirants
              <span className="block text-blue-600">
                Towards Success
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-9 max-w-xl">
              GTR Classes is a trusted online learning platform for
              PGT, TGT, NVS, KVS, DSSSB and other teaching exams.
              Our mission is to provide quality education, expert
              guidance and best study material to help aspirants
              achieve success.
            </p>

            {/* Features */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-blue-600" />
                </div>
                <span className="mt-3 text-sm font-medium">
                  Expert Faculty
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center">
                  <PlayCircle className="w-7 h-7 text-blue-600" />
                </div>
                <span className="mt-3 text-sm font-medium">
                  Free Lectures
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-blue-600" />
                </div>
                <span className="mt-3 text-sm font-medium">
                  Premium Notes
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-blue-600" />
                </div>
                <span className="mt-3 text-sm font-medium">
                  Proven Results
                </span>
              </div>

            </div>

          </div>

          {/* Right Image */}

          <div className="relative">

            {/* White Fade */}
            <div className="absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-white to-transparent z-10" />

            <Image
              src="/about/about-heros.png"
              alt="GTR Classes"
              width={900}
              height={700}
              priority
              className="w-full h-auto object-contain"
            />

          </div>

        </div>

      </div>

      {/* Decorative Elements */}

      <div className="hidden lg:block absolute top-40 left-[52%] h-20 w-20 rounded-full bg-blue-100 opacity-70" />

      <div className="hidden lg:grid absolute top-28 left-[52%] grid-cols-5 gap-2">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-blue-300"
          />
        ))}
      </div>

      <div className="hidden lg:block absolute top-20 left-[60%]">
        <div
          className="w-0 h-0
          border-l-[10px]
          border-r-[10px]
          border-b-[18px]
          border-l-transparent
          border-r-transparent
          border-b-blue-200
          rotate-90"
        />
      </div>

    </section>
  );
}