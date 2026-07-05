"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setLoading(false);

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    setSuccess(true);

    toast.success("Login Successful");

    const savedRedirect = sessionStorage.getItem("redirect") || redirect || "/";

    setTimeout(() => {
      router.push(savedRedirect);
      router.refresh();
    }, 500);

    router.push(savedRedirect);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border p-8 shadow-sm"
      >
        <h1 className="mb-6 text-3xl font-bold">Login</h1>

        {redirect && (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
            Please login or create an account to continue your purchase.
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-6 w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          disabled={loading || success}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Logging in..." : success ? "Login Successful ✓" : "Login"}
        </button>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create Account
          </Link>
        </p>

        <Link
          href="/forgot-password"
          className="text-sm text-blue-600 hover:underline mt-4 block text-center"
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}
