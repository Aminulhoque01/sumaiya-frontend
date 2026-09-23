import AIPortfolioAssistant from "../components/chatbot/AIPortfolioAssistant";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import About from "../components/sections/about/About";
import CaseStudies from "../components/sections/case-studies/CaseStudies";
import Contact from "../components/sections/contact/Contact";

import Experience from "../components/sections/experience/Experience";
import Hero from "../components/sections/hero/Hero";
import CreativeProcess from "../components/sections/process/CreativeProcess";
import ProjectsPreview from "../components/sections/projects/ProjectsPreview";
import Services from "../components/sections/services/Service";
import Skills from "../components/sections/skills/Skills";
import Testimonials from "../components/sections/testimonials/Testimonials";

 
export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <ProjectsPreview />
        <Services></Services>
        <Skills/>
        <CreativeProcess />
        <CaseStudies />
        <Experience/>
        <Testimonials/>
        <Contact />
      </main>
      <Footer />

      <AIPortfolioAssistant />
    </>
  );
}