import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Notes", href: "/notes" },
  { name: "About Us", href: "/about" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "Contact", href: "/contact" },
];

const exams = [
  "PGT",
  "TGT",
  "KVS",
  "NVS",
  "DSSSB",
  "ART",
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              GTR Classes
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              GTR Classes provides quality guidance, structured courses,
              premium notes and test series for aspirants preparing for
              TGT, PGT, KVS, NVS, DSSSB and other teaching examinations.
            </p>

            <div className="mt-6 flex gap-3">

              <a
                href="#"
                className="rounded-xl bg-slate-800 p-2.5 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600"
              >
                <FaFacebookF size={15} />
              </a>

              <a
                href="#"
                className="rounded-xl bg-slate-800 p-2.5 transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600"
              >
                <FaInstagram size={15} />
              </a>

              <a
                href="https://www.youtube.com/@gtrs2660"
                className="rounded-xl bg-slate-800 p-2.5 transition-all duration-300 hover:-translate-y-1 hover:bg-red-600"
              >
                <FaYoutube size={15} />
              </a>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="mb-4 text-base font-semibold text-white">
              Quick Links
            </h3>

            <div className="space-y-3">

              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-400"
                >
                  <ChevronRight size={14} />

                  {link.name}
                </Link>
              ))}

            </div>

          </div>

          {/* Popular Courses */}
          <div>

            <h3 className="mb-4 text-base font-semibold text-white">
              Popular Courses
            </h3>

            <div className="space-y-3">

              {exams.map((item) => (
                <p
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-400"
                >
                  <ChevronRight size={14} />

                  {item} Preparation
                </p>
              ))}

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-4 text-base font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <p className="text-sm text-slate-400">
                  Anand Vihar, Hapur
                  <br />
                  Uttar Pradesh-245101
                </p>

              </div>

              <div className="flex gap-3">

                <Phone
                  size={18}
                  className="shrink-0 text-blue-400"
                />

                <a href="tel:+919897335636" className="text-sm text-slate-400">
                  +91 98973 35636
                </a>

              </div>

              <div className="flex gap-3">

                <Mail
                  size={18}
                  className="shrink-0 text-blue-400"
                />

                <a href="mailto:gtrclasses@gmail.com" className="text-sm text-slate-400">
                  gtrclasses@gmail.com
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}

      <div className="border-t border-slate-800">

        <div className="mx-auto max-w-7xl px-6 py-5">

          <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 lg:flex-row">

            {/* Copyright */}
            <p className="text-center lg:text-left">
              © {new Date().getFullYear()} GTR Classes. All Rights Reserved.
            </p>

            {/* Policies */}
            <div className="flex flex-wrap items-center justify-center gap-5">

              <Link
                href="/privacy-policy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition hover:text-white"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/refund-policy"
                className="transition hover:text-white"
              >
                Refund & Cancellation Policy
              </Link>

            </div>

            {/* Developer */}
            <p className="text-center lg:text-right">
              Designed & Developed by{" "}
              <span className="font-medium text-slate-300">
                GTR Team
              </span>
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}