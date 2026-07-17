import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {

  const isAdmin = await verifyAdmin();

if (!isAdmin) {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized",
    },
    { status: 401 }
  );
}

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