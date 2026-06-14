import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lecture from "@/models/Lecture";
import DeleteLectureButton from "@/components/admin/DeleteLectureButton";

export default async function AdminCoursePage({ params }) {
  const { id } = await params;

  await dbConnect();
  const course = await Course.findById(id);
  const lectures = await Lecture.find({
    courseId: id,
  }).sort({ order: 1 });

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">
          <Link href={`/admin/courses/${course._id}`}>{course.title}</Link>
        </h1>

        <div className="flex gap-3">
          <Link
            href={`/admin/courses/${course._id}/edit`}
            className="border px-5 py-3 rounded-xl"
          >
            Edit Course
          </Link>

          <Link
            href={`/admin/courses/${course._id}/lectures/new`}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            + Add Lecture
          </Link>
        </div>
      </div>

      {/* Course Details */}
      <div className="bg-white border rounded-2xl p-4 sm:p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="w-full md:w-1/3">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-56 object-cover rounded-xl"
            />
          </div>

          {/* Content */}
          <div className="md:w-2/3 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-3">{course.title}</h2>

              <p className="text-gray-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {course.isFree ? (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{course.price}
                  </span>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Free
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-400 line-through">
                  ₹{course.price}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lectures Placeholder */}
      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Lectures ({lectures.length})</h3>

        <div className="space-y-3">
          {lectures.map((lecture, index) => (
            <div
              key={lecture._id}
              className="border rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            >
              <div>
                <h4 className="font-semibold">
                  {index + 1}. {lecture.title}
                </h4>

                <p className="text-sm text-gray-500">{lecture.youtubeId}</p>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/admin/courses/${course._id}/lectures/${lecture._id}`}
                  className="border px-4 py-2 rounded-lg"
                >
                  Edit
                </Link>

                <DeleteLectureButton lectureId={lecture._id.toString()} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
