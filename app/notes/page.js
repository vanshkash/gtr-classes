export const dynamic = "force-dynamic";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";
import Link from "next/link";

export const metadata = {
  title: "Notes & Test Series",

  description:
    "Access premium study notes, test series, practice materials and exam-focused resources for TGT, PGT, KVS, NVS, DSSSB and Art Education preparation.",

  keywords: [
    "Teaching Exam Notes",
    "TGT Notes",
    "PGT Notes",
    "KVS Notes",
    "NVS Notes",
    "DSSSB Notes",
    "Art Education Notes",
    "Teaching Exam Test Series",
    "Online Study Materials",
    "GTR Classes Notes",
    "GTR Classes Test Series",
  ],

  alternates: {
    canonical: "/notes",
  },

  openGraph: {
    title: "Notes & Test Series | GTR Classes",
    description:
      "Premium study notes and test series for TGT, PGT, KVS, NVS, DSSSB and Art Education preparation.",
    url: "https://www.gtrclasses.in/notes",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "GTR Classes Notes & Test Series",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Notes & Test Series | GTR Classes",
    description:
      "Access premium study notes and test series for teaching exam preparation.",
    images: ["/og-image.webp"],
  },
};

export default async function NotesPage() {
  await dbConnect();

  const materials = await Note.find({
    isPublished: true,
  })
    .populate("course", "title")
    .sort({ createdAt: -1 })
    .lean();

  const notes = materials.filter((item) => !item.type || item.type === "notes");

  const testSeries = materials.filter((item) => item.type === "test-series");

  const renderCards = (items) => (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
      {items.map((note) => (
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
          <h2 className="text-base sm:text-lg font-semibold leading-5 sm:leading-6 mb-2 line-clamp-2">
  {note.title}
</h2>

          {/* Course */}
          {/* <p className="text-sm text-gray-500 mb-4">{note.course?.title}</p> */}

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-4 mb-6">
            {note.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <Link
              href={`/notes/preview/${note._id}`}
              className="bg-gray-100 px-4 py-2 rounded-lg"
            >
              Preview
            </Link>

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
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Study <span className="text-blue-600">Materials</span>
        </h1>

        <p className="text-gray-500 mt-2">
          Access high-quality Notes & Test Series prepared by GTR Classes.
        </p>
      </div>

      {/* Notes */}
      <h2 className="text-3xl font-bold mb-6">Notes</h2>

      {notes.length === 0 ? (
        <div className="text-center py-10 border rounded-xl mb-12">
          <p className="text-gray-500">No Notes Available</p>
        </div>
      ) : (
        renderCards(notes)
      )}

      {/* Test Series */}
      <h2 className="text-3xl font-bold mt-16 mb-6">Test Series</h2>

      {testSeries.length === 0 ? (
        <div className="text-center py-10 border rounded-xl">
          <p className="text-gray-500">Series will be Available soon</p>
        </div>
      ) : (
        renderCards(testSeries)
      )}
    </section>
  );
}
