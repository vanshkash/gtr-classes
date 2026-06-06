"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCoursePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: "",
  });
  const handleSubmit = async () => {
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        slug: form.title.toLowerCase().replaceAll(" ", "-"),
        isFree: false,
        features: [],
      }),
    });

    if (res.ok) {
      router.push("/admin/courses");
    }
  };
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Create Course</h1>

      <div className="space-y-5">
        <input
          placeholder="Course Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border rounded-xl p-3"
        />

        <textarea
          placeholder="Course Description"
          rows={5}
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
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={(e) =>
            setForm({
              ...form,
              thumbnail: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: Number(e.target.value),
            })
          }
          className="w-full border rounded-xl p-3"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Create Course
        </button>
      </div>
    </div>
  );
}
