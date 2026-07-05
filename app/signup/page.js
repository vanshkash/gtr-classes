"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setLoading(false);

    if (!data.success) {
      alert(data.message);
      return;
    }

    toast.success("Account created successfully.");

    router.replace("/dashboard");
router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border p-8 shadow-sm"
      >
        <h1 className="mb-6 text-3xl font-bold">
          Create Account
        </h1>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-6 w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
        <p className="mt-6 text-center text-sm text-gray-600">
  Already have an account?{" "}
  <Link
    href="/login"
    className="font-semibold text-blue-600 hover:underline"
  >
    Login
  </Link>
</p>
      </form>
    </div>
  );
}