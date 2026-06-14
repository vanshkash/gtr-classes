import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { revalidatePath } from "next/cache";

export async function PUT(req, { params }) {
  await dbConnect();

  const { id } = await params;
  const body = await req.json();

  const course = await Course.findByIdAndUpdate(id, body, {
    new: true,
  });

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath(`/courses/${course.slug}`);

  return Response.json(course);
}


export async function DELETE(req, { params }) {
  await dbConnect();

  const { id } = await params;

  await Course.findByIdAndDelete(id);

  revalidatePath("/admin/courses");
  revalidatePath("/courses");

  return Response.json({
    success: true,
  });
}
