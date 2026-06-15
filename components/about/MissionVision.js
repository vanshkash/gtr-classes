import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-6">

          {/* Mission Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8">
  {/* Mobile Header */}
  <div className="flex items-center gap-3 mb-4">
    <div className="h-12 w-12 sm:h-20 sm:w-20 shrink-0 rounded-2xl bg-blue-50 flex items-center justify-center">
      <Target className="h-6 w-6 sm:h-10 sm:w-10 text-blue-600" />
    </div>

    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
      Our Mission
    </h3>
  </div>

  <p className="text-sm sm:text-base text-slate-600 leading-6 sm:leading-8">
    To empower every teaching aspirant with the right guidance,
    high-quality content and a student-friendly learning experience
    that leads to success.
  </p>
</div>

          {/* Vision Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8">
  {/* Mobile Header */}
  <div className="flex items-center gap-3 mb-4">
    <div className="h-12 w-12 sm:h-20 sm:w-20 shrink-0 rounded-2xl bg-blue-50 flex items-center justify-center">
      <Eye className="h-6 w-6 sm:h-10 sm:w-10 text-blue-600" />
    </div>

    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
      Our Vision
    </h3>
  </div>

  <p className="text-sm sm:text-base text-slate-600 leading-6 sm:leading-8">
    To become India’s most trusted platform for teaching exam
    preparation and create a community of successful and inspiring
    educators.
  </p>
</div>

        </div>

      </div>
    </section>
  );
}