import dbConnect from "@/lib/dbConnect";
import Lecture from "@/models/Lecture";
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

  const lecture = await Lecture.create(body);

  return Response.json(lecture);
}