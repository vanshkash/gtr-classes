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
  { name: "Study Material", href: "/study-material" },
  { name: "Test Series", href: "/test-series" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "Contact Us", href: "/contact" },
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

      {/* Top */}

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-extrabold text-white">
              GTR Classes
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Empowering aspirants to crack PGT, TGT,
              KVS, NVS and DSSSB exams with expert
              guidance, quality study material and
              proven results.
            </p>

            <div className="mt-6 flex gap-3">

              <a
                href="#"
                className="rounded-lg bg-slate-800 p-2 transition hover:bg-blue-600"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="rounded-lg bg-slate-800 p-2 transition hover:bg-pink-600"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="rounded-lg bg-slate-800 p-2 transition hover:bg-red-600"
              >
                <FaYoutube size={18} />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-lg font-bold text-white">
              Quick Links
            </h3>

            <div className="space-y-3">

              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 transition hover:text-blue-400"
                >
                  <ChevronRight size={16} />

                  {link.name}
                </Link>
              ))}

            </div>

          </div>

          {/* Exams */}

          <div>

            <h3 className="mb-5 text-lg font-bold text-white">
              Popular Courses
            </h3>

            <div className="space-y-3">

              {exams.map((item) => (
                <p
                  key={item}
                  className="flex items-center gap-2"
                >
                  <ChevronRight size={16} />

                  {item} Preparation
                </p>
              ))}

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-5 text-lg font-bold text-white">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <MapPin
                  size={20}
                  className="mt-1 shrink-0 text-blue-400"
                />

                <p>
                  GTR Classes,
                  <br />
                  Hapur, Uttar Pradesh
                </p>

              </div>

              <div className="flex gap-3">

                <Phone
                  size={20}
                  className="text-blue-400"
                />

                <p>+91 XXXXX XXXXX</p>

              </div>

              <div className="flex gap-3">

                <Mail
                  size={20}
                  className="text-blue-400"
                />

                <p>info@gtrclasses.com</p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Divider */}

      <div className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-slate-400 md:flex-row">

          <p>
            © {new Date().getFullYear()} GTR Classes.
            All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <Link
              href="/privacy-policy"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-white"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}