"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCourseForm({ course }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: course.title || "",
    description: course.description || "",
    thumbnail: course.thumbnail || "",
    price: course.price || 0,
  });

  const handleUpdate = async () => {
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.thumbnail.trim() ||
      !form.price
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const res = await fetch(`/api/courses/${course._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/courses");
      router.refresh();
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

      <input
        value={form.thumbnail}
        onChange={(e) =>
          setForm({
            ...form,
            thumbnail: e.target.value,
          })
        }
        className="w-full border rounded-xl p-3"
        placeholder="Thumbnail URL"
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
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
        Update Course
      </button>
    </div>
  );
}
