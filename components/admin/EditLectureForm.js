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

 function extractYoutubeId(input) {
  if (!input) return "";

  // Agar already 11-char ID hai
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  try {
    const url = new URL(input);

    // youtu.be
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1);
    }

    // watch?v=
    const videoId = url.searchParams.get("v");
    if (videoId) {
      return videoId;
    }

    // shorts
    if (url.pathname.startsWith("/shorts/")) {
      return url.pathname.split("/shorts/")[1];
    }

    // embed
    if (url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/embed/")[1];
    }
  } catch (e) {}

  return "";
}

  const handleUpdate = async () => {
  const youtubeId = extractYoutubeId(form.youtubeId);

  if (!youtubeId) {
    alert("Please enter a valid YouTube URL");
    return;
  }

  const res = await fetch(
    `/api/lectures/${lecture._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        youtubeId,
      }),
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
        placeholder="YouTube Video URL"
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