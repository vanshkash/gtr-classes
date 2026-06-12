"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddNotePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");
  const [pdf, setPdf] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [courses, setCourses] = useState([]);
  const router = useRouter();

const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();

      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  setLoading(true);

  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("course", course);
    formData.append("price", price);
    formData.append("isPublished", isPublished);

    if (pdf) {
      formData.append("pdf", pdf);
    }

    const res = await fetch("/api/notes", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    alert("✅ Note Added Successfully");

    // Redirect
    router.push("/admin/notes");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow rounded-xl p-6 border">
        <h1 className="text-2xl font-bold mb-6">Add New Note</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Note Title</label>
            <input
              type="text"
              placeholder="Enter note title"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              rows={4}
              placeholder="Enter description..."
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Course */}
          <div>
            <label className="block mb-2 font-medium">Select Course</label>

            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Course (Optional)</option>

              {courses.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-medium">Price (₹)</label>

            <input
              type="number"
              min="0"
              placeholder="0 for Free"
              className="w-full border rounded-lg px-4 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block mb-2 font-medium">Upload PDF</label>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Publish */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={() => setIsPublished(!isPublished)}
            />

            <label>Publish Immediately</label>
          </div>

          {/* Button */}
          <button
  type="submit"
  disabled={loading}
  className="bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Publishing..." : "Publish Note"}
</button>
        </form>
      </div>
    </div>
  );
}
