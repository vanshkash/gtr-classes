import {
  BookOpen,
  PlayCircle,
  FileText,
  UserCheck,
  Trophy,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Well Structured Courses",
    description:
      "Subject-wise and exam-oriented courses designed to help students prepare efficiently.",
  },
  {
    icon: PlayCircle,
    title: "Free Video Lectures",
    description:
      "Access high-quality free lectures and strengthen your concepts anytime.",
  },
  {
    icon: FileText,
    title: "Premium Notes",
    description:
      "Get concise, exam-focused notes prepared by experienced educators.",
  },
  {
    icon: UserCheck,
    title: "Expert Faculty",
    description:
      "Learn from highly experienced teachers dedicated to your success.",
  },
  {
    icon: Trophy,
    title: "Proven Results",
    description:
      "Thousands of aspirants have achieved success through our guidance.",
  },
  {
    icon: Headphones,
    title: "Student Support",
    description:
      "Quick assistance and guidance whenever students need help.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose GTR Classes?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            We provide the right combination of expert guidance,
            quality study material and technology-driven learning
            to help aspirants achieve success.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-4">

                  <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>

                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.title}
                  </h3>

                </div>

                {/* Description */}
                <p className="text-gray-600 leading-7">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}