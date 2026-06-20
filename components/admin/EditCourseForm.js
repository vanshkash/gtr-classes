"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCourseForm({ course }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: course.title || "",
    description: course.description || "",
    thumbnail: course.thumbnail || "",
    thumbnailPublicId: course.thumbnailPublicId || "",
    price: course.price || 0,
  });

  const [newThumbnail, setNewThumbnail] = useState(null);

  const handleUpdate = async () => {
  if (
    !form.title.trim() ||
    !form.description.trim() ||
    !form.price
  ) {
    alert("Please fill all required fields.");
    return;
  }

  setLoading(true);

  try {
    let thumbnail = form.thumbnail;
    let thumbnailPublicId = form.thumbnailPublicId;

    if (newThumbnail) {
      const imageData = new FormData();
      imageData.append("file", newThumbnail);

      const uploadRes = await fetch("/api/upload-image", {
        method: "POST",
        body: imageData,
      });

      if (!uploadRes.ok) {
        alert("Image upload failed");
        setLoading(false);
        return;
      }

      const uploadData = await uploadRes.json();

      thumbnail = uploadData.url;
      thumbnailPublicId = uploadData.public_id;
    }

    const res = await fetch(`/api/courses/${course._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        thumbnail,
        thumbnailPublicId,
      }),
    });

    if (res.ok) {
      router.push("/admin/courses");
      router.refresh();
    } else {
      setLoading(false);
      alert("Failed to update course");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
    setLoading(false);
  }
};

  return (
    <div className="space-y-5">
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border rounded-xl p-3"
        placeholder="Course Title"
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
        placeholder="Course Description"
      />

      <img
        src={form.thumbnail}
        alt="Current Thumbnail"
        className="w-48 rounded-lg border"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setNewThumbnail(e.target.files[0])}
        className="w-full border rounded-xl p-3"
      />

      <input
        type="number"
        min="0"
        value={form.price}
        onChange={(e) =>
          setForm({
            ...form,
            price: e.target.value,
          })
        }
        className="w-full border rounded-xl p-3"
        placeholder="Course Price"
      />

      <button
  onClick={handleUpdate}
  disabled={loading}
  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl"
>
  {loading ? "Updating..." : "Update Course"}
</button>
    </div>
  );
}
