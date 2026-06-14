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

function extractYoutubeId(input) {
  if (!input) return "";

  // Agar already 11-character ID hai
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  try {
    const url = new URL(input);

    // https://youtu.be/VIDEO_ID
    if (url.hostname === "youtu.be") {
      return url.pathname.slice(1);
    }

    // https://www.youtube.com/watch?v=VIDEO_ID
    const videoId = url.searchParams.get("v");
    if (videoId) {
      return videoId;
    }

    // https://www.youtube.com/shorts/VIDEO_ID
    if (url.pathname.startsWith("/shorts/")) {
      return url.pathname.split("/shorts/")[1];
    }

    // https://www.youtube.com/embed/VIDEO_ID
    if (url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/embed/")[1];
    }
  } catch (err) {
    return "";
  }

  return "";
}

  const handleSubmit = async () => {
  const { id } = await params;

  const youtubeId = extractYoutubeId(form.youtubeId);

  if (!youtubeId) {
    alert("Please enter a valid YouTube URL");
    return;
  }

  const res = await fetch("/api/lectures", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      courseId: id,
      title: form.title,
      youtubeId,
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
          placeholder="Paste YouTube Video URL"
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