import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import EditCourseForm from "@/components/admin/EditCourseForm";

export default async function EditCoursePage({ params }) {
  const { id } = await params;

  await dbConnect();

  const course = await Course.findById(id);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">
        Edit Course
      </h1>

      <EditCourseForm
        course={{
          _id: course._id.toString(),
          title: course.title,
          description: course.description,
          thumbnail: course.thumbnail,
          price: course.price,
        }}
      />
    </div>
  );
}