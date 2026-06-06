import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lecture from "@/models/Lecture";
import Link from "next/link";

export default async function LearnPage({ params }) {
const { courseSlug, lectureId } = await params;

  await dbConnect();

const course = await Course.findOne({
  slug: courseSlug,
});

if (!course) {
  return <div>Course not found</div>;
}

const lectures = await Lecture.find({
  courseId: course._id,
}).sort({ order: 1 });

const lecture = await Lecture.findById(
  lectureId
);

if (!lecture) {
  return <div>Lecture not found</div>;
}

const currentIndex = lectures.findIndex(
  (l) => l._id.toString() === lectureId
);

const prevLecture =
  currentIndex > 0
    ? lectures[currentIndex - 1]
    : null;

const nextLecture =
  currentIndex < lectures.length - 1
    ? lectures[currentIndex + 1]
    : null;

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[3fr_1.2fr] gap-10 p-6">
      {/* LEFT SIDE */}
      <div className="flex flex-col items-start">
        <div className="w-full max-w-4xl">
          {/* Video */}
          <iframe
            className="w-full aspect-video rounded-2xl shadow-lg"
            src={`https://www.youtube.com/embed/${lecture.youtubeId}?playsinline=1`}
            title={lecture.title}
            allowFullScreen
          />

          {/* Title */}
          <h1 className="text-3xl font-bold mt-6">{lecture.title}</h1>

          {/* Description */}
          <p className="mt-3 text-gray-600 leading-7">{lecture.description}</p>

          {/* Previous / Next */}
          <div className="mt-6 flex justify-between">
            {prevLecture ? (
              <Link
                href={`/learn/${course.slug}/${prevLecture._id}`}
                className="px-5 py-2 border rounded-lg hover:bg-gray-50"
              >
                ← Previous
              </Link>
            ) : (
              <div />
            )}

            {nextLecture && (
              <Link
                href={`/learn/${course.slug}/${nextLecture._id}`}
                className="px-5 py-2 border rounded-lg hover:bg-gray-50"
              >
                Next →
              </Link>
            )}
          </div>
          {/* Mobile Course Content */}
          <details className="lg:hidden mt-8 bg-white rounded-2xl p-4 shadow-sm border">
            <summary className="font-bold cursor-pointer text-lg">
              Playlist ({lectures.length} Lectures)
            </summary>

            <div className="mt-4 space-y-2">
              {lectures.map((item, index) => (
                <Link
  key={item._id}
  href={`/learn/${course.slug}/${item._id}`}
>
                  <div
                    className={`p-3 rounded-xl mt-2 ${
                      lectureId === item._id.toString()
                        ? "bg-blue-50 border border-blue-200 text-blue-700"
                        : "hover:bg-gray-50 border"
                    }`}
                  >
                    {index + 1}. {item.title}
                  </div>
                </Link>
              ))}
            </div>
          </details>

          {/* Resources */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Resources</h2>

            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Premium Notes (PDF)</h3>

              <p className="text-gray-500 mt-2">
                This is premium content. Buy this note to access.
              </p>

              <div className="flex items-center justify-between mt-5">
                <div>
                  <span className="text-gray-400 line-through">₹999</span>

                  <div className="text-3xl font-bold text-green-600">₹299</div>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
                  Buy Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:block bg-white rounded-2xl p-5 shadow-lg h-fit sticky top-24 w-full">
        <h2 className="text-xl font-bold mb-4">Playlist ({lectures.length} Lectures)</h2>

        <div className="space-y-2">
          {lectures.map((item, index) => (
            <Link
  key={item._id}
  href={`/learn/${course.slug}/${item._id}`}
>
              <div
                className={`p-3 rounded-xl transition-all cursor-pointer ${
                  lectureId === item._id.toString()
                    ? "bg-blue-50 border border-blue-200 text-blue-700 font-medium"
                    : "border border-transparent hover:bg-gray-50"
                }`}
              >
                <span className="text-sm">
                  {index + 1}. {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
