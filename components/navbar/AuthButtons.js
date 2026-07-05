"use client";

import Link from "next/link";

export default function AuthButtons({ isLoggedIn, mobile = false }) {

  if (!isLoggedIn) {
    return (
      <>
        <Link
          href="/login"
          className={
            mobile
              ? "rounded-lg border py-2 text-center"
              : "rounded-lg border px-5 py-2 text-sm font-medium hover:bg-slate-50"
          }
        >
          Login
        </Link>

        <Link
          href="/signup"
          className={
            mobile
              ? "rounded-lg bg-blue-600 py-2 text-center text-white"
              : "rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          }
        >
          Sign Up
        </Link>
      </>
    );
  }
}
