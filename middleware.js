import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow admin login page
  if (pathname === "/admin-login") {
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  if (pathname === "/admin-login") {
  const token = request.cookies.get("adminToken")?.value;

  if (token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};