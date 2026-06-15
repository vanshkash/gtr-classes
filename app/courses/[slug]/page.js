import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lecture from "@/models/Lecture";
import Link from "next/link";
import Note from "@/models/Note";
import { Play } from "lucide-react";

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;

  await dbConnect();

  const course = await Course.findOne({ slug });

  if (!course) {
    return <div className="max-w-7xl mx-auto p-10">Course not found</div>;
  }

  const lectures = await Lecture.find({
    courseId: course._id,
  }).sort({ order: 1 });

  const materials = await Note.find({
    course: course._id,
    isPublished: true,
  }).sort({ createdAt: -1 });

  const notes = materials.filter((item) => !item.type || item.type === "notes");

  const testSeries = materials.filter((item) => item.type === "test-series");

  const featuredNote = notes[0];

  const firstLecture = lectures[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-2 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-4 shadow-lg">
        <div className="grid lg:grid-cols-3 gap-4 items-center">
          {/* Thumbnail */}
          <div className="relative group cursor-pointer">
            {firstLecture ? (
              <Link
                href={`/learn/${course.slug}/${firstLecture._id}`}
                className="relative group block"
              >
                {/* Thumbnail */}
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full lg:h-65 h-55 object-cover rounded-2xl shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-black/20 group-hover:bg-black/30 transition-all duration-300" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600">
                    <Play
                      size={24}
                      fill="currentColor"
                      className="ml-1 text-blue-600 group-hover:text-white"
                    />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="relative group block">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full lg:h-65 h-55 object-cover rounded-2xl shadow-md opacity-80"
                />

                <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    Lectures Coming Soon
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Course Details */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight line-clamp-2">
              {course.title}
            </h1>

            <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-600 leading-6 sm:leading-7 lg:leading-8 line-clamp-3 sm:line-clamp-none">
              {course.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 sm:gap-6 lg:gap-8 mt-5 sm:mt-8 text-sm sm:text-base text-gray-700 font-medium">
              <span>{lectures.length}+ Lectures</span>

              <span>60+ Hours</span>

              <span>PDF Notes</span>
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
            {firstLecture ? (
              <Link
                href={`/learn/${course.slug}/${firstLecture._id}`}
                className="inline-flex items-center gap-2  bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 text-sm sm:text-base"
              >
                Start Learning →
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-2 mt-8 bg-gray-300 text-gray-500 px-8 py-4 rounded-xl font-semibold cursor-not-allowed"
              >
                Lectures Coming Soon
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid lg:grid-cols-3 gap-8 mt-2 sm:mt-6 lg:mt-8">
        {/* Course Content */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Course Content
          </h2>

          {lectures.length > 0 ? (
            lectures.map((lecture, index) => (
              <Link
                key={lecture._id}
                href={`/learn/${course.slug}/${lecture._id}`}
              >
                <div className="flex justify-between items-center px-3 py-2.5 sm:p-4 mb-2 sm:mb-3 rounded-xl border hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                  <span className="font-medium text-sm sm:text-base leading-snug">
                    {index + 1}. {lecture.title}
                  </span>

                  <span className="text-blue-600 text-sm sm:text-base">▶</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-medium">No lectures available yet.</p>
              <p className="text-sm mt-2">
                Lectures will be added soon. Stay tuned!
              </p>
            </div>
          )}
        </div>

        {/* Premium Notes */}
        <div className="bg-white rounded-2xl p-6 h-fit shadow-lg sticky top-24">
          <h3 className="text-2xl font-bold">
            {featuredNote?.title || "Premium Notes"}
          </h3>

          <div className="text-5xl font-extrabold text-green-600">
            {featuredNote ? `₹${featuredNote.price}` : "Coming Soon"}
          </div>

          <div className="space-y-4 mt-8 text-gray-700">
            <div>✓ High Quality PDF Notes</div>
            <div>✓ Well Structured Content</div>
            <div>✓ Exam Oriented Material</div>
            <div>✓ Regularly Updated</div>
          </div>
          {featuredNote && (
            <Link
              href={`/notes/preview/${featuredNote._id}`}
              className="block w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md text-center"
            >
              Preview Notes
            </Link>
          )}

          {testSeries.length > 0 && (
            <div className="mt-8 border-t pt-6">
              <h4 className="font-bold text-lg mb-4">Test Series</h4>

              {testSeries.map((item) => (
                <Link
                  key={item._id}
                  href={`/notes/preview/${item._id}`}
                  className="flex justify-between py-2 hover:text-blue-600"
                >
                  <span>{item.title}</span>

                  <span>₹{item.price}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
