import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    value: "GTR Classes, Hapur, Uttar Pradesh",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 98765 43210",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "info@gtrclasses.com",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon - Sun • 9:00 AM - 7:00 PM",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-6">

      {/* Heading */}

      <div>
        <p className="font-semibold uppercase tracking-[3px] text-blue-600">
          Get In Touch
        </p>

        <h2 className="mt-3 text-3xl font-semibold text-slate-900">
          We're Here to Help
        </h2>

        <p className="mt-3 text-slate-600 leading-7">
          Whether you have questions about admissions, courses,
          study material, or test series, our team is always
          ready to assist you.
        </p>
      </div>

      {/* Contact Cards */}

      <div className="space-y-4">

        {contactInfo.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.color}`}
              >
                <Icon size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}

      </div>

      {/* Bottom CTA */}

      <div className="rounded-2xl bg-blue-600 p-6 text-white">

        <h3 className="text-xl font-bold">
          Start Your Success Journey
        </h3>

        <p className="mt-2 text-sm leading-6 text-blue-100">
          Connect with GTR Classes today and take the first
          step towards achieving your dream teaching job.
        </p>

      </div>

    </div>
  );
}