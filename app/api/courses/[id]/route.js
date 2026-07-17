import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";
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

  // Existing course
  const existingCourse = await Course.findById(id);

  if (!existingCourse) {
    return Response.json(
      { error: "Course not found" },
      { status: 404 }
    );
  }

  // Thumbnail changed?
  if (
    body.thumbnailPublicId &&
    existingCourse.thumbnailPublicId &&
    body.thumbnailPublicId !==
      existingCourse.thumbnailPublicId
  ) {
    await cloudinary.uploader.destroy(
      existingCourse.thumbnailPublicId
    );
  }

  const updatedCourse =
    await Course.findByIdAndUpdate(id, body, {
      new: true,
    });

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath(
    `/courses/${updatedCourse.slug}`
  );

  return Response.json(updatedCourse);
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

  // Find course first
  const course = await Course.findById(id);

  if (!course) {
    return Response.json(
      { error: "Course not found" },
      { status: 404 }
    );
  }

  // Delete image from Cloudinary
  if (course.thumbnailPublicId) {
    await cloudinary.uploader.destroy(
      course.thumbnailPublicId
    );
  }

  // Delete course from MongoDB
  await Course.findByIdAndDelete(id);

  revalidatePath("/admin/courses");
  revalidatePath("/courses");

  return Response.json({
    success: true,
  });
}
