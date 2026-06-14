import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();

  const course = await Course.create(body);

  revalidatePath("/admin/courses");
  revalidatePath("/courses");

  return Response.json(course);
}


export async function GET() {
  await dbConnect();

  const courses = await Course.find();

  return Response.json(courses);
}