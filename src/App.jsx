import React from "react";
import Header from "./components/Header";
import PixelHero from "./components/PixelHero";
import Hero from "./components/Hero";
import WhoWeAre from "./components/WhoWeAre";

function App() {
  return (
    <div className="relative min-h-screen bg-light text-accent">
      <Header />
      <PixelHero />
      <WhoWeAre />
    </div>
  );
}

export default App;
