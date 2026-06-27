import jwt from "jsonwebtoken";
import User from "@/models/User";
import dbConnect from "./dbConnect";

export default async function getCurrentUser(req) {
  await dbConnect();

  const token = req.cookies.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    return user;
  } catch {
    return null;
  }
}