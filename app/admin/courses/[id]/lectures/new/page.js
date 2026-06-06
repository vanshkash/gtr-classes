"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewLecturePage({ params }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    youtubeId: "",
    description: "",
    notesUrl: "",
  });

  const handleSubmit = async () => {
    const { id } = await params;

    const res = await fetch("/api/lectures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: id,
        title: form.title,
        youtubeId: form.youtubeId,
        description: form.description,
        notesUrl: form.notesUrl,
        order: 1,
      }),
    });

    if (res.ok) {
      router.push(`/admin/courses/${id}`);
      router.refresh();
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">
        Add New Lecture
      </h1>

      <div className="space-y-5">
        <input
          type="text"
          placeholder="Lecture Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
        />

        <input
          type="text"
          placeholder="YouTube Video ID"
          value={form.youtubeId}
          onChange={(e) =>
            setForm({
              ...form,
              youtubeId: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
        />

        <textarea
          rows={5}
          placeholder="Lecture Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
        />

        <input
          type="text"
          placeholder="PDF Notes URL (Optional)"
          value={form.notesUrl}
          onChange={(e) =>
            setForm({
              ...form,
              notesUrl: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Create Lecture
        </button>
      </div>
    </div>
  );
}