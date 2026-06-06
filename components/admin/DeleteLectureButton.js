"use client";

import { useRouter } from "next/navigation";

export default function DeleteLectureButton({
  lectureId,
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(
      "Delete this lecture?"
    );

    if (!confirmed) return;

    const res = await fetch(
      `/api/lectures/${lectureId}`,
      {
        method: "DELETE",
      }
    );

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