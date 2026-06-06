import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex">

      <aside className="w-64 border-r p-5">

        <h2 className="text-2xl font-bold mb-8">
          GTR Admin
        </h2>

        <div className="space-y-4">

          <Link
            href="/admin/dashboard"
            className="block hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/courses"
            className="block hover:text-blue-600"
          >
            Courses
          </Link>

          <Link
            href="/admin/courses/1/notes"
            className="block hover:text-blue-600"
          >
            Notes
          </Link>

        </div>

      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}