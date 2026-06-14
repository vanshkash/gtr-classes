import Image from "next/image";
import {
  Award,
  BookOpen,
  HeartHandshake,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Expert Guidance",
  },
  {
    icon: BookOpen,
    title: "Quality Content",
  },
  {
    icon: Target,
    title: "Proven Results",
  },
  {
    icon: HeartHandshake,
    title: "Always With You",
  },
];

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>

            <p className="text-blue-600 font-semibold uppercase tracking-[3px] mb-4">
              SUCCESS STORIES
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
  From Preparation
  <br />
  To <span className="text-blue-600">Selection.</span>
</h1>

<div className="w-16 h-1 bg-blue-600 rounded-full mt-6" />

<p className="mt-6 text-slate-600 text-lg leading-8 max-w-xl">
  Every achievement represents determination, perseverance, and the
  courage to pursue a dream. At GTR Classes, we are proud to celebrate
  the remarkable journeys of students who turned their dedication into
  success and continue to inspire future aspirants.
</p>

            {/* Features */}

            <div className="grid grid-cols-2 gap-6 mt-10">

              {features.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <Icon size={22} />
                    </div>

                    <span className="font-medium text-slate-700">
                      {item.title}
                    </span>
                  </div>
                );
              })}

            </div>

          </div>

          {/* Right Image */}

          <div className="flex justify-center lg:justify-end">

            <Image
              src="/students/hero.png"
              alt="GTR Classes Success Stories"
              width={700}
              height={700}
              priority
              className="
                w-full
                max-w-[600px]
                h-auto
                object-contain
    
                hover:scale-[1.02]
                transition-all
                duration-500
              "
            />

          </div>

        </div>
      </div>
    </section>
  );
}