import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";
import cloudinary from "@/lib/cloudinary";
import generateSlug from "@/utils/generateSlug";

// GET API (already working)
export async function GET() {
  try {
    await dbConnect();

    const notes = await Note.find()
      .populate("course", "title")
      .sort({ createdAt: -1 });

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST API
export async function POST(req) {
  try {

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

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const course = formData.get("course");
    const price = Number(formData.get("price"));
    const isPublished = formData.get("isPublished") === "true";
    const type = formData.get("type") || "notes";
    const pdf = formData.get("pdf");

    if (!pdf) {
      return NextResponse.json({ message: "PDF is required" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await pdf.arrayBuffer();

    const uploadResult = await cloudinary.uploader.upload(
      `data:${pdf.type};base64,${Buffer.from(bytes).toString("base64")}`,
      {
        resource_type: "auto",
        folder: "gtr-notes",
      },
    );

    // Generate slug
    let slug = generateSlug(title);

    const exists = await Note.findOne({ slug });

    if (exists) {
      slug = `${slug}-${Date.now()}`;
    }

    // Save Note
    const note = await Note.create({
      title,
      slug,
      description,
      course: course || null,
      type,
      price,
      pdfUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id,
      isPublished,
    });

    return NextResponse.json({
      success: true,
      note,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
