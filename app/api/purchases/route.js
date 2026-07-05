import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Purchase from "@/models/Purchase";
import getCurrentUser from "@/lib/getCurrentUser";

export async function GET(req) {
  try {
    await dbConnect();

    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const purchases = await Purchase.find({
      userId: user._id,
      status: "paid",
    }).populate("noteId");

    return NextResponse.json({
      success: true,
      purchases,
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