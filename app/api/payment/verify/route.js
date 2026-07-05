import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import Purchase from "@/models/Purchase";
import jwt from "jsonwebtoken";
import getCurrentUser from "@/lib/getCurrentUser";

export async function POST(req) {
  try {
    await dbConnect();
    const user = await getCurrentUser(req);

if (!user) {
  return NextResponse.json(
    {
      success: false,
      message: "Please login first.",
    },
    { status: 401 }
  );
}

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      noteId,
      amount,
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed.",
        },
        { status: 400 },
      );
    }

    const existingPurchase = await Purchase.findOne({
  razorpayPaymentId: razorpay_payment_id,
});

if (existingPurchase) {
  return NextResponse.json({
    success: true,
    message: "Payment already verified.",
  });
}

    const purchase = await Purchase.create({
  userId: user._id,
  noteId,
  razorpayOrderId: razorpay_order_id,
  razorpayPaymentId: razorpay_payment_id,
  razorpaySignature: razorpay_signature,
  amount,
  status: "paid",
});

    const downloadToken = jwt.sign(
  {
    noteId,
    purchaseId: purchase._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "5m",
  }
);

   return NextResponse.json({
  success: true,
  downloadToken,
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
