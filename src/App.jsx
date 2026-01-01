import React from "react";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WhoWeAre from "./components/WhoWeAre";
import WhyWeDoIt from "./components/WhyWeDoIt";
import WorkflowSection from "./components/WorkflowSection";
import ServicesSection from "./components/ServicesSection";
import ServicesShowcase from "./components/ServicesShowcase";
import PortfolioSection from "./components/PortfolioSection";
import TechnologyCarousel from "./components/TechnologyCarousel";
import ClientLogos from "./components/ClientLogos";
import TeamSection from "./components/TeamSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative min-h-screen bg-light text-accent">
      <ScrollProgressBar />
      <Header />
      <Hero />
      <WhoWeAre />
      <ServicesSection />
      <TechnologyCarousel />
      <WorkflowSection />
      <PortfolioSection />
      <ClientLogos />
      <TeamSection />
      <Footer />
    </div>
  );
}

export default App;
