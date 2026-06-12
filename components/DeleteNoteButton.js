"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteNoteButton({ id }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
  const ok = confirm(
    "Are you sure you want to delete this note?"
  );

  if (!ok) return;

  setDeleting(true);

  try {
    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      alert("Note Deleted Successfully");
      router.refresh();
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Something went wrong");
  } finally {
    setDeleting(false);
  }
};

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="p-2 rounded-md text-red-500 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      title="Delete Note"
    >
      {deleting ? <span className="text-xs">...</span> : <Trash2 size={18} />}
    </button>
  );
}
