import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;

  return Response.json({
    success: true,
    message: "MongoDB Connected Successfully",
  });
}