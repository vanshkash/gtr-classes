import dbConnect from "@/lib/dbConnect";
import Lecture from "@/models/Lecture";
import EditLectureForm from "@/components/admin/EditLectureForm";

export default async function EditLecturePage({
  params,
}) {
  const { lectureId } = await params;

  await dbConnect();

  const lecture = await Lecture.findById(
    lectureId
  );

  if (!lecture) {
    return <div>Lecture not found</div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">
        Edit Lecture
      </h1>

      <EditLectureForm
        lecture={{
          _id: lecture._id.toString(),
          title: lecture.title,
          youtubeId: lecture.youtubeId,
          description:
            lecture.description || "",
        }}
      />
    </div>
  );
}