import dbConnect from "@/lib/dbConnect";
import Lecture from "@/models/Lecture";

export async function PUT(req, { params }) {
  await dbConnect();

  const { id } = await params;
  const body = await req.json();

  const lecture = await Lecture.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  return Response.json(lecture);
}

export async function DELETE(req, { params }) {
  await dbConnect();

  const { id } = await params;

  await Lecture.findByIdAndDelete(id);

  return Response.json({
    success: true,
  });
}