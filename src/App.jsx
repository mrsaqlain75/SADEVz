import React from "react";
import Header from "./components/Header";
import PixelHero from "./components/PixelHero";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="relative min-h-screen bg-accent text-accent">
      <Header />
      <PixelHero />
    </div>
  );
}

export default App;
