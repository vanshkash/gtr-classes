import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json(
        { success: false, message: "Token Expired" },
        { status: 401 }
      );
    }

    if (decoded.noteId !== id) {
      return NextResponse.json(
        { success: false, message: "Invalid Token" },
        { status: 401 }
      );
    }

    const note = await Note.findById(id);

    if (!note) {
      return NextResponse.json(
        { success: false, message: "Note not found" },
        { status: 404 }
      );
    }

    // Fetch PDF from Cloudinary (server-side)
    const cloudinaryResponse = await fetch(note.pdfUrl);

    if (!cloudinaryResponse.ok) {
      return NextResponse.json(
        { success: false, message: "Unable to fetch PDF" },
        { status: 500 }
      );
    }

   return new Response(cloudinaryResponse.body, {
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${note.title}.pdf"`,
    "Cache-Control": "no-store, no-cache, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}