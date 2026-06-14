"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditNotePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const [courses, setCourses] = useState([]);
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchNote();
  }, []);

  async function fetchCourses() {
    const res = await fetch("/api/courses");
    const data = await res.json();
    setCourses(data);
  }

  async function fetchNote() {
    const res = await fetch(`/api/notes/${id}`);
    const data = await res.json();

    setTitle(data.title);
    setDescription(data.description);
    setCourse(data.course?._id || "");
    setPrice(data.price);
    setIsPublished(data.isPublished);

    setLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("course", course);
      formData.append("price", price);
      formData.append("isPublished", isPublished);

      // PDF optional hai
      if (pdf) {
        formData.append("pdf", pdf);
      }

      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Note Updated Successfully");

      router.push("/admin/notes");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white border rounded-xl p-6 shadow">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
  Edit Study Material
</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Title</label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows={5}
              className="w-full border rounded-lg px-4 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Course */}
          <div>
            <label className="block mb-2 font-medium">Course (Optional)</label>

            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Independent Note</option>

              {courses.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-medium">Price</label>

            <input
              type="number"
              className="w-full border rounded-lg px-4 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Replace PDF */}
          <div>
            <label className="block mb-2 font-medium ">
              Replace PDF (Optional)
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
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

            <label>Published</label>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updating ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
}
