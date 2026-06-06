import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";

export async function GET() {
  await dbConnect();

  const course = await Course.create({
    title: "UGC NET Paper 1",
    slug: "ugc-net-paper-1",
    description: "Complete preparation course",
    thumbnail: "/courses/ugc.jpg",
    price: 2999,
    isFree: true,
    features: [
      "Free Video Lectures",
      "PDF Notes Available",
      "Exam Oriented Content",
    ],
  });

  return Response.json(course);
}