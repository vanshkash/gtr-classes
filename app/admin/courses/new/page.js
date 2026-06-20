"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: null,
    price: "",
  });
  const handleSubmit = async () => {
  if (
    !form.title.trim() ||
    !form.description.trim() ||
    !form.thumbnail ||
    !form.price
  ) {
    alert("Please fill all required fields.");
    return;
  }

  setLoading(true);

  try {
    const imageData = new FormData();
    imageData.append("file", form.thumbnail);

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

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        thumbnail: uploadData.url,
        thumbnailPublicId: uploadData.public_id,
        price: form.price,
        slug: form.title.toLowerCase().replaceAll(" ", "-"),
        isFree: false,
        features: [],
      }),
    });

    if (res.ok) {
      router.push("/admin/courses");
    } else {
      setLoading(false);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
    setLoading(false);
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
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              thumbnail: e.target.files[0],
            })
          }
          className="w-full border rounded-xl p-3"
        />

        <input
          type="number"
          min="0"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
        />

        <button
  disabled={
    loading ||
    !form.title.trim() ||
    !form.description.trim() ||
    !form.thumbnail ||
    !form.price
  }
  onClick={handleSubmit}
  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl"
>
  {loading ? "Creating..." : "Create Course"}
</button>
      </div>
    </div>
  );
}
