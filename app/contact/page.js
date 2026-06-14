import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

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