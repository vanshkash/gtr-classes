"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
const handleChange = (e) => {
  const { name, value } = e.target;

  // Phone validation
  if (name === "phone") {
    // Sirf digits allow
    const phone = value.replace(/\D/g, "");

    // Max 10 digits
    if (phone.length > 10) return;

    setForm({
      ...form,
      phone,
    });

    return;
  }

  setForm({
    ...form,
    [name]: value,
  });
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject || "General Inquiry",
          message: form.message,
          time: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      alert("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
  console.error("EmailJS Error:", err);
  alert(err.text || err.message || "Failed to send message");
}

    setLoading(false);
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Send us a Message</h2>

        <p className="mt-2 text-slate-600">
          Fill out the form below and our team will get back to you as soon as
          possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name + Email */}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name *
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              minLength={3}
  maxLength={50}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address *
            </label>

            <input
  type="email"
  name="email"
  value={form.email}
  onChange={handleChange}
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  title="Please enter a valid email address"
  placeholder="Enter your email"
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
/>
          </div>
        </div>

        {/* Phone + Subject */}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone Number
            </label>

            <input
  type="tel"
  name="phone"
  value={form.phone}
  onChange={handleChange}
  required
  placeholder="Enter your phone number"
  maxLength={10}
  pattern="[6-9]{1}[0-9]{9}"
  title="Please enter a valid 10-digit mobile number."
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
/>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Course Inquiry"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            />
          </div>
        </div>

        {/* Message */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Message *
          </label>

          <textarea
            rows={6}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Send size={18} />

          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
