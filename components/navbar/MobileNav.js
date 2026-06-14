"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileNav({ navLinks }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
  onClick={() => setOpen(!open)}
  className="transition-transform duration-300"
>
  <div className={`${open ? "rotate-90" : ""} transition-transform duration-300`}>
    {open ? <X size={28} /> : <Menu size={28} />}
  </div>
</button>

      <div
  className={`absolute left-0 top-16 w-full border-t bg-white shadow-xl transition-all duration-300 origin-top ${
    open
      ? "scale-y-100 opacity-100"
      : "pointer-events-none scale-y-95 opacity-0"
  }`}
>
          <div className="flex flex-col gap-4 p-6">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-medium text-slate-700"
              >
                {link.name}
              </Link>
            ))}

            <hr />

            <Link
              href="/login"
              className="rounded-lg border py-2 text-center"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 py-2 text-center text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      
    </div>
  );
}