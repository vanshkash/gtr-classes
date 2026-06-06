import dbConnect from "@/lib/dbConnect";
import Lecture from "@/models/Lecture";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();

  const lecture = await Lecture.create(body);

  return Response.json(lecture);
}