import Image from "next/image";
import { GraduationCap, Award, BookOpen } from "lucide-react";

export default function FounderSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
            Leadership
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            Meet Our Founder
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            The vision behind GTR Classes is to make quality education
            accessible and affordable for every teaching aspirant.
          </p>
        </div>

        {/* Founder Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Image Side */}
            <div className="relative sm:h-[500px]">
              <Image
                src="/about/founder.png"
                alt="Founder"
                // fill
                className="object-cover"
                height={600}
                width={600}
              />
            </div>

            {/* Content Side */}
            <div className="p-4 lg:p-12">
              <span className="text-blue-600 font-medium">
                Founder & Lead Educator
              </span>

              <h3 className="mt-3 text-3xl font-bold text-slate-900">
                Mr. Ram Kumar Sir
              </h3>

              <p className="mt-6 text-sm sm:text-base text-slate-600 leading-6 sm:leading-8">
                GTR Classes was founded with a simple mission — to help teaching
                aspirants achieve their dreams through quality education,
                structured preparation, and affordable learning resources.
              </p>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-6 sm:leading-8">
                Through expert guidance, premium notes, video lectures, and
                exam-oriented strategies, GTR Classes continues to support
                students preparing for PGT, TGT, KVS, NVS, DSSSB and other
                teaching examinations.
              </p>

              {/* Highlights */}

              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-2xl bg-blue-50">
                  <GraduationCap className="h-7 w-7 text-blue-600 mb-2" />
                  <h4 className="font-semibold">Expert Guidance</h4>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50">
                  <BookOpen className="h-7 w-7 text-blue-600 mb-2" />
                  <h4 className="font-semibold">Quality Content</h4>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50">
                  <Award className="h-7 w-7 text-blue-600 mb-2" />
                  <h4 className="font-semibold">Student Success</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
