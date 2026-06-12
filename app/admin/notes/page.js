import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";
import "@/models/Course";   //  Add this
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Notes</h1>

        <Link
          href="/admin/notes/new"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Add Note
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Course</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {notes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No Notes Found
                </td>
              </tr>
            ) : (
              notes.map((note) => (
                <tr key={note._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{note.title}</td>

                  <td className="p-4">{note.course?.title}</td>

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
