"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { CheckCircle, ShieldCheck, ArrowLeft } from "lucide-react";
const PDFViewer = dynamic(() => import("./PDFViewer"), {
  ssr: false,
  loading: () => <div className="text-center py-20">Loading Preview...</div>,
});

export default function ClientPreview({
  title,
  pdfUrl,
  price,
  course,
  type = "notes",
}) {
  return (
    <div className="max-w-7xl mx-auto px-2 py-4">
      {/* Back */}
      {/* Back Button */}
      <Link
        href="/notes"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition font-medium"
      >
        <ArrowLeft size={18} />
        Back to {type === "test-series" ? "Test Series" : "Notes"}
      </Link>

      {/* Main Layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 rounded-3xl bg-white border border-gray-200 shadow-xl overflow-hidden">
          {/* PDF Header */}
          <div className="flex items-center justify-between border-b px-6 py-4 bg-gray-50">
            <h2 className="font-semibold text-lg">
              {type === "test-series" ? "Test Series Preview" : "Notes Preview"}
            </h2>

            <span className="text-sm text-gray-500">First 4 Pages Only</span>
          </div>

          {/* PDF */}
          <div className="p-4">
            <PDFViewer pdfUrl={pdfUrl} />
          </div>
        </div>

        {/* RIGHT : Details */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-2xl border shadow p-6">
            <h1 className="text-2xl font-bold mt-4">{title}</h1>

            {course && <p className="text-gray-500 mt-2">{course}</p>}

            <div className="mt-6">
              <div className="text-sm text-gray-500">Price</div>

              <div className="text-4xl font-bold mt-1">
                {price === 0 ? "FREE" : `₹${price}`}
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <p className="text-gray-600 text-sm leading-6">
                You are currently viewing only the first 4 pages. Purchase the
                full {type === "test-series" ? "test series" : "notes"} to
                unlock complete access.
              </p>

              <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium">
                Buy Full {type === "test-series" ? "Test Series" : "Notes"}
              </button>

              <Link
                href="/notes"
                className="block w-full mt-3 text-center border py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Back to {type === "test-series" ? "Test Series" : "Notes"}
              </Link>
            </div>

            <div className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-4 flex gap-3">
              <ShieldCheck
                className="text-green-600 flex-shrink-0 mt-0.5"
                size={22}
              />

              <div>
                <p className="font-medium text-green-700">Secure Purchase</p>

                <p className="text-sm text-green-600 mt-1">
                  Instant access after payment with full support. Trusted by
                  thousands of aspirants.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span>
                  {type === "test-series"
                    ? "Complete Test Series PDF"
                    : "Complete PDF Notes"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span>Instant Access After Purchase</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span>Mobile & Laptop Friendly</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span>
                  {type === "test-series"
                    ? "Exam-Oriented Practice Tests"
                    : "High Quality Exam-Oriented Notes"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
