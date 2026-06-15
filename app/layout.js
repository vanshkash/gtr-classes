import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  // metadataBase: new URL("https://www.gtrclasses.in"),
  metadataBase: new URL("https://gtr-classes.vercel.app"),

  title: {
    default: "GTR Classes | TGT, PGT, KVS, DSSSB & Art Education",
    template: "%s | GTR Classes",
  },

  description:
    "Join GTR Classes for TGT, PGT, KVS, DSSSB and Art Education preparation. Get expert video lectures, premium notes, test series, and exam-oriented study materials.",

  keywords: [
    "GTR Classes",
    "TGT Art",
    "PGT Art",
    "KVS Art",
    "DSSSB Art",
    "Art Education",
    "Teaching Exam Preparation",
    "Online Classes",
    "Study Notes",
    "Test Series",
    "Art Teacher",
    "Teaching Courses",
    "GTR Classes Hapur",
  ],

  authors: [{ name: "GTR Classes" }],
  creator: "GTR Classes",
  publisher: "GTR Classes",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "GTR Classes | TGT, PGT, KVS & DSSSB Preparation",
    description:
      "Prepare for TGT, PGT, KVS and DSSSB exams with expert lectures, premium notes, and test series from GTR Classes.",
    // url: "https://www.gtrclasses.in",
    url: "https://gtr-classes.vercel.app",
    siteName: "GTR Classes",
    images: [
      {
        url: "/og-image.webp", // public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "GTR Classes",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GTR Classes | TGT, PGT, KVS & DSSSB Preparation",
    description:
      "Expert video lectures, premium notes, and test series for Art Education & Teaching Exams.",
    images: ["/og-image.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} min-h-screen`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}