import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lecture from "@/models/Lecture";
import Link from "next/link";

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;

  await dbConnect();

const course = await Course.findOne({ slug });

if (!course) {
  return (
    <div className="max-w-7xl mx-auto p-10">
      Course not found
    </div>
  );
}

const lectures = await Lecture.find({
  courseId: course._id,
}).sort({ order: 1 });

  return (
    <div className="max-w-7xl mx-auto px-2 py-12">

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-4 shadow-lg">

        <div className="grid lg:grid-cols-3 gap-4 items-center">

          {/* Thumbnail */}
          <div>
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-65 object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Course Details */}
          <div className="lg:col-span-2">

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {course.title}
            </h1>

            <p className="mt-5 text-lg text-gray-600 leading-8">
              {course.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-8 text-gray-700 font-medium">

              <span>
                🎥 {lectures.length}+ Lectures
              </span>

              <span>
                ⏱️ 60+ Hours
              </span>

              <span>
                📄 PDF Notes
              </span>

            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-3 mt-8">

              {course.features?.map((feature, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-green-50 text-green-700 border border-green-100 rounded-full text-sm font-medium"
                >
                  ✓ {feature}
                </span>
              ))}

            </div>

            {/* CTA */}
            {lectures.length > 0 && (
  <Link
    href={`/learn/${course.slug}/${lectures[0]._id}`}
    className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1"
  >
    Start Learning →
  </Link>
)}

          </div>

        </div>

      </div>

      {/* Content Section */}
      <div className="grid lg:grid-cols-3 gap-8 mt-12">

        {/* Course Content */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Course Content
          </h2>

          {lectures.map((lecture, index) => (
            <Link
              key={lecture._id}
href={`/learn/${course.slug}/${lecture._id}`}
            >
              <div className="flex justify-between items-center p-4 mb-3 rounded-xl border hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">

                <span className="font-medium">
                  {index + 1}. {lecture.title}
                </span>

                <span className="text-blue-600">
                  ▶
                </span>

              </div>
            </Link>
          ))}

        </div>

        {/* Premium Notes */}
        <div className="bg-white rounded-2xl p-6 h-fit shadow-lg sticky top-24">

          <h3 className="text-2xl font-bold">
            Premium Notes
          </h3>

          <div className="mt-4">
            <span className="text-gray-400 line-through text-xl">
              ₹999
            </span>

            <div className="text-5xl font-extrabold text-green-600">
              ₹299
            </div>
          </div>

          <div className="space-y-4 mt-8 text-gray-700">

            <div>✓ High Quality PDF Notes</div>
            <div>✓ Well Structured Content</div>
            <div>✓ Exam Oriented Material</div>
            <div>✓ Regularly Updated</div>
            <div>✓ Download Anytime</div>

          </div>

          <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md">
            Buy Notes
          </button>

        </div>

      </div>

    </div>
  );
}