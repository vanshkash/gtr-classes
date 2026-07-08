import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import PendingUser from "@/models/PendingUser";
import sendEmail from "@/lib/sendEmail";
import verificationOtpTemplate from "@/lib/emailTemplates/verificationOtp";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

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

   // Generate OTP
const otp = Math.floor(
  100000 + Math.random() * 900000
).toString();

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

const existingPending = await PendingUser.findOne({ email });

if (existingPending) {
  existingPending.name = name;
  existingPending.password = hashedPassword;
  existingPending.otp = otp;
  existingPending.otpExpires = new Date(
    Date.now() + 10 * 60 * 1000
  );

  await existingPending.save();
} else {
  await PendingUser.create({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpires: new Date(
      Date.now() + 10 * 60 * 1000
    ),
  });
}

    // Send Email
    await sendEmail({
      to: email,
      subject: `${otp} is your GTR Classes verification code`,
      html: verificationOtpTemplate(name, otp),
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully.",
    });

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