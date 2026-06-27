import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Student Dashboard
        </h1>

        <p className="text-gray-600 mb-10">
          Welcome back to GTR Classes 👋
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            href="/dashboard/purchased-notes"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">
              📚 My Purchased Notes
            </h2>

            <p className="text-gray-500 mt-2">
              View and download all purchased notes.
            </p>
          </Link>

          <Link
            href="/dashboard/profile"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">
              👤 Profile
            </h2>

            <p className="text-gray-500 mt-2">
              Manage your account information.
            </p>
          </Link>

          <Link
            href="/dashboard/logout"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-red-600">
              🚪 Logout
            </h2>

            <p className="text-gray-500 mt-2">
              Sign out from your account.
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}