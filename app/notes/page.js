import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";
import Link from "next/link";

export default async function NotesPage() {
  await dbConnect();

  const notes = await Note.find({
    isPublished: true,
  })
    .populate("course", "title")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Study Notes</h1>
        <p className="text-gray-500 mt-2">
          Download high-quality notes prepared by GTR Classes.
        </p>
      </div>

      {/* Empty State */}
      {notes.length === 0 ? (
        <div className="text-center py-20 border rounded-xl">
          <h2 className="text-2xl font-semibold">No Notes Available</h2>
          <p className="text-gray-500 mt-2">Notes will appear here soon.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Badge */}
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    note.price === 0
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {note.price === 0 ? "FREE" : "PAID"}
                </span>

                <span className="text-lg font-bold">
                  {note.price === 0 ? "FREE" : `₹${note.price}`}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-2">{note.title}</h2>

              {/* Course */}
              <p className="text-sm text-gray-500 mb-4">{note.course?.title}</p>

              {/* Description */}
              <p className="text-gray-600 text-sm line-clamp-4 mb-6">
                {note.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                {/* Preview */}
                <Link
                  href={`/notes/preview/${note._id}`}
                  className="bg-gray-100 px-4 py-2 rounded-lg"
                >
                  Preview
                </Link>

                {/* Free / Paid */}
                {note.price === 0 ? (
                  <a
                    href={note.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Download
                  </a>
                ) : (
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
