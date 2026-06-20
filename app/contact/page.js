import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata = {
  title: "Contact Us",

  description:
    "Get in touch with GTR Classes for TGT, PGT, KVS, NVS, DSSSB and Art Education preparation. Contact us for course details, study materials, and guidance.",

  keywords: [
    "Contact GTR Classes",
    "GTR Classes Contact",
    "Teaching Exam Coaching Contact",
    "TGT Preparation",
    "PGT Preparation",
    "KVS Coaching",
    "NVS Coaching",
    "DSSSB Preparation",
    "Art Education Coaching",
  ],

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact Us | GTR Classes",
    description:
      "Contact GTR Classes for expert guidance on TGT, PGT, KVS, NVS, DSSSB and Art Education preparation.",
    url: "https://www.gtrclasses.in/contact",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Contact GTR Classes",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <p className="font-semibold uppercase tracking-[3px] text-blue-600">
            Contact Us
          </p>

          <h1 className="mt-3 text-3xl lg:text-5xl font-bold text-slate-900">
            Let's Talk About <span className="text-blue-600">Your Success</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Have questions about PGT, TGT, KVS, NVS or DSSSB preparation?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
          <ContactInfo />
          <ContactForm />
        </div>

      </div>
    </section>
  );
}