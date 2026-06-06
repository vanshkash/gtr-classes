import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import Lecture from "@/models/Lecture";
import Link from "next/link";

export default async function DashboardPage() {
  await dbConnect();

 const courses = await Course.find()
  .sort({ createdAt: -1 })
  .limit(5)
  .lean();
  const lectures = await Lecture.find().lean();

  const totalCourses = courses.length;
  const totalLectures = lectures.length;

  const totalNotes = 10; // Dummy
  const totalStudents = 0; // Dummy

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

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Total Courses
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalCourses}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Total Lectures
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalLectures}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Total Notes
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalNotes}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">
            Total Students
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalStudents}
          </h2>
        </div>

      </div>

      {/* Recent Courses + Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Courses */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-bold mb-5">
            Recent Courses
          </h2>

          <div className="space-y-4">

            {courses.map((course) => (
              <div
               key={course._id}
                className="flex justify-between items-center border-b pb-3"
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

        </div>

        {/* Quick Actions */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="flex flex-col gap-4">

            <Link
              href="/admin/courses/new"
              className="bg-blue-600 text-white text-center py-3 rounded-xl"
            >
              + Add Course
            </Link>

            <Link
              href="/admin/courses"
              className="border text-center py-3 rounded-xl"
            >
              Manage Courses
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}