export const dynamic = "force-dynamic";
import Hero from "@/components/home/Hero";
import CoursePage from "@/app/courses/page";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import NotesPage from "@/app/notes/page";
import SuccessGrid from "@/components/success-stories/SuccessGrid";
import ScrollRestoration from "@/components/common/ScrollRestoration";
import SuccessHero from "@/components/success-stories/Hero";

export default function HomePage(){
  return (
    <div>
      <ScrollRestoration />
      <Hero />
      <CoursePage />
      <NotesPage />
      <AboutPage/>
      <SuccessHero />
      <SuccessGrid limit={10} />
      <ContactPage />
    </div>
  )
}