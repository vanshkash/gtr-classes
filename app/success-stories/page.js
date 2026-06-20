import CTA from "@/components/success-stories/CTA";
import Hero from "@/components/success-stories/Hero";
import SuccessGrid from "@/components/success-stories/SuccessGrid";

export const metadata = {
  title: "Success Stories",

  description:
    "Explore the success stories of GTR Classes students who achieved success in TGT, PGT, KVS, NVS, DSSSB and Art Education examinations through dedicated preparation and expert guidance.",

  keywords: [
    "GTR Classes Success Stories",
    "Student Success Stories",
    "TGT Selection",
    "PGT Selection",
    "KVS Selection",
    "NVS Selection",
    "DSSSB Selection",
    "Art Education Success",
    "Teaching Exam Results",
    "Teaching Exam Achievers",
  ],

  alternates: {
    canonical: "/success-stories",
  },

  openGraph: {
    title: "Success Stories | GTR Classes",
    description:
      "Discover inspiring success stories and achievements of GTR Classes students.",
    url: "https://www.gtrclasses.in/success-stories",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "GTR Classes Success Stories",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Success Stories | GTR Classes",
    description:
      "Read inspiring success stories of students who achieved their teaching exam goals with GTR Classes.",
    images: ["/og-image.webp"],
  },
};

export default function SuccessStoriesPage() {
  return (
    <main>
      <Hero />
      <SuccessGrid  />
      <CTA />
    </main>
  );
}