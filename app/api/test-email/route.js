import { NextResponse } from "next/server";
import transporter from "@/lib/mail";

export async function GET() {
  try {
    await transporter.sendMail({
      from: `"GTR Classes" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // khud ko test email
      subject: "Test Email",
      html: `
        <h2>🎉 Congratulations!</h2>
        <p>Nodemailer is working successfully.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}