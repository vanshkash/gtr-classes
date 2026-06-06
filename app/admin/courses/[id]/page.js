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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          <Link href={`/admin/courses/${course._id}`}>
            {course.title}
          </Link>
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
      <div className="bg-white border rounded-2xl p-6 mb-6">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full max-h-80 object-cover rounded-xl mb-5"
        />

        <h2 className="text-2xl font-bold">
          {course.title}
        </h2>

        <p className="text-gray-600 mt-3">
          {course.description}
        </p>

        <div className="mt-5 flex gap-6">
          <span className="font-medium">
            ₹{course.price}
          </span>

          <span
            className={`font-medium ${
              course.isFree
                ? "text-green-600"
                : "text-orange-600"
            }`}
          >
            {course.isFree ? "Free" : "Paid"}
          </span>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white border rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">
          Features
        </h3>

        <div className="space-y-2">
          {course.features?.map((feature, index) => (
            <div key={index}>
              ✓ {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Lectures Placeholder */}
      <div className="bg-white border rounded-2xl p-6">
  <h3 className="text-xl font-bold mb-4">
    Lectures ({lectures.length})
  </h3>

  <div className="space-y-3">
    {lectures.map((lecture, index) => (
      <div
        key={lecture._id}
        className="border rounded-xl p-4 flex justify-between items-center"
      >
        <div>
          <h4 className="font-semibold">
            {index + 1}. {lecture.title}
          </h4>

          <p className="text-sm text-gray-500">
            {lecture.youtubeId}
          </p>
        </div>

        <div className="flex gap-2">
  <Link
    href={`/admin/courses/${course._id}/lectures/${lecture._id}`}
    className="border px-4 py-2 rounded-lg"
  >
    Edit
  </Link>

  <DeleteLectureButton
    lectureId={lecture._id.toString()}
  />
</div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
}