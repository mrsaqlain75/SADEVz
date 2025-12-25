import React from "react";
import Header from "./components/Header";
import PixelHero from "./components/PixelHero";
import Hero from "./components/Hero";
import WhoWeAre from "./components/WhoWeAre";
import ServicesSection from "./components/ServicesSection";
import WhyWeDoIt from "./components/WhyWeDoIt";
import WorkflowSection from "./components/WorkflowSection";

function App() {
  return (
    <div className="relative min-h-screen bg-light text-accent">
      <Header />
      <PixelHero />
      <WhoWeAre />
      <ServicesSection />
      <WhyWeDoIt />
      <WorkflowSection />
    </div>
  );
}

export default App;
