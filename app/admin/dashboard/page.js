import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lecture from "@/models/Lecture";
import Note from "@/models/Note";
import Link from "next/link";
import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/verifyAdmin";

export default async function DashboardPage() {
  const isAdmin = await verifyAdmin();

if (!isAdmin) {
  redirect("/admin-login");
}

  await dbConnect();

  const courses = await Course.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const lectures = await Lecture.find().lean();

  const materials = await Note.find().lean();

  const totalCourses = await Course.countDocuments();
  const totalLectures = lectures.length;

  const totalNotes = materials.filter(
    (item) => !item.type || item.type === "notes"
  ).length;

  const totalTestSeries = materials.filter(
    (item) => item.type === "test-series"
  ).length;

  // const totalStudents = 0; // Future

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome to GTR Classes Admin Panel
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Courses */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Courses
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalCourses}
          </h2>
        </div>

        {/* Lectures */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Lectures
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalLectures}
          </h2>
        </div>

        {/* Notes */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Study Notes
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalNotes}
          </h2>
        </div>

        {/* Test Series */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Test Series
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalTestSeries}
          </h2>
        </div>

        {/* Students
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Students
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalStudents}
          </h2>
        </div> */}

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Courses */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">
              Recent Courses
            </h2>

            <Link
              href="/admin/courses"
              className="text-sm text-blue-600"
            >
              View All
            </Link>
          </div>

          {courses.length === 0 ? (
            <p className="text-gray-500">
              No courses found.
            </p>
          ) : (
            <div className="space-y-4">

              {courses.map((course) => (
                <div
                  key={course._id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div>
                    <h3 className="font-medium">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Course Available
                    </p>
                  </div>

                  <Link
                    href={`/admin/courses/${course._id}`}
                    className="text-blue-600 text-sm"
                  >
                    View
                  </Link>
                </div>
              ))}

            </div>
          )}

        </div>

        {/* Quick Actions */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <Link
              href="/admin/courses/new"
              className="bg-blue-600 hover:bg-blue-700 transition text-white text-center py-3 rounded-xl"
            >
              + Add Course
            </Link>

            <Link
              href="/admin/courses"
              className="border hover:bg-gray-50 text-center py-3 rounded-xl"
            >
              Manage Courses
            </Link>

            <Link
              href="/admin/notes/new"
              className="bg-green-600 hover:bg-green-700 transition text-white text-center py-3 rounded-xl"
            >
              + Add Study Material
            </Link>

            <Link
              href="/admin/notes"
              className="border hover:bg-gray-50 text-center py-3 rounded-xl"
            >
              Manage Materials
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}