import Link from "next/link";
import { redirect } from "next/navigation";
import getCurrentUser from "@/lib/getCurrentUser";
import { User, BookOpen } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();

if (!user) {
  redirect("/login");
}

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">
          Student Dashboard
        </h1>

        <p className="mb-10 text-gray-600">
          Welcome back to GTR Classes
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/dashboard/profile"
            className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
  <User className="h-6 w-6 text-blue-600" />
  <h2 className="text-xl font-semibold">
    Profile
  </h2>
</div>

            <p className="mt-2 text-gray-500">
              Manage your account information.
            </p>
          </Link>
          <Link
            href="/dashboard/purchased-notes"
            className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
  <BookOpen className="h-6 w-6 text-blue-600" />
  <h2 className="text-xl font-semibold">
    My Purchased Notes
  </h2>
</div>

            <p className="mt-2 text-gray-500">
              View and download all purchased notes.
            </p>
          </Link>


        </div>
      </div>
    </div>
  );
}