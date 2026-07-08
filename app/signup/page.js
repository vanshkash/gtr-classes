"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Verification code sent to your email.");

      sessionStorage.setItem(
  "pendingSignup",
  JSON.stringify(form)
);

      setShowOTP(true);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  useEffect(() => {
    if (!showOTP) return;

    setTimer(30);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showOTP]);

  useEffect(() => {
    const savedSignup = sessionStorage.getItem("pendingSignup");

if (savedSignup) {
  const pendingSignup = JSON.parse(savedSignup);

  setForm(pendingSignup);
  setShowOTP(true);
}
  }, []);

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e) => {
  e.preventDefault();

  const pasted = e.clipboardData
    .getData("text")
    .trim();

  if (!/^\d{6}$/.test(pasted)) return;

  const newOtp = pasted.split("");

  setOtp(newOtp);

  document.getElementById("otp-5")?.focus();
};

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          otp: otp.join(""),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Account created successfully.");

      sessionStorage.removeItem("pendingSignup");

      const savedRedirect = sessionStorage.getItem("redirect") || "/dashboard";

      router.replace(savedRedirect);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
  try {
    setLoading(true);

    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    toast.success("A new verification code has been sent.");

    setOtp(["", "", "", "", "", ""]);
    setTimer(30);

    document.getElementById("otp-0")?.focus();

  } catch (error) {
    console.error(error);
    toast.error("Unable to resend OTP.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {!showOTP && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-2xl border p-8 shadow-sm"
        >
          <h1 className="mb-6 text-3xl font-bold">Create Account</h1>

          <input
            required
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border p-3"
          />

          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border p-3"
          />

          <input
            required
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
            {loading ? "Sending OTP..." : "Create Account"}
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
      )}
      {showOTP && (
        <div className="w-full max-w-md rounded-2xl border p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-center">Verify Email</h1>

          <p className="mt-3 text-center text-gray-500">
            We've sent a verification code to
          </p>

          <p className="mt-1 text-center font-semibold">{form.email}</p>

          <div className="mt-8 flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                onPaste={handleOtpPaste}
                className="h-12 w-12 rounded-lg border text-center text-xl font-bold focus:border-blue-600 focus:outline-none"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleVerifyOTP}
            disabled={loading || otp.join("").length !== 6}
            className="mt-5 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Didn't receive the code?
          </p>

          <button
  type="button"
  disabled={timer > 0 || loading}
  onClick={handleResendOTP}
            className="mt-2 w-full text-sm font-medium text-blue-600 hover:underline disabled:text-gray-400 disabled:no-underline"
          >
            {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </button>

          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem("pendingSignup");
              setOtp(["", "", "", "", "", ""]);
              setShowOTP(false);
            }}
            className="mt-4 w-full text-sm text-gray-500 hover:text-black"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
