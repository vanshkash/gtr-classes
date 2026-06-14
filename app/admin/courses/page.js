import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import DeleteCourseButton from "@/components/admin/DeleteCourseButton";

export default async function AdminCoursesPage() {
  await dbConnect();

  const courses = await Course.find().lean();

  const serializedCourses = JSON.parse(
    JSON.stringify(courses)
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Courses
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Manage all courses
          </p>
        </div>

        <Link
          href="/admin/courses/new"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl text-center w-full sm:w-auto"
        >
          + Add Course
        </Link>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {serializedCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-24 h-16 sm:w-20 sm:h-14 object-cover rounded-lg flex-shrink-0"
              />

              <div>
                <h2 className="font-semibold text-base sm:text-lg">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-500">
                  Course Available
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex gap-2 w-full sm:w-auto">
              <Link
                href={`/admin/courses/${course._id}`}
                className="flex-1 sm:flex-none border px-4 py-2 rounded-lg text-center hover:bg-gray-50 transition"
              >
                Manage
              </Link>

              <div className="flex-1 sm:flex-none">
                <DeleteCourseButton
                  id={course._id.toString()}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}