"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteAccountButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
  try {
    setLoading(true);

    const res = await fetch("/api/account/delete", {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong.");
      return;
    }

    toast.success("Account deleted successfully.");

    window.location.href = "/";
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-5 rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
      >
        Delete My Account
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="text-2xl font-bold">
              Delete Account
            </h2>

            <p className="mt-3 text-gray-600">
              Are you sure you want to permanently delete your account?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>

              <button
  onClick={handleDelete}
  disabled={loading}
  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Deleting..." : "Yes, Delete"}
</button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}