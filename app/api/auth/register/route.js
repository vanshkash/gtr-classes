import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import toast from "react-hot-toast"

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered.",
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
   const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

const token = jwt.sign(
  {
    userId: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

const cookieStore = await cookies();

cookieStore.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
});

    return NextResponse.json({
      success: true,
      message: "Account created successfully.",
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