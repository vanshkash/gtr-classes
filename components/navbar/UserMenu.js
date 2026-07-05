"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CircleUser, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import ModalPortal from "./ModalPortal";
import toast from "react-hot-toast";

export default function UserMenu({ mobile = false }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/logout", {
  method: "POST",
});

if (!res.ok) {
  throw new Error("Logout failed");
}

toast.success("Logged out successfully.");

setTimeout(() => {
  router.replace("/");
  router.refresh();
}, 300);
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout.");
    } finally {
      setLoading(false);
      setLogoutOpen(false);
      setOpen(false);
    }
  };

  return (
    <div ref={menuRef} className="relative">
      <button onClick={() => setOpen(!open)}>
        <CircleUser className="h-8 w-8 text-slate-700 hover:bg-slate-100 transition-colors items-center justify-center" />
      </button>

      {open && (
        <div
          className="
          absolute right-0 top-12
          w-56
          rounded-xl
          border
          bg-white
          shadow-xl
          py-2
        "
        >
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 hover:bg-slate-50"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 hover:bg-slate-50"
          >
            Profile
          </Link>

          <Link
            href="/dashboard/purchased-notes"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 hover:bg-slate-50"
          >
            Purchased Notes
          </Link>
          <hr className="my-2" />

          <button
            onClick={() => {
              setOpen(false);
              setLogoutOpen(true);
            }}
            className="flex w-full items-center gap-2 px-4 py-3 text-left text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      )}
      {logoutOpen && (
        <ModalPortal>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="text-2xl font-bold">Confirm Logout</h2>

              <p className="mt-3 text-gray-600">
                Are you sure you want to logout from your account?
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setLogoutOpen(false)}
                  disabled={loading}
                  className="rounded-lg border px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}
