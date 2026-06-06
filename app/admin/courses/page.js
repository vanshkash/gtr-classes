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
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Courses
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all courses
          </p>
        </div>

        <Link
          href="/admin/courses/new"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          + Add Course
        </Link>
      </div>

      <div className="grid gap-4">
        {serializedCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white border rounded-2xl p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-20 h-14 object-cover rounded-lg"
              />

              <div>
                <h2 className="font-semibold">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-500">
                  Course Available
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/admin/courses/${course._id}`}
                className="border px-4 py-2 rounded-lg"
              >
                Manage
              </Link>

              <DeleteCourseButton
                id={course._id.toString()}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}