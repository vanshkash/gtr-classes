import Hero from "@/components/home/Hero";
// import Navbar from "@/components/navbar/Navbar";
import CoursePage from "@/app/courses/page";

export default function HomePage(){
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      <CoursePage />
    </div>
  )
}