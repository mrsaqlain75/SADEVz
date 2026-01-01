import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WhoWeAre from "./components/WhoWeAre";
import WhyWeDoIt from "./components/WhyWeDoIt";
import WorkflowSection from "./components/WorkflowSection";
import ServicesSection from "./components/ServicesSection";
import ServicesShowcase from "./components/ServicesShowcase";
import PortfolioSection from "./components/PortfolioSection";
import TechnologyCarousel from "./components/TechnologyCarousel";

function App() {
  return (
    <div className="relative min-h-screen bg-light text-accent">
      <Header />
      <Hero />
      <WhoWeAre />
      <ServicesSection />
      <TechnologyCarousel />
      <WorkflowSection />
      <PortfolioSection />
    </div>
  );
}

export default App;
