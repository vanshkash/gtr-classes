"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import UserMenu from "./UserMenu";
import AuthButtons from "./AuthButtons";

export default function MobileNav({ navLinks, isLoggedIn }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="flex items-center gap-3 lg:hidden">
      {isLoggedIn && <UserMenu mobile />}

      <button
        onClick={() => setOpen(!open)}
        className="transition-transform duration-300"
      >
        <div
          className={`${open ? "rotate-90" : ""} transition-transform duration-300`}
        >
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
        </div>
      </div>
    </div>
  );
}
