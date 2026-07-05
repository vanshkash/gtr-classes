import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Purchase from "@/models/Purchase";
import getCurrentUser from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function PurchasedNotesPage() {
  await dbConnect();
const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const purchases = await Purchase.find({
    userId: user._id,
    status: "paid",
  }).populate("noteId");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-3xl font-bold">
          My Purchased Notes
        </h1>

        {purchases.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <p className="text-gray-500">
              You haven't purchased any notes yet.
            </p>

            <Link
              href="/notes"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white"
            >
              Browse Notes
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {purchases.map((purchase) => (
              <div
                key={purchase._id}
                className="flex items-center justify-between rounded-xl bg-white p-5 shadow"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {purchase.noteId.title}
                  </h2>

                  <p className="text-gray-500">
                    ₹{purchase.noteId.price}
                  </p>
                </div>

                <Link
                  href={`/dashboard/purchased-notes/${purchase.noteId._id}`}
                  className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}