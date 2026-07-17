import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import FounderSection from "@/components/about/FounderSection";
import Animate from "@/components/animations/Animate";

export const metadata = {
  title: "About Us",

  description:
    "Learn about GTR Classes, our mission, vision, and commitment to helping aspirants succeed in TGT, PGT, KVS, NVS, DSSSB and Art Education examinations.",

  keywords: [
    "About GTR Classes",
    "GTR Classes Hapur",
    "Teaching Exam Coaching",
    "TGT Preparation",
    "PGT Preparation",
    "KVS Coaching",
    "NVS Coaching",
    "DSSSB Coaching",
    "Art Education",
    "Teaching Exam Platform",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About Us | GTR Classes",
    description:
      "Discover the mission, vision and educational excellence behind GTR Classes.",
    url: "https://www.gtrclasses.in/about",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "About GTR Classes",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us | GTR Classes",
    description:
      "Learn about GTR Classes and our commitment to teaching exam success.",
    images: ["/og-image.webp"],
  },
};

export default function AboutPage() {
  return (
    <>
      <Animate>
      <AboutHero />
      <MissionVision />
        <WhyChooseUs />
        <FounderSection />
      </Animate>
    </>
  );
}