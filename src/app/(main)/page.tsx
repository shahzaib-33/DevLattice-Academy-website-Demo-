import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import Philosophy from "@/components/sections/Philosophy";
import Courses from "@/components/sections/Courses";
import Team from "@/components/sections/Team";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Achievements from "@/components/sections/Achievements";
import CtaBand from "@/components/sections/CtaBand";
import Contact from "@/components/sections/Contact";
import { site } from "@/config/site";
import { courses } from "@/data/courses";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    url: site.url,
    description: site.description,
    parentOrganization: { "@type": "Organization", name: site.parent },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Programs",
      itemListElement: courses.map((c) => ({ "@type": "Course", name: c.title, description: c.description, provider: { "@type": "Organization", name: site.name } })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Intro />
      <About />
      <Philosophy />
      <Courses />
      <Team />
      <Projects />
      <Testimonials />
      <Achievements />
      <CtaBand />
      <Contact />
    </>
  );
}
