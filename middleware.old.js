import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log("MIDDLEWARE TOKEN:", token);

  const protectedRoutes = ["/dashboard"];

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("JWT VERIFIED:", decoded);

  return NextResponse.next();
} catch (err) {
  console.log("JWT ERROR:", err.message);

  return NextResponse.redirect(new URL("/login", req.url));
}
}

export const config = {
  matcher: ["/dashboard/:path*"],
};