import dbConnect from "@/lib/dbConnect";
import Purchase from "@/models/Purchase";
import Note from "@/models/Note";
import getCurrentUser from "@/lib/getCurrentUser";
import { redirect, notFound } from "next/navigation";

export default async function PurchasedNoteDetails({ params }) {
  await dbConnect();

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const purchase = await Purchase.findOne({
    userId: user._id,
    noteId: id,
    status: "paid",
  });

  if (!purchase) {
    notFound();
  }

  const note = await Note.findById(id);

  if (!note) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">

        <h1 className="text-3xl font-bold">
          {note.title}
        </h1>

        <p className="mt-4 text-gray-600">
          {note.description}
        </p>

        <div className="mt-6 space-y-2">
          <p>
            <strong>Type:</strong> {note.type}
          </p>

          <p>
            <strong>Price:</strong> ₹{note.price}
          </p>

          <p>
            <strong>Status:</strong>
            <span className="ml-2 rounded bg-green-100 px-2 py-1 text-green-700">
              Purchased
            </span>
          </p>
        </div>

       <a
  href={`/api/notes/download/${note._id}`}
  className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
>
  Download Notes
</a>

      </div>
    </div>
  );
}