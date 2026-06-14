export const dynamic = "force-dynamic";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";
import "@/models/Course"; //  Add this
import Link from "next/link";
import DeleteNoteButton from "@/components/DeleteNoteButton";
import { Eye } from "lucide-react";

export default async function NotesPage() {
  await dbConnect();

  const notes = await Note.find()
    .populate("course", "title")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Study Materials</h1>

        <Link
          href="/admin/notes/new"
          className="bg-black text-white px-4 py-3 rounded-lg text-center w-full sm:w-auto"
        >
          + Add Note/Test Series
        </Link>
      </div>

<div className="md:hidden space-y-4">
  {notes.length === 0 ? (
    <div className="text-center py-10 text-gray-500">
      No Study Material Found
    </div>
  ) : (
    notes.map((note) => (
      <div
        key={note._id}
        className="bg-white border rounded-xl p-4"
      >
        <h2 className="font-bold text-lg">
          {note.title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {note.course?.title}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              note.type === "test-series"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {note.type === "test-series"
              ? "Test Series"
              : "Notes"}
          </span>

          <span className="px-3 py-1 rounded-full bg-gray-100 text-xs">
            {note.price === 0
              ? "Free"
              : `₹${note.price}`}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs ${
              note.isPublished
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {note.isPublished
              ? "Published"
              : "Draft"}
          </span>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            href={`/admin/notes/edit/${note._id}`}
            className="flex-1 border py-2 rounded-lg text-center"
          >
            Edit
          </Link>

          <a
            href={note.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border px-4 py-2 rounded-lg"
          >
            <Eye size={18} />
          </a>

          <DeleteNoteButton
            id={note._id.toString()}
          />
        </div>
      </div>
    ))
  )}
</div>

      {/* Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Course</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {notes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No Study Material Found
                </td>
              </tr>
            ) : (
              notes.map((note) => (
                <tr key={note._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{note.title}</td>

                  <td className="p-4">{note.course?.title}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        note.type === "test-series"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {note.type === "test-series" ? "Test Series" : "Notes"}
                    </span>
                  </td>

                  <td className="p-4">
                    {note.price === 0 ? "Free" : `₹${note.price}`}
                  </td>

                  <td className="p-4">
                    {note.isPublished ? (
                      <span className="text-green-600">Published</span>
                    ) : (
                      <span className="text-red-500">Draft</span>
                    )}
                  </td>

                  <td className="p-4 flex gap-3">
                    <Link
                      href={`/admin/notes/edit/${note._id}`}
                      className="text-blue-600"
                    >
                      Edit
                    </Link>

                    <DeleteNoteButton id={note._id.toString()} />

                    <a
                      href={note.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md text-green-600 hover:bg-green-50 hover:text-green-700 transition"
                      title="View PDF"
                    >
                      <Eye size={18} />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
