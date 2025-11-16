import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Schedule from "./components/Schedule";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Schedule />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
