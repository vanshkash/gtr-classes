import dbConnect from "@/lib/dbConnect";
import Lecture from "@/models/Lecture";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {

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

  const { id } = await params;

  await Lecture.findByIdAndDelete(id);

  return Response.json({
    success: true,
  });
}