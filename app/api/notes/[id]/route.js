import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";
import { verifyAdmin } from "@/lib/verifyAdmin"

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    // Check valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid Note ID" },
        { status: 400 }
      );
    }

    const note = await Note.findById(id).populate(
      "course",
      "title"
    );

    if (!note) {
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


import generateSlug from "@/utils/generateSlug";

export async function PUT(req, { params }) {
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

    const { id } = await params;

    const note = await Note.findById(id);

    if (!note) {
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const course = formData.get("course");
    const price = Number(formData.get("price"));
    const isPublished =
      formData.get("isPublished") === "true";

    const pdf = formData.get("pdf");

    // -------------------------
    // Generate Unique Slug
    // -------------------------

    let slug = generateSlug(title);

    const existingNote = await Note.findOne({
      slug,
      _id: { $ne: id },
    });

    if (existingNote) {
      slug = `${slug}-${Date.now()}`;
    }

    // -------------------------
    // Existing PDF Values
    // -------------------------

    let pdfUrl = note.pdfUrl;
    let cloudinaryId = note.cloudinaryId;

    // -------------------------
    // Replace PDF (Optional)
    // -------------------------

    if (pdf && pdf.size > 0) {
      // Validate PDF
      if (pdf.type !== "application/pdf") {
        return NextResponse.json(
          {
            message: "Only PDF files are allowed",
          },
          {
            status: 400,
          }
        );
      }

      // Delete old PDF
      if (note.cloudinaryId) {
        await cloudinary.uploader.destroy(
          note.cloudinaryId,
          {
            resource_type: "image",
          }
        );
      }

      // Upload new PDF
      const bytes = await pdf.arrayBuffer();

      const uploadResult =
        await cloudinary.uploader.upload(
          `data:${pdf.type};base64,${Buffer.from(
            bytes
          ).toString("base64")}`,
          {
            resource_type: "auto",
            folder: "gtr-notes",
            use_filename: true,
            unique_filename: true,
          }
        );

      pdfUrl = uploadResult.secure_url;
      cloudinaryId = uploadResult.public_id;
    }

    // -------------------------
    // Update Note
    // -------------------------

    note.title = title;
    note.slug = slug;
    note.description = description;
    note.course = course || null;
    note.price = price;
    note.isPublished = isPublished;

    note.pdfUrl = pdfUrl;
    note.cloudinaryId = cloudinaryId;

    await note.save();

    return NextResponse.json({
      success: true,
      note,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req, { params }) {
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

    const { id } = await params;

    const note = await Note.findById(id);

    if (!note) {
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );
    }

    // Delete PDF from Cloudinary
    if (note.cloudinaryId) {
      await cloudinary.uploader.destroy(
        note.cloudinaryId,
        {
          resource_type: "image",
        }
      );
    }

    // Delete Note from MongoDB
    await Note.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Note deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}