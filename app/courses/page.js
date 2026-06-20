export const dynamic = "force-dynamic";
import CourseCard from "@/components/CourseCard";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";

export const metadata = {
  title: "Our Courses ",

  description:
    "Explore expert-led courses for TGT, PGT, KVS, NVS, DSSSB and Art Education preparation. Learn with structured video lectures, study notes and exam-focused content.",

  keywords: [
    "Teaching Exam Courses",
    "TGT Courses",
    "PGT Courses",
    "KVS Preparation",
    "NVS Preparation",
    "DSSSB Courses",
    "Art Education Courses",
    "Online Teaching Courses",
    "GTR Classes Courses",
  ],

  alternates: {
    canonical: "/courses",
  },

  openGraph: {
    title: "Teaching Exam Courses | GTR Classes",
    description:
      "Explore expert-led courses for TGT, PGT, KVS, NVS, DSSSB and Art Education preparation.",
    url: "https://www.gtrclasses.in/courses",
    siteName: "GTR Classes",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "GTR Classes Courses",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Teaching Exam Courses | GTR Classes",
    description:
      "Expert-led courses for TGT, PGT, KVS, NVS, DSSSB and Art Education preparation.",
    images: ["/og-image.webp"],
  },
};

export default async function CoursesPage() {
  await dbConnect();

  const courses = await Course.find().lean();

  const serializedCourses = JSON.parse(
    JSON.stringify(courses)
  );

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-2 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Our <span className="text-blue-600">Courses</span>
        </h1>

        <p className="mt-2 text-gray-500">
          Unlock your teaching potential with structured, exam-focused courses by GTR Classes.

        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:gap-2 md:grid-cols-3 lg:grid-cols-4 px-0">
        {serializedCourses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
          />
        ))}
      </div>
    </section>
  );
}