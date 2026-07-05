import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import dbConnect from "@/lib/dbConnect";
import getCurrentUser from "@/lib/getCurrentUser";

import User from "@/models/User";
import Purchase from "@/models/Purchase";

export async function DELETE(req) {
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

    // Delete all purchases
    await Purchase.deleteMany({
      userId: user._id,
    });

    // Delete user
    await User.findByIdAndDelete(user._id);

    // Logout user
    const cookieStore = await cookies();

    cookieStore.delete("token");

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully.",
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