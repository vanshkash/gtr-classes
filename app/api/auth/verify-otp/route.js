import { NextResponse } from "next/server";
import PendingUser from "@/models/PendingUser";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { createAuthToken } from "@/lib/createAuthToken";

export async function POST(req) {
  try {
    await dbConnect();

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and OTP are required.",
        },
        { status: 400 }
      );
    }

    const pendingUser = await PendingUser.findOne({ email });

    if (!pendingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP expired. Please try again.",
        },
        { status: 400 }
      );
    }

    if (pendingUser.otp !== otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP.",
        },
        { status: 400 }
      );
    }
    if (pendingUser.otpExpires < new Date()) {
  await PendingUser.deleteOne({ email });

  return NextResponse.json(
    {
      success: false,
      message: "OTP has expired. Please request a new one.",
    },
    { status: 400 }
  );
}

    const user = await User.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
    });

    await PendingUser.deleteOne({
      email,
    });

    const token = createAuthToken(user);

    const response = NextResponse.json({
      success: true,
      message: "Account created successfully.",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}