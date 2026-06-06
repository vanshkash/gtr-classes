import CourseCard from "@/components/CourseCard";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";

export default async function CoursesPage() {
  await dbConnect();

  const courses = await Course.find().lean();

  const serializedCourses = JSON.parse(
    JSON.stringify(courses)
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Our Popular Courses
        </h1>

        <p className="mt-2 text-gray-500">
          Explore our premium courses and start learning today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {serializedCourses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
          />
        ))}
      </div>
    </section>
  );
}