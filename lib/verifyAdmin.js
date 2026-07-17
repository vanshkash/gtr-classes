import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function verifyAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;

    if (!token) {
      return false;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.admin) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}