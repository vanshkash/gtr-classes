import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("Webhook Received");

  return NextResponse.json({
    success: true,
  });
}