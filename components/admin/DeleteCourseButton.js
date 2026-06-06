"use client";

import { useRouter } from "next/navigation";

export default function DeleteCourseButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) return;

    const res = await fetch(`/api/courses/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="border px-4 py-2 rounded-lg text-red-600"
    >
      Delete
    </button>
  );
}