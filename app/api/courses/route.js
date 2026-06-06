import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();

  const course = await Course.create(body);

  return Response.json(course);
}

export async function GET() {
  await dbConnect();

  const courses = await Course.find();

  return Response.json(courses);
}