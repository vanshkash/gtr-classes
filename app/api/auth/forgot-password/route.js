import { NextResponse } from "next/server";
import crypto from "crypto";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import sendEmail from "@/lib/sendEmail";
import resetPasswordTemplate from "@/emails/resetPasswordTemplate";

export async function POST(req) {
  try {
    await dbConnect();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // Security:
    // Email exists ho ya na ho, same response denge.
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // Generate random token
const resetToken = crypto.randomBytes(32).toString("hex");

// Hash token before storing
const hashedToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

// Save hashed token and expiry
user.resetPasswordToken = hashedToken;
user.resetPasswordExpires = Date.now() + 1000 * 60 * 3; // 3 minutes

await user.save();
// Next step yahan se continue hoga...

const resetLink =
  `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

await sendEmail({
  to: user.email,
  subject: "Reset Your Password",
  html: resetPasswordTemplate(resetLink),
});

return NextResponse.json({
  success: true,
  message:
    "If an account exists with this email, a password reset link has been sent.",
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