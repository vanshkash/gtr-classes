"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ================= Desktop Sidebar ================= */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col border-r bg-white p-5">
        <h2 className="text-2xl font-bold mb-8">GTR Admin</h2>

        <nav className="space-y-4">
          <Link
            href="/admin/dashboard"
            className="block hover:text-blue-600 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/courses"
            className="block hover:text-blue-600 transition"
          >
            Courses
          </Link>

          <Link
            href="/admin/notes"
            className="block hover:text-blue-600 transition"
          >
            Notes / Test Series
          </Link>
        </nav>
      </aside>

      {/* ================= Mobile Overlay ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= Mobile Sidebar ================= */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white p-5 border-r z-50
          transform transition-transform duration-300 lg:hidden
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">GTR Admin</h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-4">
          <Link
            href="/admin/dashboard"
            className="block hover:text-blue-600 transition"
            onClick={() => setSidebarOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            href="/admin/courses"
            className="block hover:text-blue-600 transition"
            onClick={() => setSidebarOpen(false)}
          >
            Courses
          </Link>

          <Link
            href="/admin/notes"
            className="block hover:text-blue-600 transition"
            onClick={() => setSidebarOpen(false)}
          >
            Notes / Test Series
          </Link>
        </nav>
      </aside>

      {/* ================= Main Content ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center gap-4 bg-white border-b px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1"
          >
            <Menu size={26} />
          </button>

          <h1 className="text-xl font-bold">
            GTR Admin
          </h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}