import Hero from "@/components/home/Hero";
// import Navbar from "@/components/navbar/Navbar";
import CoursePage from "@/app/courses/page";
import AboutPage from "./about/page";
import SuccessStoriesPage from "./success-stories/page";
import ContactPage from "./contact/page";

export default function HomePage(){
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      <CoursePage />
      <AboutPage/>
      <SuccessStoriesPage />
      <ContactPage />
    </div>
  )
}