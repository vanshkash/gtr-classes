import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-6">

          {/* Mission Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex gap-6">

            <div className="h-20 w-20 shrink-0 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Target className="h-10 w-10 text-blue-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Our Mission
              </h3>

              <p className="mt-4 text-slate-600 leading-8">
                To empower every teaching aspirant with the right
                guidance, high-quality content and a student-friendly
                learning experience that leads to success.
              </p>
            </div>

          </div>

          {/* Vision Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex gap-6">

            <div className="h-20 w-20 shrink-0 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Eye className="h-10 w-10 text-blue-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Our Vision
              </h3>

              <p className="mt-4 text-slate-600 leading-8">
                To become India’s most trusted platform for teaching
                exam preparation and create a community of successful
                and inspiring educators.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}