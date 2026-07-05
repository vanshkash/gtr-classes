import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Token and password are required.",
        },
        { status: 400 },
      );
    }
    if (password.length < 6) {
  return NextResponse.json(
    {
      success: false,
      message: "Password must be at least 6 characters long.",
    },
    { status: 400 },
  );
}

    // Hash the token received from URL
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with matching token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset link is invalid or has expired.",
        },
        { status: 400 },
      );
    }

    // 👇 Password update next
    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    user.password = hashedPassword;

    // Clear reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return NextResponse.json({
      success: true,
      message:
        "Password reset successfully. Please login with your new password.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}


