import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "GTR Classes",
  description: "GTR Classes - Art Education & Teaching Platform",
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