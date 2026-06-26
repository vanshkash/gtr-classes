import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";

export async function POST(req) {
  try {
    const { amount } = await req.json();

    if (!amount) {
      return NextResponse.json(
        { success: false, message: "Amount is required." },
        { status: 400 }
      );
    }

    const options = {
      amount: amount * 100, // Convert ₹ to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("Create Order Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order.",
      },
      { status: 500 }
    );
  }
}