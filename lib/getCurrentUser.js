import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export default async function getCurrentUser(req = null) {
  try {
    await dbConnect();

    let token;

    if (req) {
      // API Routes
      token = req.cookies.get("token")?.value;
    } else {
      // Server Components
      const cookieStore = await cookies();
      token = cookieStore.get("token")?.value;
    }

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}