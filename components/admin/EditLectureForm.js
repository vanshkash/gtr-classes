"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditLectureForm({ lecture }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: lecture.title || "",
    youtubeId: lecture.youtubeId || "",
    description: lecture.description || "",
  });

  const handleUpdate = async () => {
    const res = await fetch(
      `/api/lectures/${lecture._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      router.back();
      router.refresh();
    }
  };

  return (
    <div className="space-y-5">
      <input
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
        className="w-full border rounded-xl p-3"
        placeholder="Lecture Title"
      />

      <input
        value={form.youtubeId}
        onChange={(e) =>
          setForm({
            ...form,
            youtubeId: e.target.value,
          })
        }
        className="w-full border rounded-xl p-3"
        placeholder="YouTube Video ID"
      />

      <textarea
        rows={5}
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
        className="w-full border rounded-xl p-3"
        placeholder="Lecture Description"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Update Lecture
      </button>
    </div>
  );
}