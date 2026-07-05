import { redirect } from "next/navigation";
import getCurrentUser from "@/lib/getCurrentUser";
import DeleteAccountButton from "./DeleteAccountButton";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white shadow">

        {/* Header */}
        <div className="border-b p-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="mt-2 text-gray-500">
            Manage your account information.
          </p>
        </div>

        {/* User Details */}
        <div className="space-y-6 p-6">

          <div>
            <label className="text-sm text-gray-500">
              Full Name
            </label>

            <div className="mt-1 rounded-lg border bg-gray-50 px-4 py-3">
              {user.name}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Email Address
            </label>

            <div className="mt-1 rounded-lg border bg-gray-50 px-4 py-3">
              {user.email}
            </div>
          </div>
<div className="mt-10 border-t pt-8">
  <h2 className="text-xl font-semibold">
    Delete Account
  </h2>

  <p className="mt-2 text-sm text-gray-600">
    This action is permanent. Your account, purchased notes,
    purchase history, and related data will be permanently deleted
    and cannot be recovered.
  </p>

  <DeleteAccountButton />
</div>
        </div>

      </div>
      
    </div>
  );
}